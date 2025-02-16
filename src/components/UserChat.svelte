<script lang="ts">
	import moment from 'moment';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import { loggedUsername } from '../store';
	import type { Chat } from '../types';
	import Avatar from './Avatar.svelte';

	export let activeChatUsername: string;

	let chats: Chat[] = [];
	let innerHeight: number;

	let message: string = '';

	const getUserChats = async (): Promise<void> => {
		const res = await client.Chat.getChatsByReceiver(activeChatUsername);
		console.log(res);
		chats = res.data.chats;
	};

	$: if (activeChatUsername) {
		getUserChats();
	}

	const randomId = (): string => {
		return Math.random().toString(36).substr(2, 9);
	};

	const sendChat = async (e: Event): Promise<void> => {
		e.preventDefault();
		if (message.trim() === '') return;

		const res = await client.Chat.sendChat(activeChatUsername, message);
		chats = [
			...chats,
			{
				from: $loggedUsername,
				text: message,
				date: new Date(),
				seen: false,
				_id: randomId()
			}
		];
		message = '';
	};

	const handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key === 'Enter') {
			sendChat(e);
		}
	};
</script>

<svelte:window bind:innerHeight />

<div class="w-full rounded-t-lg pt-8 md:pt-0" style="height: {innerHeight - 128}px;">
	<div class="rounded-lg md:border md:border-gray-300">
		<div class="flex items-center bg-gray-100 md:rounded-t-lg">
			<div class="flex w-full items-center p-4 md:rounded-t-lg">
				<Avatar alt={activeChatUsername} src={undefined} />
				<span class="ml-2 block text-base font-bold text-gray-600">{activeChatUsername}</span>
				<span class="connected ml-2 text-green-500">
					<svg width="6" height="6">
						<circle cx="3" cy="3" r="3" fill="currentColor"></circle>
					</svg>
				</span>
			</div>

			<button
				class="m-2 flex justify-end border bg-white px-2 text-sm md:hidden"
				on:click={() => (activeChatUsername = '')}
			>
				back
			</button>
		</div>
		<div
			id="chat"
			class="relative w-full overflow-y-auto p-2 pb-0 md:p-6"
			style="height: {innerHeight - 200}px;"
		>
			<ul>
				<li class="clearfix2">
					{#each chats as chat}
						<div
							in:fade
							class="flex w-full {chat.from == activeChatUsername
								? 'justify-start'
								: 'justify-end'}"
						>
							<div
								class="relative my-1 max-w-[300px] rounded-md border border-gray-200 p-2 text-gray-700"
							>
								<span class="block text-sm md:text-base">{chat.text}</span>
								<span class="block text-right text-[10px] text-gray-500"
									>{moment(chat.date).fromNow()}</span
								>
							</div>
						</div>
					{/each}
				</li>
			</ul>
		</div>

		<div class="z-10 flex w-full items-center justify-between rounded-b-lg bg-gray-100 p-2">
			<!-- <button class="outline-none focus:outline-none" aria-label="emoji">
				<svg
					class="h-6 w-6 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					>
					</path>
				</svg>
			</button>
			<button class="ml-1 outline-none focus:outline-none" aria-label="attachment">
				<svg
					class="h-6 w-6 text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
					></path>
				</svg>
			</button> -->

			<input
				aria-placeholder="Type a message"
				placeholder="Type a message"
				class="bg-light3 mx-3 block w-full rounded-full py-2 pl-5 text-sm outline-none focus:text-gray-700 md:text-base"
				type="text"
				name="message"
				required
				autocomplete="off"
				on:keydown={handleKeyDown}
				bind:value={message}
			/>

			<button
				class="outline-none focus:outline-none"
				type="submit"
				aria-label="send"
				on:click={sendChat}
			>
				<svg
					class="h-7 w-7 origin-center rotate-90 transform text-gray-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
					>
					</path>
				</svg>
			</button>
		</div>
	</div>
</div>
