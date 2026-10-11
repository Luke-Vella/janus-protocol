import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function PlayerStat({ label, icon: Icon, value, bar }: { label: string; icon: any; value: number | string; bar: string }) {
	return (
		<div
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
						value={value as number}
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
	);
}