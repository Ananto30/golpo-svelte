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

	import { loggedIn, loggedUsername } from "./store.js";

	let currentPage;
	let props;

	const pageMapping = {
		"": Home,
		home: Home,
		chat: Chat,
		users: Users,
		profile: Profile,
		loginredirect: LoginRedirect,
		userchat: MobileUserChat,
	};

	const slugPageMapping = {
		chat: Chat,
		profile: Profile,
	};

	function hashchange() {
		// the poor man's router!
		let path = window.location.hash.slice(1);
		path = path.split("?")[0];
		path = path.split("/");

		console.log(path);
		if (path.length == 3 && path[2] != "") {
			setTimeout(() => {
				currentPage = slugPageMapping[path[1]];
				props = { slug: path[2] };
				window.scrollTo(0, 0);
			}, 200);
		} else {
			setTimeout(() => {
				path = path[1] || path[0];
				currentPage = pageMapping[path];
				window.scrollTo(0, 0);
			}, 200);
		}
	}

	onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange} />

<body class="container max-w-7xl mx-auto">
	{#if !$loggedUsername}
		<!-- HINT: remove the ! for easy developemnt without login everytime -->
		<Login />
	{:else}
		<div>
			<div class="max-w-7xl mx-auto grid grid-cols-12">
				<div class="col-span-2">
					<Nav />
				</div>
				<div class="col-span-10">
					<svelte:component this={currentPage} {...props} />
				</div>
			</div>
		</div>
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
