<script>
  import { fade } from "svelte/transition";
  import client from "../client";
  import moment from "moment";

  export let chatNow;
  let chats = [];
  let innerHeight;

  const getUserChats = () => {
    client.Chat.getChatsByReceiver(chatNow).then(res => {
      chats = res.data.chats;
      // chats = [...chats, ...chats];
      // chats = [...chats, ...chats];
      // chats = [...chats, ...chats];
      // chats = [...chats, ...chats];
    });
  };

  $: if (chatNow) {
    getUserChats();
  }
</script>

<!-- 
<div class="flex flex-col h-screen">
  <div class="">
    <div class="flex items-center pl-3 md:py-3 bg-dark3 md:rounded-t-xl">
      <img
        class="object-cover w-6 h-6 rounded-full md:h-10 md:w-10"
        src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        alt="username"
      />
      <span class="block ml-2 text-base font-bold text-gray-600">{chatNow}</span>
      <span class="ml-2 text-green-500 connected">
        <svg width="6" height="6">
          <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
        </svg>
      </span>
      <button class="flex justify-end w-full p-2 px-6 md:hidden" on:click="{() => (chatNow = null)}"> back </button>
    </div>
  </div>
  <div class="flex items-center justify-center flex-grow bg-green">this content is not centered on screen</div>
</div> -->

<svelte:window bind:innerHeight />

<div class="w-full md:ml-4 bg-dark1 rounded-t-xl " style="height: {innerHeight-90}px;">
  <div class="flex items-center pl-3 md:py-3 bg-dark3 md:rounded-t-xl">
    <img
      class="object-cover w-6 h-6 rounded-full md:h-10 md:w-10"
      src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      alt="username"
    />
    <span class="block ml-2 text-base font-bold text-gray-600">{chatNow}</span>
    <span class="ml-2 text-green-500 connected">
      <svg width="6" height="6">
        <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
      </svg>
    </span>

    
    <button class="flex justify-end w-full p-2 px-6 md:hidden" on:click="{() => (chatNow = null)}"> back </button>
  </div>
  <div id="chat" class="relative w-full p-2 overflow-y-auto md:p-6" ref="toolbarChat" style="height: {innerHeight-156}px;">
    <ul>
      <li class="clearfix2">
        {#each chats as chat}
          <div in:fade class="w-full flex {chat.from == chatNow ? 'justify-start' : 'justify-end'}">
            <div class="relative px-5 py-2 my-2 text-gray-700 bg-light3 rounded-xl" style="max-width: 300px;">
              <span class="block text-sm md:text-base">{chat.text}</span>
              <span class="block text-xs text-right">{moment(chat.date).fromNow()}</span>
            </div>
          </div>
        {/each}
      </li>
    </ul>
  </div>

  <div class="z-10 flex items-center justify-between w-full p-2 bg-dark3 rounded-b-xl">
    <button class="outline-none focus:outline-none">
      <svg
        class="w-6 h-6 text-gray-400"
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
        ></path>
      </svg>
    </button>
    <button class="ml-1 outline-none focus:outline-none">
      <svg
        class="w-6 h-6 text-gray-400"
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
    </button>

    <input
      aria-placeholder="Start a new message"
      placeholder="Start a new message"
      class="block w-full py-2 pl-5 mx-3 text-sm rounded-full outline-none bg-light3 focus:text-gray-700 md:text-base"
      type="text"
      name="message"
      required
    />

    <button class="outline-none focus:outline-none" type="submit">
      <svg
        class="text-gray-400 origin-center transform rotate-90 h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
        ></path>
      </svg>
    </button>
  </div>
</div>
