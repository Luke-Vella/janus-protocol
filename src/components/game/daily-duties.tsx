import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Temporary mock data until the game-state store exists
const DUTIES = [
	{
		id: "samples",
		label: "Prepare samples for Test 3B",
		place: "Lab A",
		done: false,
	},
	{
		id: "report",
		label: "Submit daily report",
		place: "Internal Portal",
		done: false,
	},
	{
		id: "tanaka",
		label: "Meet with Dr. Tanaka",
		place: "Research Wing",
		done: false,
	},
];

export function DailyDuties() {
	return (
		<ul className="mt-3 flex flex-col gap-3">
			{DUTIES.map(({ id, label, place, done }) => (
				<li key={id} className="flex items-center gap-3">
					<Checkbox
						id={id}
						checked={done}
						aria-readonly
						className="cursor-default"
					/>
					<Label
						htmlFor={id}
						className={cn(
							"grow cursor-default",
							done && "text-muted-foreground line-through",
						)}
					>
						{label}
					</Label>
					<span className="text-sm text-muted-foreground">
						{place}
					</span>
				</li>
			))}
		</ul>
	);
}
