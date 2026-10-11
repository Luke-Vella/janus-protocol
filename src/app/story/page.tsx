import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import query from "@/db/query"
import StoryScene from "./story-scene"

export default async function StoryPage()
{
	const session = await auth.api.getSession({ headers: await headers() });
	if(session == null) return null;

	const beats = await query.getCurrentUserChapterBeats();
	const activeIndex = beats.findIndex((b) => b.isActive);
	if(activeIndex === -1) return null;

	return (
		<StoryScene
			beats={beats.map((b) => ({ id: b.id, text: b.text, background: b.background, npcName: b.npcName }))}
			initialIndex={activeIndex}
		/>
	);
}
