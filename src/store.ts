import { writable } from 'svelte/store';
import type { UserMeta } from './types';

export const jwt = writable<string>(localStorage.getItem('jwt') || '');
export const loggedUsername = writable<string>(localStorage.getItem('loggedUsername') || '');

// on update, save to local storage
jwt.subscribe((jwt: string) => localStorage.setItem('jwt', jwt));
loggedUsername.subscribe((username: string) => localStorage.setItem('loggedUsername', username));

export const loggedUserImage = writable<string>('');
export const error = writable<string>('');
export const info = writable<string>('');
export const page = writable<string>('');
export const isLoading = writable<boolean>(true);
export const myBookmarkIds = writable<string[]>([]);

/*
These are cached in the store to avoid making multiple requests to the server.
*/

// username -> UserMeta
export const userMetaMap = writable<Map<string, UserMeta>>(new Map());
export const allTags = writable<string[]>([]);
