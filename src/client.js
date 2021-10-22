import axios from "axios";
import { get } from "svelte/store";
import { jwt, loggedUsername } from "./store";
import { BASE_URL } from "./defaults";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const getHeader = () => {
	return {
		headers: {
			Authorization: "Bearer " + get(jwt),
		},
	};
};

const errorHandler = (err) => {
	if (err.response && (err.response.status === 401 || err.response.status === 403)) {
		jwt.set("");
		loggedUsername.set("");
	}
};

// const verifySuccessCalls = (res) => {
//   if (res.status === 200) return res;
// };

const Auth = {
	login: (username, password) =>
		api.post("/auth/login", {
			username: username,
			password: password,
		}),
	getGoogleAuthUrl: () => api.get("/auth/login/google/getAuthUrl"),
	getTokenByGoogleCode: (code) => api.post("/auth/login/google/getToken", { code: code }),
};

const User = {
	getMe: () => api.get("/user/me", getHeader()).catch(errorHandler),
	getAllUsers: () => api.get("/user", getHeader()).catch(errorHandler),
	getByUsername: (username) => api.get(`/user/${username}`, getHeader()).catch(errorHandler),
	updateMeta: (meta) => api.post("/user/me/update", meta, getHeader()).catch(errorHandler),
	getUsersMeta: (usernames) => api.post("/user/get_users_meta", { usernames: usernames }, getHeader()).catch(errorHandler),
	followUser: (username) => api.post(`/user/${username}/follow`, {}, getHeader()).catch(errorHandler),
	unFollowUser: (username) => api.post(`/user/${username}/unfollow`, {}, getHeader()).catch(errorHandler),
	getFollowers: (username) => api.get(`/user/${username}/followers`, getHeader()).catch(errorHandler),
	getFollowing: (username) => api.get(`/user/${username}/following`, getHeader()).catch(errorHandler),
};

const Post = {
	getAll: () => api.get("/post", getHeader()).catch(errorHandler),
	getById: (id) => api.get(`/post/${id}`, getHeader()).catch(errorHandler),
	getByUsername: (username) => api.get(`/post/user/${username}`, getHeader()).catch(errorHandler),
	createPost: (url, tags) => api.post("/post", { url: url, tags: tags }, getHeader()).catch(errorHandler),
	createComment: (postId, text) =>
		api.post(`/post/${postId}/comment`, { text: text }, getHeader()).catch(errorHandler),
	getAllTags: () => api.get("/post/tags", getHeader()).catch(errorHandler),
	reactLove: (postId) => api.post(`/post/${postId}/love`, {}, getHeader()).catch(errorHandler),
	deletePost: (postId) => api.post(`/post/${postId}/delete`,{}, getHeader()).catch(errorHandler),
	getBookmarks: () => api.get("/post/bookmarks", getHeader()).catch(errorHandler),
	bookmarkPost: (postId) => api.post(`/post/${postId}/bookmark`, {}, getHeader()).catch(errorHandler),
};

const Chat = {
	getChats: () => api.get("/chat", getHeader()).catch(errorHandler),
	getChatsByReceiver: (receiver) => api.get(`/chat/${receiver}`, getHeader()).catch(errorHandler),
	sendChat: (receiver, text) =>
		api
			.post(
				`/chat/${receiver}`,
				{
					text: text,
				},
				getHeader()
			)
			.catch(errorHandler),
	sendMessage: (receiver, text) =>
		api
			.post(
				`/chat/${receiver}/message`,
				{
					text: text,
				},
				getHeader()
			)
			.catch(errorHandler),
};

const Activity = {
	getAll: () => api.get("/activity", getHeader()).catch(errorHandler),
};

export default {
	Auth,
	User,
	Post,
	Chat,
	Activity,
};
