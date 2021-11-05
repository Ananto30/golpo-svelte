<script>
  import { loggedUsername, jwt, page } from "../store.js";

  import { fade } from "svelte/transition";

  import Svg from "../components/Svg.svelte";

  let sideBarVisible = true;
  let navItems = [
    {
      name: "Home",
      href: "#/home",
      icon: "home",
    },
    {
      name: "Profile",
      href: "#/profile/" + $loggedUsername,
      icon: "user",
    },
    {
      name: "Notification",
      href: "#/notification",
      icon: "bell",
    },
    {
      name: "Chat",
      href: "#/chat",
      icon: "chat",
    },
    {
      name: "Bookmarks",
      href: "#/bookmarks",
      icon: "bookmark",
    },
    {
      name: "Users",
      href: "#/users",
      icon: "users",
    },
  ];

  const navButtonClass =
    "flex items-center gap-2 py-1 my-3 transition duration-200 cursor-pointer border-b border-transparent hover:border-current font-medium font-montserrat";

  const logout = () => {
    $loggedUsername = "";
    $jwt = null;
  };

  const toggleSideBar = () => {
    sideBarVisible = !sideBarVisible;
  };
</script>

<div in:fade class="sticky top-0 z-20 w-full md:w-auto md:min-h-screen ">
  <!-- mobile menu bar -->
  <div class="fixed z-50 flex justify-between w-full bg-white border-gray-300 md:w-auto md:hidden">
    <!-- logo -->
    <a href="#/home" class="block px-4 py-2 my-auto text-2xl font-bold font-montserrat">Golpo</a>

    <!-- mobile menu button -->
    <button on:click="{toggleSideBar}" class="p-4 focus:outline-none active:bg-gray-100">
      <div class="flex my-auto">
        <span class="relative inline-block ">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <span
            class="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full animate-pulse"
          ></span>
        </span>
      </div>
    </button>
  </div>

  <!-- sidebar -->
  <div
    class="{sideBarVisible
      ? '-translate-x-full'
      : 'shadow-lg'} px-4 z-30 md:shadow-none w-2/4 space-y-6 py-4 md:py-8 inset-y-0 left-0 transform fixed md:relative md:translate-x-0 transition duration-200 ease-in-out bg-white"
  >
    <!-- logo -->
    <a href="#/home" class="flex items-center space-x-2">
      <span class="text-3xl font-extrabold font-montserrat">Golpo</span>
    </a>

    <!-- nav -->
    <nav class="grid gap-2 sm:text-xl md:text-base lg:text-lg">
      {#each navItems as item}
        <div class="flex">
          <a
            on:click="{toggleSideBar}"
            class="{$page == item.name.toLowerCase() ? 'font-bold text-yellow' : ''} {navButtonClass}"
            href="{item.href}"
          >
            <div class="{item.name == 'Notification' ? 'animate-wiggle' : ''}">
              <Svg name="{item.icon}" height="24" width="24" />
            </div>

            {item.name}
            {#if item.name == "Notification"}
              <span class="relative inline-block h-2">
                <span
                  class="absolute top-0 right-0 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                ></span>
              </span>
            {/if}
          </a>
        </div>
      {/each}
      <div class="flex">
        <button on:click="{toggleSideBar}" on:click="{logout}" class="{navButtonClass}">
          <Svg name="logout" height="24" width="24" />
          Logout
        </button>
      </div>
    </nav>

    <div class="text-xs lg:w-40">
      <a class="cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte">GitHub</a>
      •
      <a class="cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte/labels/bug">Report Bug</a
      >
      •
      <a
        class="cursor-pointer hover:underline"
        href="https://github.com/Ananto30/golpo-express/discussions/categories/request-feature">Request Feature</a
      >
      •
      <a class="cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte">Policy</a>
    </div>
  </div>
</div>

<style>
  .navshadow {
    box-shadow: 0 4px 3px -3px rgba(184, 184, 184, 0.644);
  }
</style>