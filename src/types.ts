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

export interface Comment {
	_id: string;
	author: string;
	text: string;
	created_at: string;
}

export interface PostLove {
	_id: string;
	author: string;
}

// export interface PostWithComments {
// 	_id: string;
// 	author: string;
// 	url: string;
// 	title: string;
// 	description: string;
// 	image: string;
// 	site_name: string;
// 	favicon: string;
// 	created_at: string;
//     comments: Comment[];
//     loves: PostLove[];
// 	tags: string[];

//     // Generated by the client
//     commentCount?: number;
//     loveCount?: number;
//     isLovedByMe?: boolean;
// }

export interface PostWithComments extends Post {
	comments: Comment[];
	loves: PostLove[];
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

export interface TagResponse {
	tags: string[];
}

export interface ErrorResponse {
	errors: string;
}

export interface UserResponse {
	username: string;
	followers: string[];
	following: string[];
	work?: string;
	tagline?: string;
	image?: string;
	display_name?: string;
}
