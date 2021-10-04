<script>
	import { loggedIn } from "../store.js";
</script>

<div
	class="max-w-6xl h-12 md:h-14 px-6 fixed w-full antialiased border-b-2
  bg-white flex text-sm md:text-base z-10">
	<div class="flex-1 my-auto ">
		<a href="#/home" class="text-md font-bold focus:outline-none">Golpo</a>
	</div>
	<div class="my-auto flex gap-1">
		<a
			href="#/home"
			class="hidden md:block transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-xl
			focus:border">
			Home
		</a>
		<a
			href="#/chat"
			class="transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-xl
			focus:border">
			Chat
		</a>
		<a
			href="#/users"
			class="hidden md:block transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-xl
		focus:border">
			Users
		</a>
		<a
			href="#/profile"
			class="transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-xl
		focus:border">
			Profile
		</a>
		<a
			href="#/logout"
			class="transition duration-200 ease-in-out hover:bg-gray-100 cursor-pointer px-2 py-1 rounded-xl
		focus:border">
			Logout
		</a>
	</div>
</div>
