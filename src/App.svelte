<script>
	import { onMount } from "svelte";
	import Nav from "./components/Nav.svelte";

	import Home from "./page/Home.svelte";
	import Chat from "./page/Chat.svelte";
	import Users from "./page/Users.svelte";
	import Login from "./page/Login.svelte";
	import Profile from "./page/Profile.svelte";
	import LoginRedirect from "./page/LoginRedirect.svelte";
	import MobileUserChat from "./components/MobileUserChat.svelte";

	import { loggedIn } from "./store.js";

	let currentPage;

	const pageMapping = {
		"": Home,
		"/home": Home,
		"/chat": Chat,
		"/users": Users,
		"/profile": Profile,
		"/loginredirect": LoginRedirect,
		"/userchat": MobileUserChat,
	};

	function hashchange() {
		// the poor man's router!
		let path = window.location.hash.slice(1);
		path = path.split("?")[0];
		console.log(path);
		setTimeout(() => {
			currentPage = pageMapping[path];
			window.scrollTo(0, 0);
		}, 200);
	}

	onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange} />

<body class="container max-w-6xl mx-auto">
	{#if $loggedIn}  <!-- TODO: fix the logic, this is done to continue development -->
		<Login />
	{:else}
		<Nav />
		<svelte:component this={currentPage} />
	{/if}
</body>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
			"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
</style>
