export default function AboutPage() {
	return (
		<div className="rounded mx-auto flex w-full max-w-3xl flex-col gap-8 py-8">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-bold">About JANUS Protocol</h1>
				<p className="text-muted-foreground">An interactive novel of secrets, doorways and survival.</p>
			</header>

			<section className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">What is it?</h2>
				<p>
					JANUS Protocol is an interactive novel set inside JANUS, the most lucrative research
					facility in the country. You play a fresh recruit, the lowest rung on the food chain,
					trying to survive your first week in a place that builds doors to the dangerous unknown
					and the keys that keep them shut.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">How it plays</h2>
				<ul className="list-disc space-y-1 pl-5">
					<li>Read the story chapter by chapter. Your progress is saved to your account automatically.</li>
					<li>Keep an eye on your health, stress and stamina, and on your clearance level within JANUS.</li>
					<li>Work through your daily duties and objectives between story scenes.</li>
					<li>Meet the people of the facility, some of whom are not what they seem.</li>
				</ul>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Work in progress</h2>
				<p>
					JANUS Protocol is still in development. Features, story content and art are changing
					often, and the art you see today is placeholder AI art. The story however is 100% written by myself.
				</p>
			</section>

			<section className="flex flex-col gap-2">
				<h2 className="text-xl font-semibold">Get involved</h2>
				<p>
					I&apos;m actively looking for artists to collaborate on this project. If that sounds like
					you, or you have feedback, get in touch at{" "}
					<a href="mailto:luke.vella.0697@gmail.com" className="underline">
						luke.vella.0697@gmail.com
					</a>
					.
				</p>
			</section>
		</div>
	);
}
