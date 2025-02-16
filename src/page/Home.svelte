<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page, isLoading } from '../store';
	import client from '../client';

	import Tags from '../components/Tags.svelte';
	import Posts from '../components/Posts.svelte';
	import Footer from '../components/Footer.svelte';
	import PostBox from '../components/PostBox.svelte';

	let allPosts = [];
	let selectedTag = '';
	let sharedPost = null;

	const getPosts = async () => {
		const res = await client.Post.getAll();
		allPosts = res.data.posts.reverse();
		$isLoading = false;
	};

	$: if (sharedPost) {
		allPosts = [sharedPost, ...allPosts];
	}

	onMount(async () => {
		$page = 'home';
		getPosts();
	});
</script>

<div class="grid grid-cols-12">
	<div in:fade class="col-span-12 md:col-span-8">
		<div class="mt-16 min-w-full md:mt-6">
			<PostBox bind:sharedPost />
		</div>
		{#if allPosts.length > 0}
			<div class="mx-auto grid">
				<div class="mx-auto mt-4">
					<Posts bind:allPosts bind:selectedTag />
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
