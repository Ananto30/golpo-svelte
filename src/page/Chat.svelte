<script>
	import { fade, fly } from "svelte/transition";

	let vegetables = [
		{
			id: "carrot1",
			name: "Carrot",
			type: "vegetable",
			price: 20,
			unit: "kg",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaU1uIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--20f4a81c732575b1f8c9d008c5a1950969375e56/111-1115732_carrots-png-image-transparent-carrots-png-png-download.png",
		},
		{
			id: "tomato1",
			name: "Tomato",
			type: "vegetable",
			price: 25,
			unit: "kg",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUVuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d37d4a94951d30cfa604b85536f7be499df8b244/Tomatoes.jpg",
		},
		{
			id: "potato1",
			name: "Potato",
			type: "vegetable",
			price: 18,
			unit: "gram",
			amount: 700,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDhuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d689a6524875ed852e338723c79884b7f226a3e7/Potato_potato.jpg",
		},
		{
			id: "seem1",
			name: "Seem",
			type: "vegetable",
			price: 18,
			unit: "gram",
			amount: 500,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVluIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--af89ebe642514d6d2b9c93b060f78c54441103de/seam.jpg",
		},
		{
			id: "tomato2",
			name: "Green Tomato",
			type: "vegetable",
			price: 18,
			unit: "gram",
			amount: 500,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVVuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--526ab354dec5efe47bc84d8575393b4a2c2effb6/green%20tomato.jpg",
		},

		{
			id: "pumpkin1",
			name: "Pumpkin",
			type: "vegetable",
			price: 30,
			unit: "pc",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVFuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--36e860d1dc2c5f97bdaffc4eb16915c9bd648cd5/pumpkin.jpg",
		},
		{
			id: "pea1",
			name: "Green Peas",
			type: "vegetable",
			price: 30,
			unit: "gram",
			amount: 500,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUFuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--af0438a550c2c326284a8bdcdda70efe80981ddb/Green-peas.jpg",
		},
		{
			id: "cauliflower1",
			name: "Cauliflower",
			type: "vegetable",
			price: 40,
			unit: "pc",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDRuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--db6e95cc6ffe7213ad6a04f84e7f969d047b0378/cauliflower-1agz939.jpg",
		},
		{
			id: "cabbage1",
			name: "Cabbage",
			type: "vegetable",
			price: 30,
			unit: "pc",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e363a24293005e4f2579cd986cda58750d5679e4/500_500_productGfx_e5df68652cd293bec313bfc66dedde81.jpg",
		},
	];
</script>

<!-- This is an example component -->
<div in:fade class="h-screen pt-14">
	<div class="grid grid-cols-3 min-w-full rounded" style="min-height: 80vh;">
		<div class="col-span-1 bg-white border-r-2 border-gray-300">
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
						aria-placeholder="Busca tus amigos o contacta nuevos"
						placeholder="Busca tus amigos"
						class="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
						type="search"
						name="search"
						required
						autocomplete="search" />
				</div>
			</div>

			<ul class="overflow-auto" style="height: 500px;">
				<h2 class="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
				<li>
					<a
						class="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
						<img
							class="h-10 w-10 rounded-full object-cover"
							src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
							alt="username" />
						<div class="w-full pb-2">
							<div class="flex justify-between">
								<span class="block ml-2 font-semibold text-base text-gray-600 ">Jhon C</span>
								<span class="block ml-2 text-sm text-gray-600">5 minutes</span>
							</div>
							<span class="block ml-2 text-sm text-gray-600">Hello world!!</span>
						</div>
					</a>
					<a
						class="bg-gray-100  px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
						<img
							class="h-10 w-10 rounded-full object-cover"
							src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
							alt="username" />
						<div class="w-full pb-2">
							<div class="flex justify-between">
								<span class="block ml-2 font-semibold text-base text-gray-600 ">Eduard</span>
								<span class="block ml-2 text-sm text-gray-600">15 minutes</span>
							</div>
							<span class="block ml-2 text-sm text-gray-600">I am fine</span>
						</div>
					</a>
					<a
						class="hover:bg-gray-100 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
						<img
							class="h-10 w-10 rounded-full object-cover"
							src="https://images.pexels.com/photos/6238133/pexels-photo-6238133.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
							alt="username" />
						<div class="w-full pb-2">
							<div class="flex justify-between">
								<span class="block ml-2 font-semibold text-base text-gray-600 ">Celia</span>
								<span class="block ml-2 text-sm text-gray-600">1 hour</span>
							</div>
							<span class="block ml-2 text-sm text-gray-600">Last message</span>
						</div>
					</a>
				</li>
			</ul>
		</div>
		<div class="col-span-2 bg-white">
			<div class="w-full">
				<div class="flex items-center border-b border-gray-300 pl-3 py-3">
					<img
						class="h-10 w-10 rounded-full object-cover"
						src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
						alt="username" />
					<span class="block ml-2 font-bold text-base text-gray-600">Eduard</span>
					<span class="connected text-green-500 ml-2">
						<svg width="6" height="6">
							<circle cx="3" cy="3" r="3" fill="currentColor" />
						</svg>
					</span>
				</div>
				<div id="chat" class="w-full overflow-y-auto p-10 relative" style="height: 700px;" ref="toolbarChat">
					<ul>
						<li class="clearfix2">
							<div class="w-full flex justify-start">
								<div
									class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
									style="max-width: 300px;">
									<span class="block">Hello bro</span>
									<span class="block text-xs text-right">10:30pm</span>
								</div>
							</div>
							<div class="w-full flex justify-end">
								<div
									class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
									style="max-width: 300px;">
									<span class="block">Hello</span>
									<span class="block text-xs text-left">10:32pm</span>
								</div>
							</div>
							<div class="w-full flex justify-end">
								<div
									class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
									style="max-width: 300px;">
									<span class="block">how are you?</span>
									<span class="block text-xs text-left">10:32pm</span>
								</div>
							</div>
							<div class="w-full flex justify-start">
								<div
									class="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
									style="max-width: 300px;">
									<span class="block">I am fine</span>
									<span class="block text-xs text-right">10:42pm</span>
								</div>
							</div>
						</li>
					</ul>
				</div>

				<div class="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
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
						aria-placeholder="Escribe un mensaje aquí"
						placeholder="Escribe un mensaje aquí"
						class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
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
		</div>
	</div>
</div>
