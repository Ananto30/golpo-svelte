<script>
	import { onMount } from 'svelte';
	import Nav from '../components/Nav.svelte';

	import Home from '../page/Home.svelte';
	import Chat from '../page/Chat.svelte';
	import Users from '../page/Users.svelte';
	import Login from '../page/Login.svelte';
	import Profile from '../page/Profile.svelte';
	import Post from '../page/Post.svelte';
	import Bookmarks from '../page/Bookmarks.svelte';
	import Notification from '../page/Notification.svelte';

	import Alert from '../components/Alert.svelte';

	import { loggedUsername, error, info, isLoading, myBookmarkIds } from '../store';
	import client from '../client';

	let currentPage;
	let props;

	const pageMapping = {
		'': Home,
		home: Home,
		chat: Chat,
		users: Users,
		profile: Profile,
		bookmarks: Bookmarks,
		notification: Notification
	};

	const slugPageMapping = {
		chat: Chat,
		profile: Profile,
		post: Post
	};

	function hashchange() {
		// the poor man's router!
		let path = window.location.hash.slice(1);
		path = path.split('?')[0];
		path = path.split('/');

		if (path.length == 3 && path[2] != '') {
			setTimeout(() => {
				props = { slug: path[2] };
				currentPage = slugPageMapping[path[1]];
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

	onMount(async () => {
		hashchange();
		if ($myBookmarkIds.length === 0) {
			const res = await client.Post.getBookmarks();
			$myBookmarkIds = res.data.bookmarks.map((i) => i._id);
		}
	});
</script>

<svelte:window on:hashchange={hashchange} />

<div class="antialised container mx-auto max-w-7xl">
	{#if $isLoading === true}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-sky-50">
			<img
				src="/images/200w.gif"
				alt="loading"
				class="mx-auto rounded-tl-4xl rounded-tr-md rounded-br-4xl rounded-bl-md"
			/>
		</div>
	{/if}

	<div class="mx-auto flex">
		{#if $error}
			<Alert name="error" bind:message={$error} />
		{/if}
		{#if $info}
			<Alert name="info" bind:message={$info} />
		{/if}
	</div>

	<!-- HINT: remove the ! for easy developemnt without login everytime -->
	{#if !$loggedUsername}
		<Login />
	{:else}
		<div>
			<div class="mx-auto grid max-w-7xl grid-cols-12">
				<div class="col-span-12 md:col-span-2">
					<Nav />
				</div>
				<div class="col-span-12 md:col-span-10">
					<svelte:component this={currentPage} {...props} />
				</div>
			</div>
		</div>
	{/if}
</div>
