<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Footer from '../components/Footer.svelte';
	import PostBox from '../components/PostBox.svelte';
	import Posts from '../components/Posts.svelte';
	import Tags from '../components/Tags.svelte';
	import { isLoading, page } from '../store';
	import type { Post, UserMeta } from '../types';

	let allPosts: Post[] = [];
	let selectedTag: string = '';
	let users: UserMeta[] = [];
	let newCreatedPost: Post;

	const getPosts = async () => {
		const res = await client.Post.getAll();
		allPosts = res.data.posts.reverse();

		// we also need the user data to show proper names and user images
		const postUsernames = allPosts.map((post) => post.author);
		const userRes = await client.User.getUsersMeta(postUsernames);
		users = userRes.data.users;

		$isLoading = false;
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
		{#if allPosts.length > 0}
			<div class="mx-auto grid">
				<div class="mx-auto mt-4">
					<Posts bind:allPosts bind:selectedTag bind:users />
				</div>
			</div>
		{:else}
			<div class="mx-auto mt-4">
				<p class="text-center text-gray-600">No posts yet...</p>
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
