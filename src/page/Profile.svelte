<script>
	import { fade } from "svelte/transition";
	import { loggedUsername, error } from "../store";
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
	let image;
	let followed = false;

	$: if (slug == "" || slug == $loggedUsername) {
		editable = true;
		slug = $loggedUsername;
	}
	const getProfileInfo = () => {
		client.User.getByUsername(slug).then((res) => {
			work = res.data.work;
			tagline = res.data.tagline;
			image = res.data.image;
		});
	};
	const getPosts = () => {
		client.Post.getByUsername(slug).then((res) => {
			posts = res.data.posts.reverse();
			console.log(posts);
		});
	};
	const followUser = () => {
		client.User.followUser(slug)
			.then((res) => {
				if (res.status == 200) {
					followed = true;
				} else {
					$error = "You are already following this user";
				}
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				$error = err;
			});
	};

	$: if (slug) {
		getProfileInfo();
		getPosts();
	}
</script>

<div in:fade class="grid grid-cols-12 min-h-screen">
	<div class="col-span-12 md:col-span-8">
		<div class="sticky top-14 md:top-0 bg-white z-10">
			<div class="w-full mx-auto">
				<div class="flex mt-14 md:mt-20 py-5 w-full px-3 md:px-16">
					<div class="flex-none w-16 md:w-32 h-16 md:h-32 rounded-full">
						<img
							class="w-16 md:w-32 h-16 md:h-32 object-cover rounded-full shadow cursor-pointer border-2 border-indigo-500"
							alt="User avatar"
							src={image} />
					</div>
					<div class="flex flex-col mb-2 ml-4 mt-1">
						<div class=" text-2xl font-bold">{slug}</div>
						<div class=" font-base mr-1">{work ? work : WORK}</div>
						<div class="text-gray-500 text-sm">
							{tagline ? tagline : TAGLINE}
						</div>
						{#if !editable}
							<div class="mt-5">
								<button
									on:click={followUser}
									class="flex-none text-sm border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
									<span>Follow</span>
								</button>
								<button
									class="flex-none text-sm border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
									<span>Send Message</span>
								</button>
							</div>
						{/if}
					</div>
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
