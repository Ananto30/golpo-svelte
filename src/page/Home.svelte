<script>
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import client from "../client";

	import Tags from "../components/Tags.svelte";
	import Post from "../components/Post.svelte";
	import Footer from "../components/Footer.svelte";
	import PostBox from "../components/PostBox.svelte";

	let allPosts = [];
	let filteredPosts = [];
	let selectedTag = "";

	const getPosts = () => {
		client.Post.getAll().then((res) => {
			allPosts = res.data.posts.reverse();
			filteredPosts = allPosts;
		});
	};

	const filterByTag = (tag) => {
		if (tag == "All") {
			filteredPosts = allPosts;
		} else {
			filteredPosts = allPosts.filter((post) => {
				return post.tags.includes(tag);
			});
		}
	};

	$: if (selectedTag) {
		filterByTag(selectedTag);
	}

	onMount(async () => {
		getPosts();
	});
</script>

<div in:fade class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-8">
		<div class="px-3 md:px-0 pt-20 md:py-7 min-w-full">
			<PostBox />
		</div>
		{#each filteredPosts as post}
			<Post {post} />
		{/each}
	</div>
	<div class="col-span-4">
		<Tags bind:selectedTag />
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
