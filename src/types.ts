export interface AuthResponse {
	access_token: string;
	username: string;
}

export interface GoogleAuthUrlResponse {
	auth_url: string;
}

export interface UpdateUserMetaRequest {
	work?: string;
	tagline?: string;
}

export interface Chat {
	from: string;
	text: string;
	date: Date;
	seen: boolean;
	_id: string;
}

export interface ChatGroup {
	_id: string;
	participants: string[];
	chats: Chat[];
	__v: number;
}

export interface ChatResponse {
	chats: ChatGroup[];
}

export interface Post {
	_id: string;
	author: string;
	url: string;
	title: string;
	description: string;
	image: string;
	site_name: string;
	favicon: string;
	created_at: string;
	tags: string[];
	commentCount: number;
	loveCount: number;
	isLovedByMe: boolean;
}

export interface PostResponse {
	posts: Post[];
}

export interface UserMeta {
	_id: string;
	username: string;
	image?: string;
	display_name?: string;
	__v: number;
	tagline?: string;
	work?: string;
}

export interface UserMetaResponse {
	users: UserMeta[];
}

export interface BookmarkResponse {
	bookmarks: Post[];
}

export interface Notification {
	_id: string;
	post_id: string;
	username: string;
	comment_author: string;
	clicked: boolean;
	created_at: string;
	__v: number;
}

export interface NotificationResponse {
	notifications: Notification[];
}
