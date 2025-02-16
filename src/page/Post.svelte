<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { loggedUsername, isLoading, error } from '../store';
	import client from '../client';
	import moment from 'moment';

	import Post from '../components/Post.svelte';
	import Footer from '../components/Footer.svelte';

	import Svg from '../components/Svg.svelte';
	import Avatar from '../components/Avatar.svelte';

	export let slug;

	let post;
	let postComment = '';
	let postComments;

	const getPost = async (postId) => {
		const res = await client.Post.getById(postId);
		post = res.data;
		post.commentCount = post.comments.length;
		post.loveCount = post.loves.length;
		post.isLovedByMe = post.loves.some((love) => love.author == $loggedUsername);
		post.comments = post.comments.reverse();

		await addAuthorImageToComments();

		$isLoading = false;
	};

	const addAuthorImageToComments = async () => {
		const usernames = [...new Set(post.comments.map((i) => i.author))];
		usernames.push(post.author); // Add the post author to the list

		const res = await client.User.getUsersMeta(usernames);

		const users = res.data.users.reduce((acc, user) => {
			acc[user.username] = user;
			return acc;
		}, {});

		post.authorName = users[post.author].display_name;
		post.authorImage = users[post.author].image;

		post.comments.forEach((comment) => {
			comment.authorName = users[comment.author].display_name;
			comment.authorImage = users[comment.author].image;
		});

		postComments = [...post.comments]; // Create a new array to trigger reactivity
	};

	const handleKeyup = (e) => {
		if (e.keyCode == 13 && !e.shiftKey) {
			e.preventDefault();
			addComment();
		}
	};

	const addComment = async () => {
		postComment = postComment.trim();
		if (postComment === '') return;

		try {
			const res = await client.Post.createComment(post._id, postComment);
			post.comments = res.data.comments.reverse();
			post.commentCount++;
			postComment = '';
			await addAuthorImageToComments();
		} catch (err) {
			$error = "Couldn't add comment!";
		}
	};

	const deleteComment = async (commentId) => {
		try {
			const res = await client.Post.deleteComment(post._id, commentId);
			post.comments = res.data.post.comments.reverse();
			post.commentCount--;
			await addAuthorImageToComments();
		} catch (err) {
			$error = "Couldn't delete comment!";
		}
	};

	onMount(async () => {
		getPost(slug);
	});
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-10">
		<div in:fade class="mt-16 grid md:mt-6 md:ml-12">
			{#if postComments}
				<Post bind:post />

				<div class="mt-4 max-w-xl p-4 text-sm">
					<div class="mb-4 border-gray-300">
						<textarea
							class="w-full border p-2 outline-none"
							on:keyup={handleKeyup}
							bind:value={postComment}
							rows="3"
							style="resize: none;"
						>
						</textarea>
						<div class="flex justify-end">
							<button
								on:click={addComment}
								class="border border-transparent bg-black px-2 py-1 text-sm text-white transition duration-200 hover:cursor-pointer hover:border-current hover:bg-white hover:text-black focus-visible:ring"
							>
								<span class="text-xs">Comment</span>
							</button>
						</div>
					</div>

					{#each postComments as comment}
						<div in:fade class="py-2">
							<div class="flex w-full gap-2">
								<Avatar src={comment.authorImage} alt={comment.author} />
								<div class="flex w-full flex-col justify-center gap-2">
									<div>
										<div class="inline-flex w-full">
											<a href={`#/profile/${comment.author}`} class="hover:underline">
												<div class="flex text-sm font-semibold text-gray-600">
													{comment.authorName || comment.author}
												</div>
											</a>
											{#if comment.author == $loggedUsername}
												<div class="flex pl-2">
													<button title="delete" on:click={() => deleteComment(comment._id)}>
														<Svg class="hover:cursor-pointer hover:border" name="delete" height="16" width="16" />
													</button>
												</div>
											{/if}
										</div>
										<div class="text-xs text-gray-500">
											{moment(comment.created_at).fromNow()}
										</div>
									</div>
									<div class="text-sm break-all text-gray-600">
										{comment.text}
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="flex h-screen items-center justify-center">Loading...</div>
			{/if}
		</div>
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
