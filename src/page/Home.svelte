<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Footer from '../components/Footer.svelte';
	import Loading from '../components/Loading.svelte';
	import PostBox from '../components/PostBox.svelte';
	import Posts from '../components/Posts.svelte';
	import Tags from '../components/Tags.svelte';
	import { getUsersMeta } from '../helpers';
	import { isLoading, page } from '../store';
	import type { Post, UserMeta } from '../types';

	let allPosts: Post[] = [];
	let selectedTag: string = '';
	let usersMeta: UserMeta[] = [];
	let newCreatedPost: Post;

	let hasLoaded = false;

	const getPosts = async () => {
		const res = await client.Post.getAll();
		allPosts = res.data.posts.reverse();

		// we also need the user data to show proper names and user images
		const postUsernames = allPosts.map((post) => post.author);
		usersMeta = await getUsersMeta(postUsernames);

		$isLoading = false;
		hasLoaded = true;
	};

	$: if (newCreatedPost) {
		allPosts = [newCreatedPost, ...allPosts];
	}

	onMount(async () => {
		$page = 'home';
		getPosts();
	});
</script>

<div class="grid grid-cols-12">
	<div in:fade class="col-span-12 md:col-span-8">
		<div class="mt-16 min-w-full md:mt-6">
			<PostBox bind:newCreatedPost />
		</div>
		{#if !hasLoaded}
			<div class="flex h-64 items-center justify-center">
				<Loading />
			</div>
		{:else if allPosts.length === 0}
			<div class="flex h-64 items-center justify-center">
				<p class="text-center text-gray-500">
					No posts yet...
					<br />
					Be the first one to post something!
				</p>
			</div>
		{:else}
			<div class="mx-auto grid">
				<div class="mx-auto mt-4">
					<Posts bind:allPosts bind:selectedTag bind:usersMeta />
				</div>
			</div>
		{/if}
	</div>
	<div class="col-span-4">
		<Tags bind:selectedTag />
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
