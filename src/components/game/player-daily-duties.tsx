import { Calendar } from "lucide-react";
import { DailyDuties, type DailyDuty } from "@/components/game/daily-duties";
import NoResults from "@/components/ui/no-results";

export default function PlayerDailyDuties({ duties }: { duties: DailyDuty[] }) {
	
	return (
				<div className="min-w-64 flex-[2] rounded-lg border p-3 flex flex-col gap-2">
					<div className="flex items-center gap-1">
						<Calendar className="size-6" />
						<h1 className="text-2xl font-bold">Daily Duties</h1>
					</div>
					{duties.length === 0 && (
						<NoResults message="No daily duties assigned." />
					)}
					{duties.length > 0 && (
						<DailyDuties duties={duties} />
					)}
				</div>
	);
}