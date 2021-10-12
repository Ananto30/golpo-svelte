<script>
	import { fade } from "svelte/transition";
	import { loggedUsername } from "../store";
	import { onMount } from "svelte";
	import client from "../client";
	import { TAGLINE, WORK } from "../defaults";

	import PostBox from "../components/PostBox.svelte";
	import Footer from "../components/Footer.svelte";
	import Post from "../components/Post.svelte";
	import Tags from "../components/Tags.svelte";

	export let slug;
	let posts = [];
	let editable = false;
	let work;
	let tagline;

	$: if (slug == "" || slug == $loggedUsername) {
		editable = true;
		slug = $loggedUsername;
	}
	const getProfileInfo = () => {
		client.User.getByUsername(slug).then((res) => {
			work = res.data.work;
			tagline = res.data.tagline;
		});
	};
	const getPosts = () => {
		client.Post.getByUsername(slug).then((res) => {
			posts = res.data.posts.reverse();
			console.log(posts);
		});
	};

	$: if (slug) {
		getProfileInfo();
		getPosts();
	}
</script>

<div in:fade class="grid grid-cols-12 min-h-screen">
	<div class="col-span-12 md:col-span-8">
		<div class="w-full mx-auto">
			<div class="flex flex-row mt-14 md:mt-0 py-5 md:py-7 w-full px-3 md:px-16">
				<div class="w-auto h-auto rounded-full border-2 border-blue-500">
					<img
						class="w-32 h-32 object-cover rounded-full shadow cursor-pointer"
						alt="User avatar"
						src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" />
				</div>
				<div class="flex flex-col mb-2 ml-4 mt-1">
					<div class=" text-2xl font-bold">{slug}</div>

					<div class=" font-base mr-1">{work ? work : WORK}</div>
					<div class="text-gray-500 text-sm">{tagline ? tagline : TAGLINE}</div>
				</div>
			</div>
		</div>

		<div class="px-3 md:px-0 pt-5 md:py-7 min-w-full border-t md:border-t-0">
			{#if editable}
				<PostBox />
			{/if}
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
