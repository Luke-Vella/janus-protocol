"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ListRestart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveProgress } from "./actions"

const TYPING_INTERVAL_MS = 10

export type SceneBeat = {
	id: string
	text: string
	background: string | null
	npcName?: string
}

export default function StoryScene({ beats, initialIndex }: { beats: SceneBeat[]; initialIndex: number })
{
	const router = useRouter()
	const [index, setIndex] = useState(initialIndex)
	const beat = beats[index]
	const isFirst = index === 0
	const isLast = index === beats.length - 1

	// Tracking the beat id alongside the count resets the typing on every beat change
	const [typing, setTyping] = useState({ beatId: beat.id, count: 0 })
	const typedCount = typing.beatId === beat.id ? typing.count : 0
	const isTyping = typedCount < beat.text.length

	useEffect(() => {
		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		const length = beat.text.length
		const timer = setInterval(() => {
			setTyping((prev) => {
				const count = prev.beatId === beat.id ? prev.count : 0
				return { beatId: beat.id, count: Math.min(length, count + (reduceMotion ? length : 1)) }
			})
		}, TYPING_INTERVAL_MS)
		return () => clearInterval(timer)
	}, [beat.id, beat.text])

	const skipTyping = () => setTyping({ beatId: beat.id, count: beat.text.length })

	// Update the UI immediately, persist in the background, and resync if the save fails
	const goTo = (newIndex: number) => {
		setIndex(newIndex)
		saveProgress(beats[newIndex].id).catch(() => {
			router.refresh()
		})
	}

	return (
		<div className="relative flex min-h-full flex-col overflow-hidden rounded">
			<Image src={beat.background ?? ""} alt="" fill priority className="-z-10 object-cover" />

			<div className="absolute inset-0 -z-10 bg-black/30" />

			<div className="p-4">
				<Button variant="outline" onClick={() => router.back()}>
					<X />
				</Button>
				
			</div>

			<div className="grow flex flex-col justify-end">
				<div className="relative mx-auto flex w-full max-w-3xl flex-col gap-3 p-4">
					<div
						className={`rounded-lg border border-white/10 bg-black/70 p-4 text-white backdrop-blur-sm ${isTyping ? "cursor-pointer" : ""}`}
						onClick={skipTyping}
					>
						{beat.npcName && <p className="text-lg font-bold text-primary">{beat.npcName}</p>}
						
						{/* The full text is rendered invisibly to reserve the card's final height */}
						<p className={`relative ${beat.npcName ? "" : "italic text-white/80"}`}>
							<span className="invisible">{beat.text}</span>
							<span className="absolute inset-0" aria-hidden="true">{beat.text.slice(0, typedCount)}</span>
						</p>
					</div>

					<div className="flex justify-between gap-4">
						<Button variant="link" className="grow" disabled={isFirst} onClick={() => goTo(0)}>
							<ListRestart />
							Reset chapter
						</Button>
						<Button variant="outline" className="grow" disabled={isFirst} onClick={() => goTo(index - 1)}>
							<ArrowLeft />
							Previous
						</Button>
						<Button className="grow" disabled={isLast} onClick={() => goTo(index + 1)}>
							Next
							<ArrowRight />
						</Button>
					</div>
				</div>
			</div>

			<p className="absolute bottom-2 left-3 max-w-72 text-[10px] leading-tight text-white/70">
				<b>Full transparency time</b>: JANUS Protocol is currently making use of placeholder AI art while it's still being built.
				With that being said, I am actively looking for artists to collaborate on this project.{" "}
				<a href="mailto:luke.vella.0697@gmail.com" className="underline hover:text-white">
					Hit me up if you&apos;re interested!
				</a>
			</p>
		</div>
	)
}
