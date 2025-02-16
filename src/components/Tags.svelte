<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Svg from '../components/Svg.svelte';
	import { getTagSvgName } from '../helpers';
	import { tags } from '../store';

	export let selectedTag: string = '';

	const getTags = async (): Promise<void> => {
		const res = await client.Post.getAllTags();
		$tags = res.data.tags;
	};

	const selectTag = (tag: string): void => {
		if (selectedTag === tag) {
			selectedTag = 'all';
		} else {
			selectedTag = tag;
		}
	};

	onMount(async () => {
		await getTags();
	});
</script>

<div class="sticky top-0 hidden w-full px-2 py-8 pl-10 md:block">
	<div in:fade class="rounded-2xl bg-white">
		<h2 class="font-rubik text-yellow px-2 text-2xl font-bold">Tags</h2>
		<div class="flex flex-wrap pt-4">
			{#if $tags.length == 0}
				{#each Array(10) as _}
					<div class="m-2 h-4 w-10 animate-pulse bg-gray-300"></div>
				{/each}
			{/if}

			{#each $tags as tag}
				<button
					in:fade
					on:click={() => selectTag(tag)}
					class="items-center rounded-md border-b border-transparent p-2 text-sm transition duration-200 hover:cursor-pointer hover:bg-gray-200
                    {selectedTag == tag ? 'bg-gray-200 font-bold' : ''} "
				>
					<span class="flex items-center gap-1">
						<Svg name={getTagSvgName(tag)} height="16" width="16" />{tag}</span
					>
				</button>
			{/each}
		</div>
	</div>
</div>
