<script>
	import { loggedUsername, jwt } from "../store.js";

	const logout = () => {
		$loggedUsername = "";
		$jwt = null;
	};
</script>

<div class="md:min-h-screen md:flex sticky top-0 w-full md:w-auto">
	<!-- mobile menu bar -->
	<div class="bg-gray-800 text-gray-100 flex justify-between md:hidden">
		<!-- logo -->
		<a href="#" class="block p-4  font-bold">Golpo</a>

		<!-- mobile menu button -->
		<button class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
			<svg
				class="h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
			</svg>
		</button>
	</div>

	<!-- sidebar -->
	<div
		class="sidebar w-full space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out ">
		<!-- logo -->
		<a href="#/home" class=" flex items-center space-x-2 px-4">
			<span class="text-2xl font-extrabold">Golpo</span>
		</a>

		<!-- nav -->
		<nav class="text-xl">
			<a href="#/home" class="block py-5 px-4 rounded transition duration-200 hover:bg-blue-100 "> Home </a>
			<a href="#/chat" class="block py-5 px-4 rounded transition duration-200 hover:bg-blue-100 "> Chat </a>
			<a
				href="#/profile/{$loggedUsername}"
				class="block py-5 px-4 rounded transition duration-200 hover:bg-blue-100 ">
				Profile
			</a>
			<a href="#/users" class="block py-5 px-4 rounded transition duration-200 hover:bg-blue-100 "> Users </a>
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				on:click={logout}
				class="block py-5 px-4 rounded transition duration-200 hover:bg-blue-100 cursor-pointer">
				Logout
			</a>
		</nav>
	</div>
</div>
