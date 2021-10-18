<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import client from "../client";
  import { page, loggedUsername } from "../store";

  import UserCard from "../components/UserCard.svelte";
  import Footer from "../components/Footer.svelte";

  let users = [];
  let tab = "all";

  const getAllUsers = async () => {
    const res = await client.User.getAllUsers();
    users = res.data.users;
  };

  const getFollowers = async () => {
    const res = await client.User.getFollowers($loggedUsername);
    users = res.data.users;
  };

  const getFollowing = async () => {
    const res = await client.User.getFollowing($loggedUsername);
    users = res.data.users;
  };

  $: if (tab === "all") {
    getAllUsers();
  } else if (tab === "followers") {
    getFollowers();
  } else if (tab === "following") {
    getFollowing();
  }

  onMount(async () => {
    $page = "users";
    getAllUsers();
  });
</script>

<div in:fade class="min-h-screen">
  <div class="sticky top-0 z-10 pt-16 mb-3 bg-white md:pt-7">
    <nav class="flex flex-row justify-center">
      <button
        on:click="{() => (tab = 'all')}"
        class="{tab == 'all'
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
          : 'text-gray-600'} block px-5 py-2 border-blue-500 hover:text-blue-500 focus:outline-none"
      >
        All users
      </button>
      <button
        on:click="{() => (tab = 'followers')}"
        class="{tab == 'followers'
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
          : 'text-gray-600'} block px-5 py-2 text-gray-600 hover:text-blue-500 focus:outline-none"
      >
        Followers
      </button>
      <button
        on:click="{() => (tab = 'following')}"
        class="{tab == 'following'
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium'
          : 'text-gray-600'} block px-5 py-2 text-gray-600 hover:text-blue-500 focus:outline-none"
      >
        Following
      </button>
    </nav>
  </div>
  <div class="grid grid-cols-2 lg:grid-cols-4">
    {#each users as user}
      <UserCard bind:user />
    {/each}
  </div>
</div>

<Footer />
