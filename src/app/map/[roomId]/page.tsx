"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Footprints, LocateFixed } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as actions from "./actions";
import { useEffect } from "react";
import { useState } from "react";

export default function RoomPage() {

	const { roomId: currentRoomId } = useParams<{ roomId: string }>();
	const router = useRouter();

	const [currentRoomIdState, setCurrentRoomIdState] = useState<string | null>(null);

	useEffect(() => {
		const fetchCurrentRoomId = async () => {
			const roomId = await actions.getCurrentRoomId();
			setCurrentRoomIdState(roomId);
		};
		fetchCurrentRoomId();
	}, []);

	function goToRoom() {
		setCurrentRoomIdState(currentRoomId);
		actions.goToRoom(currentRoomId).catch(() => {
			router.refresh()
		})
	}

	return (
		<div className="relative flex min-h-full flex-col overflow-hidden rounded">
			<Image src={`/story/rooms/${currentRoomId}.png`} alt="" fill priority className="-z-10 object-cover" />
			
			<div className="p-4 flex gap-3">
				<Button variant="outline" onClick={() => router.back()}>
					<ArrowLeft />
					Back to Map
				</Button>
				{ currentRoomIdState != currentRoomId && (
					<Button onClick={goToRoom}>
					<Footprints />
					Go to Room
				</Button>
				)}
			</div>

			{ currentRoomId === currentRoomIdState && 
			(
				<div className="flex grow items-end justify-center p-4">
					<div className="flex gap-2 bg-popover p-4 rounded border font-bold text-gray-300">
						<LocateFixed />
						You are currently in this room.
					</div> 
				</div>
			)}
			<p className="absolute bottom-2 left-3 max-w-72 text-[10px] leading-tight text-white/70">
				<b>Full transparency time</b>: JANUS Protocol is currently making use of placeholder AI art while it&apos;s still being built.
				With that being said, I am actively looking for artists to collaborate on this project.{" "}
				<a href="mailto:luke.vella.0697@gmail.com" className="underline hover:text-white">
					Hit me up if you&apos;re interested!
				</a>
			</p>
		</div>
	);
}