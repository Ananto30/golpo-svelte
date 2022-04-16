import { writable } from "svelte/store";

export const jwt = writable(localStorage.getItem("jwt") || "");
export const loggedUsername = writable(localStorage.getItem("loggedUsername") || "");
// export const loggedUserImage = writable(localStorage.getItem("loggedUserImage") || "");
export const loggedUserImage = writable("");
export const tags = writable([]);
export const error = writable("");
export const info = writable("");
export const page = writable("");

jwt.subscribe((jwt) => localStorage.setItem("jwt", jwt));
loggedUsername.subscribe((username) => localStorage.setItem("loggedUsername", username));
// loggedUserImage.subscribe((image) => localStorage.setItem("loggedUserImage", image));
