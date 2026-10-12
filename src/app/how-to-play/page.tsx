import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	MapPin,
	BookOpen,
	Activity,
	Hammer,
	ArrowRight,
	Footprints,
} from "lucide-react";

export default function HowToPlayPage() {
	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">How to Play</h1>
				<p className="text-muted-foreground">
					A quick guide to navigating the facility and surviving your probationary period at JANUS.
				</p>
			</header>

			{/* Early WIP Notice Banner */}
			<section className="flex items-start gap-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200">
				<Hammer className="size-6 shrink-0 text-amber-400 mt-0.5" />
				<div className="space-y-1">
					<h2 className="font-semibold text-amber-300">Early Work in Progress</h2>
					<p className="text-sm leading-relaxed text-amber-200/90">
						JANUS Protocol is currently in active, early development. You may encounter rough edges,
						incomplete features, or sudden layout changes. New story content, facility rooms, and mechanics
						are being built and rolled out continuously.
					</p>
				</div>
			</section>

			{/* Core Mechanics */}
			<div className="flex flex-col gap-6">
				{/* Step 1: Navigating Rooms */}
				<section className="flex flex-col gap-3 rounded-lg border bg-card p-5 text-card-foreground">
					<div className="flex items-center gap-2">
						<div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
							<MapPin className="size-5" />
						</div>
						<h2 className="text-xl font-semibold">1. Navigating the Facility</h2>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Your progress in JANUS is grounded in physical space. Certain story beats can only unfold
						when you are in a specific room within the facility (such as the Training Room, Reception,
						or Conference Room).
					</p>
					<ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
						<li>
							Check your <span className="font-medium text-foreground">Current Chapter</span> card on the dashboard to see if your story requires you to be in a particular room.
						</li>
						<li>
							Head to the <Link href="/map" className="font-medium text-primary underline underline-offset-4">Map</Link> page to browse all accessible areas.
						</li>
						<li>
							Select a room and press <span className="inline-flex items-center gap-1 font-medium text-foreground"><Footprints className="size-3.5 inline" /> Go to Room</span> to move your character there.
						</li>
					</ul>
				</section>

				{/* Step 2: Advancing the Story */}
				<section className="flex flex-col gap-3 rounded-lg border bg-card p-5 text-card-foreground">
					<div className="flex items-center gap-2">
						<div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
							<BookOpen className="size-5" />
						</div>
						<h2 className="text-xl font-semibold">2. Progressing Through Story Beats</h2>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Once you arrive at the designated location, your next scene unlocks:
					</p>
					<ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
						<li>
							Click <span className="font-medium text-foreground">Open Storyboard</span> from your dashboard or navigate directly to the Story section.
						</li>
						<li>
							Read through scenes, observe character dialogues, and encounter facility personnel.
						</li>
						<li>
							Make narrative choices when prompted. Your decisions can affect your standing, alter conversation outcomes, and shape the direction of your narrative.
						</li>
						<li>
							All story progress and choices are saved automatically to your account in real time.
						</li>
					</ul>
				</section>

				{/* Step 3: Vitals and Clearance */}
				<section className="flex flex-col gap-3 rounded-lg border bg-card p-5 text-card-foreground">
					<div className="flex items-center gap-2">
						<div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
							<Activity className="size-5" />
						</div>
						<h2 className="text-xl font-semibold">3. Managing Your Vitals & Clearance</h2>
					</div>
					<p className="text-sm leading-relaxed text-muted-foreground">
						As an employee, your condition and authorization level dictate your survivability:
					</p>
					<ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
						<li>
							<span className="font-medium text-foreground">Health, Stress & Stamina:</span> Reflect your physical and mental fortitude as you face high-pressure situations within the complex.
						</li>
						<li>
							<span className="font-medium text-foreground">Clearance Level:</span> Determines which secured doors, terminal files, and sensitive duties you are permitted to access. Higher clearance will be earned as you advance through chapters.
						</li>
					</ul>
				</section>
			</div>

			{/* Quick Action Links */}
			<div className="flex flex-wrap items-center justify-between gap-4 border-t pt-6">
				<Button asChild variant="outline">
					<Link href="/about">Learn More About the Project</Link>
				</Button>
				<Button asChild>
					<Link href="/">
						Return to Dashboard
						<ArrowRight className="ml-2 size-4" />
					</Link>
				</Button>
			</div>
		</div>
	);
}
