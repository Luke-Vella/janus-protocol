import { Goal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlayerObjective({ objective }: { objective: string }) {
	return (
		<div className="min-w-48 flex-1 rounded-lg border p-3 flex flex-col gap-3 justify-between">			
			<div>
				<div className="flex items-center gap-1">
					<Goal className="size-6" />
					<h1 className="text-2xl font-bold">Current Objective</h1>
				</div>

				<p className="text-muted-foreground">{objective}</p>
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
	);
}