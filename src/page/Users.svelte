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



<div in:fade class="pt-16 md:pt-7 min-h-screen">
	<div class="grid md:grid-cols-2 lg:grid-cols-4">
		{#each users as user}
			<div class="p-2">
				<div class="bg-white p-4 rounded-2xl border md:shadow-sm text-center h-full">
					<div class="mb-3">
						<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
					</div>
					<h2 class="font-bold text-gray-800 cursor-pointer">{user.username}</h2>
					<span class="text-gray-500 text-sm line-clamp-2 block mb-4">{user.work ? user.work : WORK}</span>
					<a
						href="#/profile/{user.username}"
						class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
						<span>View profile</span>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>

<Footer />
