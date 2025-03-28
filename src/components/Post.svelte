<script lang="ts">
	import moment from 'moment';
	import client from '../client';
	import Svg from '../components/Svg.svelte';
	import { info, loggedUsername, myBookmarkIds } from '../store';
	import type { Post, UserMeta } from '../types';
	import Avatar from './Avatar.svelte';

	export let post: Post;
	export let usersMeta: UserMeta[];
	export let onDelete: () => void;

	const mediaButtonClass =
		'flex items-center gap-1 p-2 text-sm transition duration-200 ease-in-out md:px-3 border border-transparent rounded-full hover:bg-gray-200 focus-visible:ring active:border-current cursor-pointer';

	const lovePost = async (postId: string) => {
		if (!post.isLovedByMe) {
			await client.Post.reactLove(postId);
			post.isLovedByMe = true;
			post.loveCount++;
		} else {
			$info = 'You cannot un-love a post!';
		}
	};

	const bookmarkPost = async (postId: string) => {
		await client.Post.bookmarkPost(postId);
		$myBookmarkIds = [...$myBookmarkIds, postId];
		$info = 'Post bookmarked!';
	};

	const unbokmarkPost = async (postId: string) => {
		await client.Post.unbookmarkPost(postId);
		$myBookmarkIds = $myBookmarkIds.filter((id) => id !== postId);
		$info = 'Post unbookmarked!';
	};

	const isBookmarked = (post: Post) => {
		return $myBookmarkIds.includes(post._id);
	};

	const getAuthorImage = (author: string) => {
		const user = usersMeta?.find((user) => user.username == author);
		return user?.image;
	};

	const getAuthorDisplayName = (author: string) => {
		const user = usersMeta?.find((user) => user.username == author);
		return user?.display_name;
	};
</script>

<div class="">
	<div class="flex max-w-xl overflow-hidden border-b border-gray-300 py-6">
		<div class="flex w-full items-center">
			<div class="w-full">
				<!-- user -->
				<div class="flex w-full flex-row items-center gap-2 px-4 pb-4">
					<a href="#/profile/{post.author}">
						<Avatar src={getAuthorImage(post.author)} alt={post.author} size="m" />
					</a>
					<div class="flex flex-col gap-1 break-all">
						<a href="#/profile/{post.author}" class="hover:underline">
							<div class="text-sm font-semibold text-gray-800 capitalize">
								{getAuthorDisplayName(post.author) || post.author}
							</div>
						</a>
						<div class="flex w-full flex-wrap">
							<div class="cursor-pointer text-xs font-medium text-gray-600">
								{post.tags.join(', ')}
								•&nbsp;
							</div>
							<div class="text-xs text-gray-500">
								{moment(post.created_at).fromNow()}
							</div>
						</div>
					</div>
				</div>

				<!-- post -->
				<a title={post.title} href={post.url} target="_blank" class="hover:underline">
					<div class="font-rubik mb-2 line-clamp-2 px-4 text-lg leading-6 font-bold text-gray-800">
						{post.title}
					</div>
					<div class="mb-2 line-clamp-5 px-4 text-sm break-all text-gray-700">
						{post.description || ''}
					</div>
					<div class="my-4 px-4 text-sm font-medium text-gray-400">
						<img class="" alt={post.title} src={post.image} />
					</div>
				</a>

				<!-- actions -->
				<div class="mt-4 flex justify-start">
					<div class="flex gap-4 px-2">
						<!-- love -->
						<button
							title="loves"
							on:click={() => lovePost(post._id)}
							class="{mediaButtonClass} hover:bg-red-200"
						>
							{#if post.isLovedByMe}
								<Svg name="red-love" height="18" width="18" />
							{:else}
								<Svg name="love" height="18" width="18" />
							{/if}
							<span>{post.loveCount}</span>
						</button>

						<!-- comment -->
						<a
							href="#/post/{post._id}"
							title="comments"
							class="{mediaButtonClass} hover:bg-blue-200"
						>
							<Svg name="comment" height="18" width="18" />
							<span>{post.commentCount}</span>
						</a>

						<!-- bookmark -->
						{#if isBookmarked(post)}
							<button
								title="unbookmark"
								on:click={() => unbokmarkPost(post._id)}
								class="{mediaButtonClass} "
							>
								<Svg name="bookmarked" height="18" width="18" />
							</button>
						{:else}
							<button
								title="bookmark"
								on:click={() => bookmarkPost(post._id)}
								class={mediaButtonClass}
							>
								<Svg name="bookmark" height="18" width="18" />
							</button>
						{/if}

						<!-- delete -->
						{#if post.author == $loggedUsername}
							<button title="delete" on:click={onDelete} class={mediaButtonClass}>
								<Svg name="delete" height="18" width="18" />
							</button>
						{/if}

						<!-- open -->
						<!-- <a title="visit link" href="{post.url}" target="_blank" class="{mediaButtonClass}">
                            <Svg name="external" height="16" width="16" />
                        </a> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
