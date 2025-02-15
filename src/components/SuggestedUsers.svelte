<script>
	import { onMount } from 'svelte';
	import client from '../client';
	import { fade } from 'svelte/transition';
	import { tags } from '../store';
	import { showTag } from '../helpers';

	export let selectedTag = '';

	const getTags = () => {
		client.Post.getAllTags()
			.then((res) => {
				$tags = res.data.tags;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const selectTag = (tag) => {
		if (selectedTag === tag) {
			selectedTag = '';
		} else {
			selectedTag = tag;
		}
	};

	onMount(async () => {
		getTags();
	});
</script>

<div in:fade class="sticky top-0 mx-10 hidden w-full px-2 py-7 md:block">
	<div class="rounded-2xl bg-white">
		<h2 class="px-3 text-2xl font-extrabold text-indigo-500">Tags</h2>
		<div class="flex flex-wrap pt-4">
			{#each $tags as tag}
				<button
					on:click={() => selectTag(tag)}
					class="{selectedTag == tag
						? 'bg-indigo-200'
						: ''} m-1 items-center rounded-full border border-indigo-200 px-3 py-1 text-sm transition duration-200 hover:bg-indigo-100 hover:shadow-md focus:bg-indigo-200 focus:outline-none focus-visible:border-gray-500"
				>
					<span>{showTag(tag)}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
