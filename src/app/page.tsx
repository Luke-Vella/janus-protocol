import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Heart, Brain, Zap, IdCardLanyard } from "lucide-react";
import PlayerDailyDuties from "@/components/game/player-daily-duties";
import type { DailyDuty } from "@/components/game/daily-duties";

import query from "@/db/query"
import PlayerStat from "@/components/game/player-stat";
import PlayerChapter from "@/components/game/player-chapter";

// Temporary mock data until duties come from the DB
const DUTIES: DailyDuty[] = [
];

export default async function HomePage() {
	
	const session = await auth.api.getSession({ headers: await headers() });

	if (!session) {
		return (
			<div className="flex flex-col items-center gap-4 py-20 text-center">
				<h1 className="text-4xl font-bold">Welcome to Janus</h1>
				<p className="w-120 text-muted-foreground">
					This website is only intended for JANUS Personnel. Please
					sign in with your official JANUS credentials or register for
					an account if you do not have one.
				</p>
			</div>
		);
	}

	const [row] = await query.getUserStats()
	if (!row) { /* no stats row: show a fallback or insert defaults */ }

	const stats = [
		{ label: "Health", icon: Heart, value: row.health, bar: "stat-bar-health" },
		{ label: "Stress", icon: Brain, value: row.stress, bar: "stat-bar-stress" },
		{ label: "Stamina", icon: Zap, value: row.stamina, bar: "stat-bar-stamina" },
		{
			label: "Clearance level",
			icon: IdCardLanyard,
			value: 'Lvl ' + row.clearanceLevel + ': ' + row.clearanceName,
			bar: "stat-bar-clearance",
		},
	];

	const greetingTextBasedOnTime = (() => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good Morning";
		if (hour < 18) return "Good Afternoon";
		return "Good Evening";
	})();

	return (
		<div className="flex grow flex-col gap-6 h-full">
			<div className="flex items-center justify-between lg:mx-6">
				<div className="grow">
					<p className="">
						{new Date().toLocaleDateString("en-GB", {
							weekday: "long",
							day: "numeric",
							month: "long",
							year: "numeric",
						})}
					</p>
					<h1 className="text-2xl font-bold">
						{greetingTextBasedOnTime}, {session.user.name}
					</h1>
					<p className="text-muted-foreground"></p>
				</div>
				<div>
					<h1 className="text-2xl font-bold">
						{new Date().toLocaleTimeString("en-GB", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</h1>
					<p className="spacing-0 text-muted-foreground">Day 1</p>
					<p className="text-xs text-muted-foreground">
						Lab Entrance
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-4 lg:flex-row">
				{stats.map(({ label, icon: Icon, value, bar }) => (
					<PlayerStat
						key={label}
						label={label}
						icon={Icon}
						value={value}
						bar={bar}
					/>
				))}
			</div>

			<div className="flex flex-col lg:flex-row gap-4">
				<PlayerDailyDuties duties={DUTIES} />
				<PlayerChapter />

			</div>
		</div>
			
	);
}
