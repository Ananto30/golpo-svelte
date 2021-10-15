<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { page } from "../store";
  import client from "../client";
  import moment from "moment";

  import UserChat from "../components/UserChat.svelte";

  let chats = [];
  let chatNow = null;

  const getChats = () => {
    client.Chat.getChats().then(res => {
      chats = res.data.chats.reverse();
      if (chats.length > 0) {
        chatNow = chats[0].participants[1];
      }
    });
  };

  onMount(async () => {
    $page = "chat";
    getChats();
  });
</script>

<div in:fade class="grid min-w-full grid-cols-12 md:pt-7">
  <div class="col-span-4">
    <div class="mx-3 my-3 ">
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
    </div>

    <ul class="overflow-auto" style="height: 80vh;">
      <h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
      <li>
        {#each chats as chat}
          <!-- svelte-ignore a11y-missing-attribute -->
          <a
            on:click="{() => (chatNow = chat.participants[1])}"
            class="{chatNow == chat.participants[1]
              ? 'bg-blue-100'
              : 'hover:bg-blue-100'} rounded px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-blue-300 transition duration-200 ease-in-out"
          >
            <img
              class="object-cover w-10 h-10 rounded-full"
              src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="username"
            />
            <div class="w-full pb-2">
              <div class="flex justify-between">
                <span class="block ml-2 text-base font-semibold text-gray-600 ">{chat.participants[1]}</span>
                <span class="block ml-2 text-sm text-gray-600">{moment(chat.chats[0].date).fromNow()}</span>
              </div>
              <span class="block ml-2 text-sm text-gray-600 line-clamp-1">{chat.chats[0].text}</span>
            </div>
          </a>
        {/each}
      </li>
    </ul>
  </div>
  <div class="col-span-8">
    {#if chatNow}
      <UserChat bind:chatNow />
    {/if}
  </div>
</div>
