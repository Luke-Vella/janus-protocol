import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type DailyDuty = {
	id: string;
	label: string;
	place: string;
	done: boolean;
};

export function DailyDuties({ duties }: { duties: DailyDuty[] }) {
	return (
		<ul className="mt-3 flex flex-col gap-3">
			{duties.map(({ id, label, place, done }) => (
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
