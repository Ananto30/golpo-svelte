import { writable } from 'svelte/store';

export const jwt = writable<string>(localStorage.getItem('jwt') || '');
export const loggedUsername = writable<string>(localStorage.getItem('loggedUsername') || '');
// export const loggedUserImage = writable<string>(localStorage.getItem("loggedUserImage") || "");
export const loggedUserImage = writable<string>('');
export const tags = writable<string[]>([]);
export const error = writable<string>('');
export const info = writable<string>('');
export const page = writable<string>('');

export const isLoading = writable<boolean>(true);

export const myBookmarkIds = writable<string[]>([]);

jwt.subscribe((jwt: string) => localStorage.setItem('jwt', jwt));
loggedUsername.subscribe((username: string) => localStorage.setItem('loggedUsername', username));
// loggedUserImage.subscribe((image: string) => localStorage.setItem("loggedUserImage", image));
