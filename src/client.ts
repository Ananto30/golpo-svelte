import type { AxiosResponse } from 'axios';
import axios, { AxiosError } from 'axios';
import { get } from 'svelte/store';
import { BASE_URL } from './defaults';
import { jwt, loggedUsername } from './store';
import type {
	AuthResponse,
	BookmarkResponse,
	ChatGroup,
	ChatResponse,
	GoogleAuthUrlResponse,
	NotificationResponse,
	Post as PostType,
	PostResponse,
	PostWithComments,
	TagResponse,
	UpdateUserMetaRequest,
	UserMeta,
	UserMetaResponse,
	UserResponse
} from './types';

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
});

const getHeader = (): { headers: { Authorization: string } } => {
	return {
		headers: {
			Authorization: 'Bearer ' + get(jwt)
		}
	};
};

const errorHandler = (err: AxiosError): never => {
	if (err.response && (err.response.status === 401 || err.response.status === 403)) {
		jwt.set('');
		loggedUsername.set('');
	}
	throw err;
};

const Auth = {
	login: (username: string, password: string): Promise<AxiosResponse<AuthResponse>> =>
		api.post('/auth/login', {
			username: username,
			password: password
		}),
	getGoogleAuthUrl: (): Promise<AxiosResponse<GoogleAuthUrlResponse>> =>
		api.get('/auth/login/google/getAuthUrl'),
	getTokenByGoogleCode: (code: string): Promise<AxiosResponse<AuthResponse>> =>
		api.post('/auth/login/google/getToken', { code: code })
};

const User = {
	getMe: (): Promise<AxiosResponse<UserMeta>> =>
		api.get('/user/me', getHeader()).catch(errorHandler),
	getAllUsers: (): Promise<AxiosResponse<UserMetaResponse>> =>
		api.get('/user', getHeader()).catch(errorHandler),
	getByUsername: (username: string): Promise<AxiosResponse<UserResponse>> =>
		api.get(`/user/${username}`, getHeader()).catch(errorHandler),
	updateMeta: (meta: UpdateUserMetaRequest): Promise<AxiosResponse<void>> =>
		api.post('/user/me/update', meta, getHeader()).catch(errorHandler),
	getUsersMeta: (usernames: string[]): Promise<AxiosResponse<UserMetaResponse>> =>
		api.post('/user/get_users_meta', { usernames: usernames }, getHeader()).catch(errorHandler),
	followUser: (username: string): Promise<AxiosResponse<void>> =>
		api.post(`/user/${username}/follow`, {}, getHeader()).catch(errorHandler),
	unFollowUser: (username: string): Promise<AxiosResponse<void>> =>
		api.post(`/user/${username}/unfollow`, {}, getHeader()).catch(errorHandler),
	getFollowers: (username: string): Promise<AxiosResponse<UserMetaResponse>> =>
		api.get(`/user/${username}/followers`, getHeader()).catch(errorHandler),
	getFollowing: (username: string): Promise<AxiosResponse<UserMetaResponse>> =>
		api.get(`/user/${username}/following`, getHeader()).catch(errorHandler)
};

const Post = {
	getAll: (): Promise<AxiosResponse<PostResponse>> =>
		api.get('/post', getHeader()).catch(errorHandler),
	getFeed: (): Promise<AxiosResponse<PostResponse[]>> =>
		api.get('/post/feed', getHeader()).catch(errorHandler),
	getById: (id: string): Promise<AxiosResponse<PostWithComments>> =>
		api.get(`/post/${id}`, getHeader()).catch(errorHandler),
	getByUsername: (username: string): Promise<AxiosResponse<PostResponse>> =>
		api.get(`/post/user/${username}`, getHeader()).catch(errorHandler),
	createPost: (url: string, tags: string[]): Promise<AxiosResponse<PostType>> =>
		api.post('/post', { url: url, tags: tags }, getHeader()).catch(errorHandler),
	createComment: (postId: string, text: string): Promise<AxiosResponse<PostWithComments>> =>
		api.post(`/post/${postId}/comment`, { text: text }, getHeader()).catch(errorHandler),
	getAllTags: (): Promise<AxiosResponse<TagResponse>> =>
		api.get('/post/tags', getHeader()).catch(errorHandler),
	reactLove: (postId: string): Promise<AxiosResponse<void>> =>
		api.post(`/post/${postId}/love`, {}, getHeader()).catch(errorHandler),
	deletePost: (postId: string): Promise<AxiosResponse<void>> =>
		api.post(`/post/${postId}/delete`, {}, getHeader()).catch(errorHandler),
	getBookmarks: (): Promise<AxiosResponse<BookmarkResponse>> =>
		api.get('/post/bookmarks', getHeader()).catch(errorHandler),
	bookmarkPost: (postId: string): Promise<AxiosResponse<void>> =>
		api.post(`/post/${postId}/bookmark`, {}, getHeader()).catch(errorHandler),
	unbookmarkPost: (postId: string): Promise<AxiosResponse<void>> =>
		api.post(`/post/${postId}/unbookmark`, {}, getHeader()).catch(errorHandler),
	deleteComment: (postId: string, commentId: string): Promise<AxiosResponse<PostWithComments>> =>
		api.post(`/post/${postId}/comment/${commentId}/delete`, {}, getHeader()).catch(errorHandler)
};

const Chat = {
	getChats: (): Promise<AxiosResponse<ChatResponse>> =>
		api.get('/chat', getHeader()).catch(errorHandler),
	getChatsByReceiver: (receiver: string): Promise<AxiosResponse<ChatGroup>> =>
		api.get(`/chat/${receiver}`, getHeader()).catch(errorHandler),
	sendChat: (receiver: string, text: string): Promise<AxiosResponse<void>> =>
		api
			.post(
				`/chat/${receiver}`,
				{
					text: text
				},
				getHeader()
			)
			.catch(errorHandler),
	sendMessage: (receiver: string, text: string): Promise<AxiosResponse<void>> =>
		api
			.post(
				`/chat/${receiver}/message`,
				{
					text: text
				},
				getHeader()
			)
			.catch(errorHandler)
};

const Notification = {
	getAll: (username: string): Promise<AxiosResponse<NotificationResponse>> =>
		api.get(`/notification/${username}`, getHeader()).catch(errorHandler),
	click: (id: string): Promise<AxiosResponse<void>> =>
		api.post(`/notification/${id}/clicked`, {}, getHeader()).catch(errorHandler)
};

// const Activity = {
//     getAll: (): Promise<AxiosResponse<ActivityResponse[]>> => api.get('/activity', getHeader()).catch(errorHandler)
// };

export default {
	Auth,
	User,
	Post,
	Chat,
	// Activity,
	Notification
};
