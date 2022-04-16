<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { page } from "../store";
  import client from "../client";

  import UserChat from "../components/UserChat.svelte";
  import ChatUsers from "../components/ChatUsers.svelte";

  let chats = [];
  let chatNow = null;

  const getChats = () => {
    client.Chat.getChats().then(res => {
      chats = res.data.chats.reverse();
      if (chats.length > 0) {
        // chatNow = chats[0].participants[1];
      }
    });
  };

  onMount(async () => {
    $page = "chat";
    getChats();
  });
</script>

<div in:fade class="grid min-w-full grid-cols-12 md:pt-8">
  <div class="{chatNow ? 'hidden md:block' : ''} col-span-12 mt-20 md:col-span-4 md:mt-0">
    <ChatUsers bind:chats bind:chatNow />
  </div>
  <div class="{chatNow ? '' : 'hidden md:block'} col-span-12 md:col-span-8 mt-16 md:mt-0">
    {#if chatNow}
      <UserChat bind:chatNow />
    {/if}
  </div>
</div>
