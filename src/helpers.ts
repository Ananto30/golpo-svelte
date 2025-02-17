import { get } from 'svelte/store';
import client from './client';
import { allTags, userMetaMap } from './store';
import type { UserMeta, UserMetaMap } from './types';

const tagMap: { [key: string]: string } = {
	Music: '🎵 Music',
	Game: '🎮 Game',
	Nature: '🌳 Nature',
	Calm: '🕊️ Calm',
	Funny: '🤣 Funny',
	Startup: '🧑‍💻 Startup',
	Life: '🧘 Life',
	Travel: '🧳 Travel',
	Food: '🥪 Food',
	Entrepreneurship: '🙋 Entrepreneurship',
	Education: '🎓 Education',
	Health: '🧑‍⚕️ Health',
	Love: '❤️ Love',
	Design: '🎨 Design',
	Writing: '🖋️ Writing',
	Technology: '⚙️ Technology',
	'Self-Improvement': '🏃 Self-Improvement',
	Business: '💼 Business',
	Sports: '🏏 Sports',
	Art: '🖼️ Art',
	'Open-Source': '🐧 Open-Source',
	Programming: '💻 Programming'
};

const tagSvgMap: { [key: string]: string } = {
	Music: 'music',
	Game: 'controller',
	Nature: 'tree',
	Calm: 'coffee',
	Funny: 'smile-wink',
	Startup: 'chart',
	Life: 'leaf',
	Travel: 'plane',
	Food: 'pizza',
	Entrepreneurship: 'crown',
	Education: 'grad-cap',
	Health: 'firstaid',
	Love: 'love',
	Design: 'palette',
	Writing: 'pen',
	Technology: 'wrench',
	'Self-Improvement': 'running',
	Business: 'briefcase',
	Sports: 'football',
	Art: 'paint-brush',
	'Open-Source': 'laptop',
	Programming: 'code'
};

export const showTag = (tag: string) => {
	return tagMap[tag];
};

export const getTagSvgName = (tag: string) => {
	return tagSvgMap[tag];
};

export const getUsersMetaMap = async (usernames: string[]): Promise<UserMetaMap> => {
	const userMetaMapData = get(userMetaMap);
	const userNotInStore = usernames.filter((username) => !userMetaMapData.has(username));
	if (userNotInStore.length > 0) {
		const data = await client.User.getUsersMeta(userNotInStore);
		const newMap = new Map(userMetaMapData);
		data.data.users.forEach((user) => newMap.set(user.username, user));
		userMetaMap.set(newMap);
	}
	return get(userMetaMap);
};

export const getUsersMeta = async (usernames: string[]): Promise<UserMeta[]> => {
	const userMetaMapData = await getUsersMetaMap(usernames);
	return usernames.map((username) => userMetaMapData.get(username)!);
};

export const getAllTags = async (): Promise<string[]> => {
	const tags = get(allTags);
	if (tags.length === 0) {
		const data = await client.Post.getAllTags();
		allTags.set(data.data.tags);
		return data.data.tags;
	}
	return tags;
};
