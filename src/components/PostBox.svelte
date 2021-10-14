<script>
	import client from "../client";
	import { loggedUserImage, tags, error, info } from "../store";
	import Multiselect from "./Multiselect.svelte";

	let url = "";
	let selectedTags = [];

	const sharePost = () => {
		if (selectedTags.length === 0) {
			$error = "Atleast select one tag!";
		} else if (url == "") {
			$error = "You want to share something? Put the link/url in the box!";
		} else {
			client.Post.createPost(url, selectedTags)
				.then((res) => {
					if (res.status === 200) {
						url = "";
						$info = "Post shared!";
					} else {
						$error = "Sharing not successful";
					}
				})
				.catch((err) => {
					$error = "Sharing not successful";
				});
		}
	};

	$: if (selectedTags.length > 3) {
		$error = "You can put at most 3 tags!";
		selectedTags = selectedTags.splice(0, 3);
		selectedTags = selectedTags;
	}
</script>

<div class="border rounded-lg max-w-xl mx-auto shadow-sm p-5">
	<div class="flex  items-center max-w-xl mx-auto">
		<div class="w-full max-w-xl flex gap-2 items-center">
			<img class="w-12 rounded-full border-2 border-indigo-400" src={$loggedUserImage} alt="Alex" />
			<div class="w-full">
				<input
					bind:value={url}
					aria-placeholder="Share a link"
					placeholder="Share a link"
					class="w-full py-2 px-5 block rounded-full focus:outline-none border-gray-300 focus:border-indigo-400 border bg-white focus:text-gray-700  text-sm md:text-base" />
			</div>

			<button
				on:click={sharePost}
				class="flex items-center gap-1 border border-gray-300 p-2 rounded-full hover:bg-indigo-100 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
				<span
					><img
						width="32"
						src="data:image/png;base64,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" /></span>
			</button>
		</div>
	</div>
	<div class="w-full max-w-sm mx-auto pt-2">
		{#if $tags.length > 0}
			<Multiselect id="tags" bind:value={selectedTags} placeholder="Tags">
				{#each $tags as tag}
					<option value={tag}>{tag}</option>
				{/each}
			</Multiselect>
		{/if}
	</div>
</div>
