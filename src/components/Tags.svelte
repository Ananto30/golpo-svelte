<script>
	import { onMount } from "svelte";
	import client from "../client";

	let tags = [];

	const getTags = () => {
		client.Post.getAllTags()
			.then((res) => {
				tags = res.data.tags;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	onMount(async () => {
		getTags();
	});
</script>

<div class="hidden md:block mx-10 sticky top-0 w-full py-7 px-2">
	<div class="rounded-2xl bg-white">
		<h2 class="px-3 text-2xl font-extrabold">Tags</h2>
		<div class="flex flex-wrap pt-10">
			{#each tags as tag}
				<button
					class="bg-gray-100 m-2 text-sm items-center gap-1 border border-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>{tag}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
