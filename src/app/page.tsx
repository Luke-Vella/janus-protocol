import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Heart, Brain, Zap, IdCardLanyard, Goal, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DailyDuties } from "@/components/game/daily-duties";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Temporary values until the game-state store exists
const STATS = [
	{ label: "Health", icon: Heart, value: 100, bar: "stat-bar-health" },
	{ label: "Stress", icon: Brain, value: 0, bar: "stat-bar-stress" },
	{ label: "Stamina", icon: Zap, value: 100, bar: "stat-bar-stamina" },
	{
		label: "Clearance level",
		icon: IdCardLanyard,
		value: "Level 1: Fresh Recruit",
		bar: "stat-bar-clearance",
	},
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
						Good Morning, {session.user.name}
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
				{STATS.map(({ label, icon: Icon, value, bar }) => (
					<div
						key={label}
						className={cn(
							"stat-card",
							typeof value === "number"
								? null
								: "stat-card-text-only",
						)}
					>
						{typeof value === "number" && (
							<div>
								<div className="stat-card-header">
									<Icon className="stat-card-icon" />
									<div className="stat-card-text">
										<h2 className="stat-card-title">
											{label}
										</h2>
										<p className="stat-card-value">
											{typeof value === "number"
												? `${value}%`
												: value}
										</p>
									</div>
								</div>
								<Progress
									value={value}
									aria-label={label}
									className={`stat-bar ${bar}`}
								/>
							</div>
						)}
						{typeof value !== "number" && (
							<div className="stat-card-header">
								<Icon
									className={
										typeof value === "number"
											? "size-8"
											: "size-10"
									}
								/>
								<div className="stat-card-text">
									<h2 className="stat-card-title">{label}</h2>
									<p className="stat-card-value">{value}</p>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			<div className="flex flex-col lg:flex-row gap-4">
				<div className="min-w-64 flex-[2] rounded-lg border p-3 flex flex-col gap-2">
					<div className="flex items-center gap-1">
						<Calendar className="size-6" />
						<h1 className="text-2xl font-bold">Daily Duties</h1>
					</div>
					<DailyDuties />
				</div>
				<div className="min-w-48 flex-1 rounded-lg border p-3 flex flex-col gap-3 justify-between">
					<div>
						<div className="flex items-center gap-1">
							<Goal className="size-6" />
							<h1 className="text-2xl font-bold">Current Objective</h1>
						</div>

						<p className="text-muted-foreground">Attend your probationary training session.</p>
					</div>

					<Button 
						className="w-full" 
						variant="outline"
						asChild>
						<Link href="/story">
							Open Storyboard 
						</Link>
					</Button>
				</div>

			</div>
		</div>
			
	);
}
