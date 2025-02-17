<script lang="ts">
	import { fade } from 'svelte/transition';
	import client from '../client';
	import DeleteConfirmModal, { modal } from '../components/DeleteConfirmModal.svelte';
	import type { Post as PostType, UserMeta } from '../types';
	import Post from './Post.svelte';

	export let allPosts: PostType[];
	export let selectedTag: string;
	export let usersMeta: UserMeta[];

	let filteredPosts: PostType[] = [];
	let selectedId: string = '';

	const deletePost = async () => {
		if (selectedId === '') return;

		const id = selectedId;
		const res = await client.Post.deletePost(id);

		allPosts = allPosts.filter((post) => post._id !== id);
		filteredPosts = allPosts;

		selectedId = '';
	};

	const filterByTag = (tag: string) => {
		if (tag == 'all') {
			filteredPosts = allPosts;
		} else {
			filteredPosts = allPosts.filter((post) => {
				return post.tags.includes(tag);
			});
		}
	};

	$: if (selectedTag) filterByTag(selectedTag);
	$: if (allPosts && allPosts.length > 0) {
		filteredPosts = allPosts;
	}
</script>

<div>
	{#each filteredPosts as post}
		<div in:fade>
			<Post
				{post}
				{usersMeta}
				onDelete={() => {
					selectedId = post._id;
					modal.open();
				}}
			/>
		</div>
	{/each}

	<DeleteConfirmModal
		onConfirm={deletePost}
		title="Delete Post"
		description="Are you sure you want to delete this post?"
	/>
</div>
