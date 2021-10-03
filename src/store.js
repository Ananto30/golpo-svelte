import { writable } from "svelte/store";

export const cart = writable(JSON.parse(localStorage.getItem("cart")) || {});
export const user = writable(JSON.parse(localStorage.getItem("user")) || {});
export const showCart = writable(false);
export const loggedIn = writable(false);
export const loginRedirect = writable(null);
export const jwt = writable("");

cart.subscribe((val) => localStorage.setItem("cart", JSON.stringify(val)));
user.subscribe((val) => localStorage.setItem("user", JSON.stringify(val)));
