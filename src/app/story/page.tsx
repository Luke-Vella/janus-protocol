"use client"
	
import Image from "next/image"
import { Button } from "@/components/ui/button"

const choices = [
	{ id: 1, text: "Yes, I am." },
	{ id: 2, text: "No, I'm just visiting." },
];

export default function StoryPage()
{
	return (
	<div className="relative flex min-h-full flex-col justify-end overflow-hidden rounded">
    <Image src="/story/backgrounds/training-room-without-professor.png" alt="" fill priority className="-z-10 object-cover" />
    <div className="absolute inset-0 -z-10 bg-black/20" />

    <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-3 p-4">
        {/* Dialogue card */}
        <div className="rounded-lg border border-white/10 bg-black/70 p-4 text-white backdrop-blur-sm">
            <p>
				Day 1. Fresh meat. You feel nervous, but excited. You go to the training room and 
				sit down on one of the vacant tables, feeling a mix of anticipation and nervousness. 
				You glance around the room, taking in the sight of other recruits and the training equipment. You're too nervous to speak to anyone so you remain silent, head down, waiting for the training session to begin.	
			</p>
        </div>

		<Button>
			Next
		</Button>
    </div>
</div>
	);
}
