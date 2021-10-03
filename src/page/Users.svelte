<script>
	import { fade, fly } from "svelte/transition";
	let meats = [
		{
			id: "goat1",
			name: "Goat",
			type: "meat",
			price: 900,
			unit: "kg",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaklKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--210cd87a72aae28f88d73cd0a4a952ac39699221/frozen-goat-meat-1510206203-3440949.jpeg",
		},
		{
			id: "chicken1",
			name: "Sonali chicken",
			type: "meat",
			price: 350,
			unit: "pc",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2d59d3db62caa926e4df64696bd07b6aac974e2d/raw-chicken-meat-white-background_58830-687.jpg",
		},
		{
			id: "beef1",
			name: "Beef",
			type: "meat",
			price: 600,
			unit: "kg",
			amount: 1,
			img: "https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaU1KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--11cadbf4ae3e3456dcb1718059d60a37d91ee611/greggr151100379.jpg",
		},
	];
</script>

<div in:fade class="pt-16 h-screen">
	<div class="grid grid-cols-4">
		<!-- Card 1 -->
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
		<div class="p-2">
			<div class="bg-white p-4 rounded-2xl border-2 text-center">
				<div class="mb-3">
					<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
				</div>
				<h2 class="font-bold text-gray-800 cursor-pointer">Pande Muliada</h2>
				<span class="text-gray-500 text-sm line-clamp-3 block mb-4">Front End Developer</span>
				<button
					class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>Read more</span>
				</button>
			</div>
		</div>
	</div>
</div>
