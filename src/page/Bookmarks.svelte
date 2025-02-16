<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Footer from '../components/Footer.svelte';
	import Posts from '../components/Posts.svelte';
	import Tags from '../components/Tags.svelte';
	import { isLoading, page } from '../store';
	import type { Post as PostType, UserMeta } from '../types';

	let allPosts: PostType[] = [];
	let selectedTag: string = '';
	let users: UserMeta[] = [];

	let hasLoaded = false;

	const getPosts = async () => {
		const res = await client.Post.getBookmarks();
		allPosts = res.data.bookmarks.reverse();

		// we also need the user data to show proper names and user images
		const postUsernames = allPosts.map((post) => post.author);
		const userRes = await client.User.getUsersMeta(postUsernames);
		users = userRes.data.users;

		$isLoading = false;
		hasLoaded = true;
	};

	onMount(async () => {
		$page = 'bookmarks';
		getPosts();
	});
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-8">
		{#if !hasLoaded}
			<div class="flex h-64 items-center justify-center">
				<p class="text-center text-gray-600">Loading...</p>
			</div>
		{:else if hasLoaded && allPosts.length === 0}
			<div class="flex h-64 items-center justify-center">
				<p class="text-center text-gray-500">
					No bookmarks yet...
					<br />
					To bookmark a post, click the bookmark icon on a post.
				</p>
			</div>
		{:else}
			<div class="mx-auto grid">
				<div in:fade class="mx-auto mt-12 md:mt-6">
					<Posts {allPosts} {users} {selectedTag} />
				</div>
			</div>
		{/if}
	</div>
	<div class="col-span-4">
		<Tags {selectedTag} />
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
