import { writable } from "svelte/store";

export const loggedIn = writable(false);
export const loginRedirect = writable(null);
export const jwt = writable(localStorage.getItem("jwt") || "");
export const loggedUsername = writable(localStorage.getItem("loggedUsername") || "");

loggedUsername.subscribe((username) => localStorage.setItem("loggedUsername", username));
jwt.subscribe((jwt) => localStorage.setItem("jwt", jwt));
