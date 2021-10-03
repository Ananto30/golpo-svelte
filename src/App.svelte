<script>
	import { onMount } from "svelte";
	import Nav from "./components/Nav.svelte";

	import Home from "./page/Home.svelte";
	import Footer from "./components/Footer.svelte";
	import Chat from "./page/Chat.svelte";
	import Users from "./page/Users.svelte";
	import Login from "./page/Login.svelte";
	import Profile from "./page/Profile.svelte";
	import LoginRedirect from "./page/LoginRedirect.svelte";
  
	import { loggedIn } from "./store.js";

	let currentPage;

	const pageMapping = {
		"": Home,
		"/home": Home,
		"/chat": Chat,
		"/users": Users,
		"/profile": Profile,
		"/loginredirect": LoginRedirect,
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
	{#if $loggedIn}
		<Login />
	{:else}
		<Nav />
		<svelte:component this={currentPage} />
		<Footer />
	{/if}
</body>

<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	body {
		/* font-family: 'IBM Plex Sans', sans-serif; */
		/* font-family: 'Handlee', cursive; */
		/* font-family: 'Nunito', sans-serif; */
		/* font-family: 'Open Sans', sans-serif; */
		/* font-family: 'Ubuntu', sans-serif; */
		/* font-family: 'Nanum Gothic', sans-serif; */
		/* font-family: 'Dosis', sans-serif; */
		/* font-family: 'Libre Franklin', sans-serif; */
		/* font-family: 'Bitter', serif; */
		font-family: "Exo 2", sans-serif;
		/* font-family: 'Maven Pro', sans-serif; */
		/* max-width: 1152px; */
	}
	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
</style>
