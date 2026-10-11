import { db } from '@/db'
import { alias } from 'drizzle-orm/pg-core'
import { eq, getTableColumns, sql } from 'drizzle-orm'
import { userStats, userStoryProgress,  clearanceLevels, npc, storyBeat } from '@/db/schema'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const getSessionUserId = async () => {
	const session = await auth.api.getSession({ headers: await headers() })
	return session?.user.id ?? null
}

const getUserStats = async () => {
	const userId = await getSessionUserId()
	if (!userId) return []

	return db
		.select({
			health: userStats.health,
			stamina: userStats.stamina,
			stress: userStats.stress,
			clearanceLevel: userStats.clearanceLevel,
			clearanceName: clearanceLevels.name
		})
		.from(userStats)
		.leftJoin(
			clearanceLevels,
			eq(clearanceLevels.level, userStats.clearanceLevel)
		)
		.where(eq(userStats.userId, userId))
		.limit(1);
}

const getCurrentUserChapterBeats = async () => {
    const userId = await getSessionUserId()
    if (!userId) return []

    const currentBeat = alias(storyBeat, 'current_beat')

    return db
        .select({
            ...getTableColumns(storyBeat),
			npcName: sql<string>`${npc.name}`.as('npc_name'),
			npcPortrait: sql<string>`${npc.portrait}`.as('npc_portrait'),
            isActive: sql<boolean>`${storyBeat.id} = ${userStoryProgress.currentBeatId}`.as('is_active'),
        })
        .from(userStoryProgress)
        .innerJoin(currentBeat, eq(currentBeat.id, userStoryProgress.currentBeatId))
        .innerJoin(storyBeat, eq(storyBeat.chapterId, currentBeat.chapterId))
        .leftJoin(npc, eq(npc.id, storyBeat.npcId))
        .where(eq(userStoryProgress.userId, userId))
        .orderBy(storyBeat.beatNumber)
}

const setCurrentBeat = async (beatId: string) => {
	const userId = await getSessionUserId()
	if (!userId) return

	await db
		.update(userStoryProgress)
		.set({ currentBeatId: beatId })
		.where(eq(userStoryProgress.userId, userId))
}

export default { getUserStats, getCurrentUserChapterBeats, setCurrentBeat };