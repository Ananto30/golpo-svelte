<script>
	import { loggedIn } from "../store.js";
</script>

<div
	class="max-w-6xl h-12 md:h-14 px-6 fixed w-full antialiased border-b-2
  bg-white flex text-sm md:text-base z-10">
	<div class="flex-1 my-auto ">
		<a href="#/home" class="text-md font-bold focus:outline-none">Golpo</a>
	</div>
	<div class="my-auto flex gap-6">
		<a
			href="#/home"
			class="hidden md:block hover:underline cursor-pointer focus:outline-none
      focus:underline">
			Home
		</a>
		<a
			href="#/chat"
			class="transition duration-300 ease-in-out md:hover:underline
      focus:outline-none focus:underline">
			Chat
		</a>
		<a href="#/users" class="hidden md:block hover:underline focus:outline-none focus:underline"> Users </a>
		<a href="#/profile" class="hover:underline focus:outline-none focus:underline"> Profile </a>
		<a href="#/logout" class="hover:underline focus:outline-none focus:underline"> Logout </a>
	</div>
</div>
