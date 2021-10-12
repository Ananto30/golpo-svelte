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

	if (slug == "" || slug == $loggedUsername) {
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

	onMount(async () => {
		getProfileInfo();
		getPosts();
	});
</script>

<div in:fade class="grid grid-cols-12">
	<div class="col-span-8">
		<div class="w-full mx-auto">
			<div class="flex flex-row md:py-7 w-full mx-auto md:mx-16">
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

<div in:fade class="md:ml-28 antialiased my-auto min-h-screen pt-14 md:pt-5">
	<div class="top-12 md:top-20" style="margin-left: 760px;">
		<Tags />
	</div>

	<div class="w-full md:max-w-4xl mx-auto">
		<div class="bg-gray-100 rounded-2xl py-3 md:w-60">
			<div class="photo-wrapper p-2">
				<img
					class="w-32 h-32 rounded-full mx-auto"
					src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
					alt="John Doe" />
			</div>
			<div class="p-2">
				<h3 class="text-center text-xl text-gray-900 font-medium leading-8">{slug}</h3>
				<div class="text-center text-gray-500 text-xs ">
					<p>{work ? work : WORK}</p>
					<p><i>{tagline ? tagline : TAGLINE}</i></p>
				</div>

				<div class="text-center my-3">
					<a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#"
						>View Profile</a>
				</div>
			</div>
		</div>
	</div>
	{#if editable}
		<div class="">
			<div class="pl-5 md:pl-5">
				<PostBox />
			</div>
		</div>
	{/if}
	<div class=" py-5 md:py-0">
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
