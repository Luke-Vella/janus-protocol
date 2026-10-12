import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Palette, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export default function AboutPage() {
	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">About JANUS Protocol</h1>
				<p className="text-muted-foreground">
					An interactive sci-fi novel born as an exercise in code, worldbuilding, and creative design.
				</p>
			</header>

			{/* The Concept */}
			<section className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">The Premise</h2>
				<p className="text-muted-foreground leading-relaxed">
					JANUS Protocol takes place inside JANUS, a secretive and heavily guarded research facility
					operating at the edge of the known. You step into the shoes of a fresh recruit on your
					probationary week, navigating an organization that builds doors to perilous unknowns and the
					keys that keep them locked away.
				</p>
			</section>

			{/* Why It Exists: Code & Creativity */}
			<section className="flex flex-col gap-4">
				<h2 className="text-xl font-semibold">Why I Built This</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					{/* Coding practice */}
					<div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground">
						<div className="flex items-center gap-2 font-medium">
							<div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
								<Code2 className="size-4" />
							</div>
							Sharpening Code
						</div>
						<p className="text-xs leading-relaxed text-muted-foreground">
							JANUS Protocol serves as a personal laboratory for modern full-stack web engineering.
							Built with Next.js (App Router, Server Actions, and React Server Components),
							TypeScript, Tailwind CSS, PostgreSQL, Drizzle ORM, and Better Auth. It’s an exercise
							in architecting stateful, app-like game systems inside modern web standards.
						</p>
					</div>

					{/* Creative muscles */}
					<div className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground">
						<div className="flex items-center gap-2 font-medium">
							<div className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
								<Palette className="size-4" />
							</div>
							Flexing Creative Muscles
						</div>
						<p className="text-xs leading-relaxed text-muted-foreground">
							Writing original interactive fiction, designing branch points, and creating an eerie,
							bureaucratic sci-fi atmosphere. Every character, dialogue tree, and piece of lore is
							written completely from scratch, exploring how user interface and gameplay tension can
							complement storytelling.
						</p>
					</div>
				</div>
			</section>

			{/* How to Play pointer */}
			<section className="flex items-center justify-between gap-4 rounded-lg border bg-muted/40 p-4">
				<div className="flex items-center gap-3">
					<HelpCircle className="size-5 shrink-0 text-muted-foreground" />
					<div className="text-sm">
						<span className="font-medium">Looking for gameplay instructions?</span>
						<p className="text-xs text-muted-foreground">
							Learn how room navigation, story beats, and clearance levels work.
						</p>
					</div>
				</div>
				<Button asChild size="sm" variant="outline">
					<Link href="/how-to-play">
						How to Play
						<ArrowRight className="ml-1 size-3.5" />
					</Link>
				</Button>
			</section>

			{/* Creative Collaboration */}
			<section className="flex flex-col gap-3">
				<div className="flex items-center gap-2">
					<Sparkles className="size-5 text-primary" />
					<h2 className="text-xl font-semibold">Art & Collaboration</h2>
				</div>
				<p className="text-sm leading-relaxed text-muted-foreground">
					While the story, and worldbuilding are 100% written by myself, the visual assets
					currently in use are placeholder AI concept art to help establish mood while the project takes shape.
				</p>
				<p className="text-sm leading-relaxed text-muted-foreground">
					I am actively looking for artists, illustrators, or fellow storytellers interested in collaborating
					to bring the world of JANUS to life with bespoke human art. If you&apos;d like to connect, share feedback,
					or collaborate, reach out anytime at{" "}
					<a
						href="mailto:luke.vella.0697@gmail.com"
						className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
					>
						luke.vella.0697@gmail.com
					</a>
					.
				</p>
			</section>
		</div>
	);
}
