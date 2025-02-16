<script>
	import { info, loggedUsername, myBookmarkIds } from '../store';
	import moment from 'moment';
	import client from '../client';

	import Svg from '../components/Svg.svelte';
	import Avatar from './Avatar.svelte';

	export let post;
	export let onDelete;

	const mediaButtonClass =
		'flex items-center gap-1 px-2 py-1 text-sm transition duration-200 ease-in-out md:px-3 border border-transparent hover:border-gray-400 focus-visible:ring active:border-current hover:cursor-pointer';

	const lovePost = async (postId) => {
		if (!post.isLovedByMe) {
			await client.Post.reactLove(postId);
			post.isLovedByMe = true;
			post.loveCount++;
		} else {
			$info = 'You cannot un-love a post!';
		}
	};

	const bookmarkPost = async (postId) => {
		await client.Post.bookmarkPost(postId);
		$myBookmarkIds = [...$myBookmarkIds, postId];
		$info = 'Post bookmarked!';
	};

	const unbokmarkPost = async (postId) => {
		await client.Post.unbookmarkPost(postId);
		$myBookmarkIds = $myBookmarkIds.filter((id) => id !== postId);
		$info = 'Post unbookmarked!';
	};

	const isBookmarked = (post) => {
		return $myBookmarkIds.includes(post._id);
	};
</script>

<div class="">
	<div class="flex max-w-xl overflow-hidden border-b border-gray-300 py-6">
		<div class="flex w-full items-center">
			<div class="w-full">
				<!-- user -->
				<div class="flex w-full flex-row items-center gap-2 px-4 pb-4">
					<a href="#/profile/{post.author}">
						<Avatar src={post.authorImage} alt={post.author} size="m" />
					</a>
					<div class="flex flex-col gap-1 break-all">
						<a href="#/profile/{post.author}" class="hover:underline">
							<div class="text-sm font-semibold text-gray-800">
								{post.authorName || post.author}
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
						<button title="loves" on:click={() => lovePost(post._id)} class={mediaButtonClass}>
							{#if post.isLovedByMe}
								<Svg name="red-love" height="16" width="16" />
							{:else}
								<Svg name="love" height="16" width="16" />
							{/if}
							<span>{post.loveCount}</span>
						</button>

						<!-- comment -->
						<a href="#/post/{post._id}" title="comments" class={mediaButtonClass}>
							<Svg name="comment" height="16" width="16" />
							<span>{post.commentCount}</span>
						</a>

						<!-- bookmark -->
						{#if isBookmarked(post)}
							<button
								title="unbookmark"
								on:click={() => unbokmarkPost(post._id)}
								class={mediaButtonClass}
							>
								<Svg name="bookmarked" height="16" width="16" />
							</button>
						{:else}
							<button
								title="bookmark"
								on:click={() => bookmarkPost(post._id)}
								class={mediaButtonClass}
							>
								<Svg name="bookmark" height="16" width="16" />
							</button>
						{/if}

						<!-- delete -->
						{#if post.author == $loggedUsername}
							<button title="delete" on:click={onDelete} class={mediaButtonClass}>
								<Svg name="delete" height="16" width="16" />
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
