<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page, isLoading } from '../store';
	import client from '../client';

	import Tags from '../components/Tags.svelte';
	import Posts from '../components/Posts.svelte';
	import Footer from '../components/Footer.svelte';

	let allPosts = [];
	let selectedTag = '';

	const getPosts = async () => {
		const res = await client.Post.getBookmarks();
		allPosts = res.data.bookmarks.reverse();
		$isLoading = false;
	};

	onMount(async () => {
		$page = 'bookmarks';
		getPosts();
	});
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-8">
		<div class="mx-auto grid">
			{#if allPosts.length > 0}
				<div in:fade class="mx-auto mt-12 md:mt-6">
					<Posts bind:allPosts bind:selectedTag />
				</div>
			{/if}
		</div>
	</div>
	<div class="col-span-4">
		<Tags bind:selectedTag />
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
