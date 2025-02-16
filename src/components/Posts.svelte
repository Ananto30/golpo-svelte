<script>
	import client from '../client';
	import Post from './Post.svelte';
	import DeleteConfirmModal, { modal } from '../components/DeleteConfirmModal.svelte';
	import { fade } from 'svelte/transition';

	export let allPosts;
	export let selectedTag;

	let filteredPosts = [];
	let selectedId = null;

	const deletePost = async () => {
		if (selectedId === null) return;

		const id = selectedId;
		const res = await client.Post.deletePost(id);

		allPosts = allPosts.filter((post) => post._id !== id);
		filteredPosts = allPosts;

		selectedId = null;
	};

	const filterByTag = (tag) => {
		if (tag == 'all') {
			filteredPosts = allPosts;
		} else {
			filteredPosts = allPosts.filter((post) => {
				return post.tags.includes(tag);
			});
		}
	};

	const getPostUsersMeta = async () => {
		const usernames = [...new Set(allPosts.map((i) => i.author))];
		const res = await client.User.getUsersMeta(usernames);

		const users = res.data.users.reduce((acc, user) => {
			acc[user.username] = user;
			return acc;
		}, {});

		allPosts.forEach((post) => {
			post.authorName = users[post.author].display_name;
			post.authorImage = users[post.author].image;
		});

		filteredPosts = allPosts;
	};

	$: if (selectedTag) filterByTag(selectedTag);
	$: if (allPosts && allPosts.length > 0) {
		filteredPosts = allPosts;
		getPostUsersMeta();
	}
</script>

<div>
	{#each filteredPosts as post}
		<div in:fade>
			<Post
				{post}
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
