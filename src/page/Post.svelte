<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Avatar from '../components/Avatar.svelte';
	import Footer from '../components/Footer.svelte';
	import Loading from '../components/Loading.svelte';
	import Post from '../components/Post.svelte';
	import Svg from '../components/Svg.svelte';
	import { error, info, isLoading, loggedUsername } from '../store';
	import type { Comment, PostWithComments, UserMeta } from '../types';

	export let slug: string;

	let post: PostWithComments;
	let postComment: string = '';
	let postComments: Comment[] = [];
	let users: UserMeta[] = [];

	let hasLoaded = false;

	const getPost = async (postId: string): Promise<void> => {
		const res = await client.Post.getById(postId);
		post = res.data;

		post.commentCount = post.comments.length;
		post.loveCount = post.loves.length;
		post.isLovedByMe = post.loves.some((love) => love.author == $loggedUsername);
		post.comments = post.comments.reverse();

		const userRelatedToPost = [post.author, ...post.comments.map((comment) => comment.author)];
		const userRes = await client.User.getUsersMeta(userRelatedToPost);
		users = userRes.data.users;

		postComments = [...post.comments]; // Create a new array to trigger reactivity

		$isLoading = false;
		hasLoaded = true;
	};

	const handleKeyup = (e: KeyboardEvent): void => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			addComment();
		}
	};

	const addComment = async (): Promise<void> => {
		postComment = postComment.trim();
		if (postComment === '') return;

		try {
			const res = await client.Post.createComment(post._id, postComment);
			postComments = res.data.comments.reverse();
			postComment = '';
		} catch (err) {
			$error = "Couldn't add comment!";
		}
	};

	const deleteComment = async (commentId: string): Promise<void> => {
		try {
			const res = await client.Post.deleteComment(post._id, commentId);
			postComments = res.data.comments.reverse();
		} catch (err) {
			$error = "Couldn't delete comment!";
		}
	};

	const getCommentAuthorImage = (author: string): string => {
		const user = users.find((user) => user.username === author);
		return user?.image || '';
	};

	const getCommentAuthorDisplayName = (author: string): string => {
		const user = users.find((user) => user.username === author);
		return user?.display_name || author;
	};

	onMount(async () => {
		getPost(slug);
	});
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-10">
		<div in:fade class="mt-16 grid md:mt-6 md:ml-12">
			{#if post}
				<Post
					{post}
					usersMeta={users}
					onDelete={() => {
						$info = 'Cannot delete post from here!';
					}}
				/>

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
								<Avatar src={getCommentAuthorImage(comment.author)} alt={comment.author} />
								<div class="flex w-full flex-col justify-center gap-2">
									<div>
										<div class="inline-flex w-full">
											<a href={`#/profile/${comment.author}`} class="hover:underline">
												<div class="flex text-sm font-semibold text-gray-600">
													{getCommentAuthorDisplayName(comment.author)}
												</div>
											</a>
											{#if comment.author == $loggedUsername}
												<div class="flex pl-2">
													<button title="delete" on:click={() => deleteComment(comment._id)}>
														<Svg
															class="hover:cursor-pointer hover:border"
															name="delete"
															height="16"
															width="16"
														/>
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
				<Loading />
			{/if}
		</div>
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
