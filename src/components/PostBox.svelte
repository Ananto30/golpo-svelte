<script lang="ts">
	import client from '../client';
	import { error, info, allTags } from '../store';
	import Multiselect from './Multiselect.svelte';
	import type { Post } from '../types';

	export let newCreatedPost: Post;

	let url: string = '';
	let selectedTags: string[] = [];

	const sharePost = async (): Promise<void> => {
		if (selectedTags.length === 0) {
			$error = 'At least select one tag!';
			return;
		}
		if (url === '') {
			$error = 'You want to share something? Put the link/url in the box!';
			return;
		}
		try {
			const res = await client.Post.createPost(url, selectedTags);
			url = '';
			selectedTags = [];
			$info = 'Post shared!';
			newCreatedPost = res.data;
			newCreatedPost.loveCount = 0;
			newCreatedPost.commentCount = 0;
		} catch (e) {
			$error = 'Sharing not successful';
		}
	};
</script>

<div class="mx-auto flex max-w-xl p-2 md:p-4">
	<div class="w-full rounded-md border border-gray-300 p-4 pb-6">
		<div class="mx-auto flex max-w-xl">
			<div class="w-full">
				<input
					bind:value={url}
					aria-placeholder="Share a link"
					placeholder="Share a link"
					class="block h-10 w-full border-b border-gray-300 px-4 py-2 text-sm focus:outline-none"
				/>
			</div>
		</div>
		<div class="mx-auto mt-2 flex md:mt-4">
			{#if $allTags.length > 0}
				<div class="flex flex-grow">
					<Multiselect id="tags" bind:value={selectedTags} placeholder="+ Add tags">
						{#each $allTags as tag}
							<option value={tag}>{tag}</option>
						{/each}
					</Multiselect>
				</div>
			{/if}
			<div class="flex justify-end">
				<button
					on:click={sharePost}
					type="button"
					class="ml-2 border border-transparent bg-black px-4 text-sm text-white transition duration-200 hover:cursor-pointer hover:border-current hover:bg-white hover:text-black focus-visible:ring"
				>
					Share
				</button>
			</div>
		</div>
	</div>
</div>
