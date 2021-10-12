<script>
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import client from "../client";

	import Tags from "../components/Tags.svelte";
	import Post from "../components/Post.svelte";
	import Footer from "../components/Footer.svelte";
	import PostBox from "../components/PostBox.svelte";

	let posts = [];

	const getPosts = () => {
		client.Post.getAll().then((res) => {
			posts = res.data.posts.reverse();
		});
	};

	onMount(async () => {
		getPosts();
	});
</script>

<div in:fade class="grid grid-cols-12">
	<div class="col-span-8">
		<div class="px-3 md:px-0 md:py-7 min-w-full">
			<PostBox />
		</div>
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
	<div class="col-span-4">
		<Tags />
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
