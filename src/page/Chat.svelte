<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page, isLoading } from '../store';
	import client from '../client';

	import UserChat from '../components/UserChat.svelte';
	import ChatUsers from '../components/ChatUsers.svelte';

	let chats = [];
	let chatNow = '';

	let hasChatLoaded = false;

	const getChats = async () => {
		const res = await client.Chat.getChats();
		chats = res.data.chats.reverse();
		if (chats.length > 0) {
			// chatNow = chats[0].participants[1];
		}
		$isLoading = false;
		hasChatLoaded = true;
	};

	onMount(async () => {
		$page = 'chat';
		getChats();
	});
</script>

<div in:fade class="flex w-full pt-8">
	{#if !hasChatLoaded}
		<div class="flex items-center justify-center">
			<p class="text-center text-gray-600">Loading...</p>
		</div>
	{:else if hasChatLoaded && chats.length === 0}
		<div class="flex h-80 w-full items-center justify-center">
			<p class="text-center text-gray-800">
				No chats yet...
				<br />
				To start a conversation go to a user's profile and send them message.
			</p>
		</div>
	{:else}
		<div class="flex w-full gap-4">
			<div class="{chatNow ? 'hidden md:block' : ''} w-full max-w-xs">
				<ChatUsers bind:chats bind:chatNowUsername={chatNow} />
			</div>
			<div class="{chatNow ? '' : 'hidden md:block'} w-full">
				{#if chatNow}
					<UserChat bind:chatNow />
				{/if}
			</div>
		</div>
	{/if}
</div>
