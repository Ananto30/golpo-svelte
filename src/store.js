import { writable } from "svelte/store";

// TODO: Add a store for the current user
export const user = writable(JSON.parse(localStorage.getItem("user")) || {});
export const loggedIn = writable(false);
export const loginRedirect = writable(null);
export const jwt = writable("");
