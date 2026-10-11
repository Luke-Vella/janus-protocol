export const chapters = [
	{ id: "chapter-1", chapterNumber: 1, name: "Fresh Meat", description: "Your first day at the facility." },
] as const

export const beats = [
	{
		id: "ch1-001",
		key: "ch1-001",
		chapterId: "chapter-1",
		beatNumber: 1,
		text: "Day 1. Fresh meat. You feel nervous, but excited. You go to the training room and sit down on one of the vacant tables, feeling a mix of anticipation and nervousness. You glance around the room, taking in the sight of other recruits and the training equipment. You're too nervous to speak to anyone so you remain silent, head down, waiting for the training session to begin.",
		npcId: null,
		background: "/story/backgrounds/training-room-without-professor.png",
		nextBeatId: "ch1-002",
	},
	{
		id: "ch1-002",
		key: "ch1-002",
		chapterId: "chapter-1",
		beatNumber: 2,
		text: "After a while of waiting, the door opens. A well-groomed man walks through the door and makes his way to the center of the room. ",
		npcId: null,
		background: "/story/backgrounds/training-room-professor-walks-in.png",
		nextBeatId: "ch1-003",
	},
	{
		id: "ch1-003",
		key: "ch1-003",
		chapterId: "chapter-1",
		beatNumber: 3,
		text: "Welcome, recruits. I'm Professor Sweeney. Take a seat, we have a lot to cover today.",
		npcId: "npc-professor-sweeney",
		background: "/story/backgrounds/training-room-professor-walks-in.png",
		nextBeatId: null,
	},
] as const
