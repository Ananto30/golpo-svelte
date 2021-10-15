<script>
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import Footer from "../components/Footer.svelte";
	import client from "../client";
	import { IMAGE_LARGE, TAGLINE, WORK } from "../defaults";

	let users = [];
	onMount(async () => {
		const res = await client.User.getAllUsers();
		users = res.data.users;
	});
</script>

<div in:fade class="min-h-screen pt-16 md:pt-7">
  <div class="grid grid-cols-2 lg:grid-cols-4">
    {#each users as user}
      <a href="#/profile/{user.username}">
        <div class="p-2">
          <div class="h-full p-4 text-center transition duration-200 transform bg-white border rounded-xl md:shadow-sm hover:shadow-lg">
            <div class="mb-3">
              <img class="w-auto mx-auto border-2 border-indigo-400 rounded-full h-28" src="{user.image}" alt="" />
            </div>
            <h2 class="font-bold text-indigo-500 cursor-pointer">{user.username}</h2>
            <span class="block mb-2 text-sm text-gray-500 line-clamp-2">{user.work ? user.work : WORK}</span>
            <span class="block mb-4 text-sm text-gray-500 line-clamp-2">{user.tagline ? user.tagline : TAGLINE}</span>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>

<Footer />
