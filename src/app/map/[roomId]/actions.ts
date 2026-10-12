"use server"

import query from "@/db/query"

export const goToRoom = async (roomId: string) => {
	const room = await query.getRoomById(roomId);
	if (!room) return;

	await query.goToRoom(roomId);
	
}

export const getCurrentRoomId = async () => {
	return await query.getCurrentRoomId();
};
