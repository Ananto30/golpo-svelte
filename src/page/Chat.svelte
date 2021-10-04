<script>
	import { fade } from "svelte/transition";

	import UserChat from "../components/UserChat.svelte";

	let chats = [
		{
			name: "Mama",
			lastMessage: "Hi mama! asdfasdg  asdg asdfga sgas dgasd gasdgasge asdg asdgasdg a",
			lastMessageTime: "2 hours ago",
		},
		{
			name: "Chacha",
			lastMessage: "Hi mama!",
			lastMessageTime: "2 hours ago",
		},
		{
			name: "Khala",
			lastMessage: "Hi mama!",
			lastMessageTime: "2 hours ago",
		},
		{
			name: "Khala",
			lastMessage: "Hi mama!",
			lastMessageTime: "2 hours ago",
		},
		{
			name: "Khala",
			lastMessage: "Hi mama!",
			lastMessageTime: "2 hours ago",
		},
	];

	let chatNow = chats[0].name;
</script>

<!-- This is an example component -->
<div in:fade class="h-screen pt-14">
	<div class="grid grid-cols-3 min-w-full rounded">
		<div class="col-span-1 bg-white">
			<div class="my-3 mx-3 ">
				<div class="relative text-gray-600 focus-within:text-gray-400">
					<span class="absolute inset-y-0 left-0 flex items-center pl-2">
						<svg
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
					</span>
					<input
						aria-placeholder="A search that doesn't work"
						placeholder="A search that doesn't work"
						class="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
						type="search"
						name="search"
						required
						autocomplete="search" />
				</div>
			</div>

			<ul class="overflow-auto">
				<h2 class="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
				<li>
					{#each chats as chat}
						<!-- svelte-ignore a11y-missing-attribute -->
						<a
							class="{chatNow == chat.name
								? 'bg-gray-100'
								: 'hover:bg-gray-100'} px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
							<img
								class="h-10 w-10 rounded-full object-cover"
								src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
								alt="username" />
							<div class="w-full pb-2">
								<div class="flex justify-between">
									<span class="block ml-2 font-semibold text-base text-gray-600 ">{chat.name}</span>
									<span class="block ml-2 text-sm text-gray-600">{chat.lastMessageTime}</span>
								</div>
								<span class="block ml-2 text-sm text-gray-600 line-clamp-1">{chat.lastMessage}</span>
							</div>
						</a>
					{/each}
				</li>
			</ul>
		</div>
		<div class="col-span-2 bg-white">
			<UserChat username={chatNow} />
		</div>
	</div>
</div>
