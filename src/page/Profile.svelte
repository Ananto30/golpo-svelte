<script>
	import { fade } from "svelte/transition";
	import PostBox from "../components/PostBox.svelte";
	import { loggedUsername } from "../store";
	import Footer from "../components/Footer.svelte";
	import Post from "../components/Post.svelte";
	import { onMount } from "svelte";
	import client from "../client";
	import { TAGLINE, WORK } from "../defaults";

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
			posts = res.data.posts;
			console.log(posts);
		});
	};

	onMount(async () => {
		getProfileInfo();
		getPosts();
	});
</script>

<div in:fade class="pt-14 antialiased my-auto min-h-screen">
	<div class="md:fixed md:max-w-sm py-4 px-5">
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

	<div class="md:ml-80 py-5 border-b border-l border-t md:border-t-0">
		<div class="pl-5 md:pl-10">
			<PostBox />
		</div>
	</div>
	<div class="md:ml-80 border-l py-5 md:py-0">
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
</div>

<Footer />
