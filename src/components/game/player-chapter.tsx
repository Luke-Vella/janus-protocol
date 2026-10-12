import { Goal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import query from "@/db/query"
import Image from "next/image";

export default async function PlayerChapter() {

	const currentChapter = await query.getCurrentUserChapter();
	const currentChapterBeats = await query.getCurrentUserChapterBeats();
	const currentBeat = currentChapterBeats.find(p => p.isActive == true);

	const currentRoomId = await query.getCurrentRoomId();

	return (
		<div className="min-w-48 flex-1 rounded-lg border p-3 flex flex-col gap-3 justify-between">			
			<div className="flex flex-col gap-6">
				<div className="flex items-center gap-1">
					<Goal className="size-6" />
					<h1 className="text-2xl font-bold">Current Chapter</h1>
				</div>

				<div className="text-center">
					<Image
						src={`/story/chapters/${currentChapter?.id}.png`}
						alt={`Chapter ${currentChapter?.chapterNumber} Image`}
						width={150}
    					height={150}
						className="mx-auto mb-4 rounded-lg border"
					/>
					<h2 className="text-2xl font-medium">Chapter {currentChapter?.chapterNumber}: {currentChapter?.name}</h2>
					<p className="text-muted-foreground">{currentChapter?.description}</p>
				</div>

				<div>
						{currentBeat?.roomId && currentRoomId != currentBeat?.roomId && (
						<Button 
							variant="ghost"
							className="w-full" 
							disabled={currentRoomId !== currentBeat?.roomId}>
								
							Go to the {currentBeat?.roomId} to continue your story.
						</Button>
					)}

					{(currentBeat?.roomId == null || currentRoomId == currentBeat?.roomId) && (
						<Button 
							className="w-full" 
							variant="outline"
							asChild>
							<Link href="/story">
								Open Storyboard 
							</Link>
						</Button>
					)}
				</div>

			</div>



		</div>
	);
}