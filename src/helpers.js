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

const tagSvgMap = {
	Music: "music",
	Game: "controller",
	Nature: "tree",
	Calm: "coffee",
	Funny: "smile-wink",
	Startup: "chart",
	Life: "leaf",
	Travel: "plane",
	Food: "pizza",
	Entrepreneurship: "crown",
	Education: "grad-cap",
	Health: "firstaid",
	Love: "love",
	Design: "palette",
	Writing: "pen",
	Technology: "wrench",
	"Self-Improvement": "running",
	Business: "briefcase",
	Sports: "football",
	Art: "paint-brush",
	"Open-Source": "laptop",
	Programming: "code",
}

exports.showTag = (tag) => {
	return tagMap[tag];
};

exports.getTagSvgName = (tag) => {
	return tagSvgMap[tag];
}