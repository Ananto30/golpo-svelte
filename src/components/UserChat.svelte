<script>
	export let username;
	let me = "ananto";

	let chats = [
		{
			id: 1,
			time: "2 mins ago",
			from: "ananto",
			seen: false,
			text: "How are you? 😃",
		},
		{
			id: 2,
			time: "1 mins ago",
			from: "Mama",
			seen: false,
			text: "Fine what about you?",
		},
		{
			id: 3,
			time: "1 mins ago",
			from: "ananto",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
		{
			id: 4,
			time: "1 mins ago",
			from: "Mama",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
		{
			id: 5,
			time: "1 mins ago",
			from: "ananto",
			seen: true,
			text: "I'm fine, thank you. How are you? asdfas asdg asdfasdg aseg asdfasdga seg asdgasdfasega sd",
		},
		{
			id: 6,
			time: "1 mins ago",
			from: "Mama",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
		{
			id: 7,
			time: "1 mins ago",
			from: "ananto",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
		{
			id: 8,
			time: "1 mins ago",
			from: "Mama",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
		{
			id: 9,
			time: "1 mins ago",
			from: "ananto",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
		{
			id: 10,
			time: "1 mins ago",
			from: "Mama",
			seen: true,
			text: "I'm fine, thank you. How are you?",
		},
	];
</script>

<div class="md: border-l-2 w-full">
	<div class="flex items-center border-b pl-3 py-3">
		<img
			class="h-6 w-6 md:h-10 md:w-10 rounded-full object-cover"
			src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
			alt="username" />
		<span class="block ml-2 font-bold text-base text-gray-600">{username}</span>
		<span class="connected text-green-500 ml-2">
			<svg width="6" height="6">
				<circle cx="3" cy="3" r="3" fill="currentColor" />
			</svg>
		</span>
	</div>
	<div id="chat" class="w-full overflow-y-auto p-2 md:p-10 relative pb-10" style="height: 80vh;" ref="toolbarChat">
		<ul>
			<li class="clearfix2">
				{#each chats as chat}
					<div class="w-full flex {chat.from == username ? 'justify-start' : 'justify-end'}">
						<div
							class="bg-gray-100 rounded-xl px-5 py-2 my-2 text-gray-700 relative"
							style="max-width: 300px;">
							<span class="block text-sm md:text-base">{chat.text}</span>
							<span class="block text-xs text-right">{chat.time}</span>
						</div>
					</div>
				{/each}
			</li>
		</ul>
	</div>

	<div class="w-full md:max-w-2xl xl:max-w-3xl p-2 md:p-3 flex items-center justify-between border-t fixed bottom-0 z-10 bg-white">
		<button class="outline-none focus:outline-none">
			<svg
				class="text-gray-400 h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
		</button>
		<button class="outline-none focus:outline-none ml-1">
			<svg
				class="text-gray-400 h-6 w-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
			</svg>
		</button>

		<input
			aria-placeholder="Start a new message"
			placeholder="Start a new message"
			class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700 text-sm md:text-base"
			type="text"
			name="message"
			required />

		<button class="outline-none focus:outline-none" type="submit">
			<svg
				class="text-gray-400 h-7 w-7 origin-center transform rotate-90"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor">
				<path
					d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
			</svg>
		</button>
	</div>
</div>
