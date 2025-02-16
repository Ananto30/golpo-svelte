<script lang="ts">
	import moment from 'moment';
	import { loggedUsername } from '../store';
	import type { ChatGroup } from '../types';
	import Avatar from './Avatar.svelte';

	export let chats: ChatGroup[] = [];
	export let activeChatUsername: string = '';

	const getChatUsername = (chat: ChatGroup) => {
		if (chat.participants[0] == $loggedUsername) {
			return chat.participants[1];
		} else {
			return chat.participants[0];
		}
	};
</script>

<div class="p-2 pt-8 md:pt-2">
	<!-- <div class="mx-3 my-3 ">
      <div class="relative text-gray-600 focus-within:text-gray-400">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg
          >
        </span>
        <input
          aria-placeholder="A search that doesn't work"
          placeholder="A search that doesn't work"
          class="block w-full py-2 pl-10 bg-gray-100 rounded outline-none focus:text-gray-700"
          type="search"
          name="search"
          required
          autocomplete="search"
        />
      </div>
    </div> -->

	<ul class="overflow-auto">
		<h2 class="font-rubik mb-4 text-lg font-semibold">Chats</h2>
		<li class="flex flex-col gap-2">
			{#each chats as chat}
				{#if chat.chats.length > 0}
					<button
						on:click={() => (activeChatUsername = getChatUsername(chat))}
						on:keydown={(e) => e.key === 'Enter' && (activeChatUsername = getChatUsername(chat))}
						tabindex="0"
						class="w-full cursor-pointer rounded-md bg-gray-100 px-3 py-2 text-sm transition ease-in-out hover:bg-gray-200 focus:outline-none focus-visible:ring
					{activeChatUsername == getChatUsername(chat) ? 'bg-dark1' : 'hover:bg-dark1'}"
						aria-label="chat"
					>
						<div class="flex w-full items-start justify-between">
							<div class="flex justify-center gap-4 text-left">
								<Avatar src={undefined} alt={getChatUsername(chat)} />
								<div>
									<p class="font-semibold text-gray-800">{getChatUsername(chat)}</p>
									<p class="line-clamp-1 text-gray-600">
										{chat.chats[0].from}: {chat.chats[0].text}
									</p>
								</div>
							</div>
							<p class="text-xs text-gray-600">
								{moment(chat.chats[0].date).fromNow()}
							</p>
						</div>
					</button>
				{/if}
			{/each}
		</li>
	</ul>
</div>
