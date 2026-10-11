import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { userStats, clearanceLevels } from '@/db/schema'

const getUserStats = async (id: string) => {
	return db.select({
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
		.where(eq(userStats.userId, id))
		.limit(1);
}

export default { getUserStats };