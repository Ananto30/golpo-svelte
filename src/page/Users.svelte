<script>
	import { fade, fly } from "svelte/transition";
	import Footer from "../components/Footer.svelte";

	let users = [
		{
			name: "Ananto",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.ajsodihasodghasldh ioashdg oiashgoi ahsdiogh",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the backend.",
		},
		{
			name: "Rizki",
			bio: "I am a software developer with 3+ years of experience on the	backend.",
		},
	];
</script>

<div in:fade class="pt-16 min-h-screen">
	<div class="grid md:grid-cols-2 lg:grid-cols-4">
		<!-- Card 1 -->
		{#each users as user}
			<div class="p-2">
				<div class="bg-white p-4 rounded-2xl border-2 text-center h-full">
					<div class="mb-3">
						<img class="w-auto mx-auto rounded-full" src="https://i.pravatar.cc/150?img=66" alt="" />
					</div>
					<h2 class="font-bold text-gray-800 cursor-pointer">{user.name}</h2>
					<span class="text-gray-500 text-sm line-clamp-2 block mb-4">{user.bio}</span>
					<button
						class="text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
						<span>Read more</span>
					</button>
				</div>
			</div>
		{/each}

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

<Footer />
