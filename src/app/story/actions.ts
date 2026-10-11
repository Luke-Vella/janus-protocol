"use server"

import query from "@/db/query"

// Takes an absolute beat id (idempotent, so rapid clicks can't drift) and only
// accepts beats from the chapter the user is currently in.
export const saveProgress = async (beatId: string) => {
	const beats = await query.getCurrentUserChapterBeats();
	if (!beats.some((b) => b.id === beatId)) return;

	await query.setCurrentBeat(beatId);
}
