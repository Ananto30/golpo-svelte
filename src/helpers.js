const tagMap = {
	Music: "🎵 Music",
	Game: "🎮 Game",
	Nature: "🌳 Nature",
	Calm: "🕊️ Calm",
	Funny: "🤣 Funny",
	Startup: "🧑‍💻 Startup",
	Life: "🧘 Life",
	Travel: "🧳 Travel",
	Food: "🥪 Food",
	Entrepreneurship: "🙋 Entrepreneurship",
	Education: "🎓 Education",
	Health: "🧑‍⚕️ Health",
	Love: "❤️ Love",
	Design: "🎨 Design",
	Writing: "🖋️ Writing",
	Technology: "⚙️ Technology",
	"Self-Improvement": "🏃 Self-Improvement",
	Business: "💼 Business",
	Sports: "🏏 Sports",
	Art: "🖼️ Art",
	"Open-Source": "🐧 Open-Source",
	Programming: "💻 Programming",
};

exports.showTag = (tag) => {
	return tagMap[tag];
};
