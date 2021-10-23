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
      name: "Chat",
      href: "#/chat",
      icon: "chat",
    },
    {
      name: "Profile",
      href: "#/profile/" + $loggedUsername,
      icon: "homer",
    },
    {
      name: "Bookmarks",
      href: "#/bookmarks",
      icon: "bookmark",
    },
    {
      name: "Users",
      href: "#/users",
      icon: "user",
    },
  ];

  const navButtonClass =
    "flex items-center gap-2 py-4 transition duration-200 rounded-xl md:hover:text-yellow cursor-pointer";

  const logout = () => {
    $loggedUsername = "";
    $jwt = null;
  };

  const toggleSideBar = () => {
    sideBarVisible = !sideBarVisible;
  };
</script>

<div in:fade class="sticky top-0 z-20 w-full md:min-h-screen ">
  <!-- mobile menu bar -->
  <div class="fixed z-50 flex justify-between w-full text-gray-100 bg-dark3 md:hidden">
    <!-- logo -->
    <a href="#/home" class="block px-4 py-4 text-2xl font-bold">Golpo</a>

    <!-- mobile menu button -->
    <button on:click="{toggleSideBar}" class="p-4 focus:outline-none active:bg-dark2">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>

  <!-- sidebar -->
  <div
    class="{sideBarVisible
      ? '-translate-x-full'
      : 'shadow-lg'} z-30 md:shadow-none w-2/4 space-y-6 py-4 md:py-8 px-2 inset-y-0 left-0 transform fixed md:relative md:translate-x-0 transition duration-200 ease-in-out bg-dark2"
  >
    <!-- logo -->
    <a href="#/home" class="flex items-center space-x-2">
      <span class="text-4xl font-extrabold text-yellow">Golpo</span>
    </a>

    <!-- nav -->
    <nav class="grid gap-2 sm:text-xl md:text-base lg:text-xl">
      {#each navItems as item}
        <a
          on:click="{toggleSideBar}"
          class="{$page == item.name.toLowerCase() ? 'font-bold text-yellow' : ''} {navButtonClass}"
          href="{item.href}"
        >
          <Svg name="{item.icon}" height="32" width="32" />
          {item.name}
        </a>
      {/each}

      <button on:click="{toggleSideBar}" on:click="{logout}" class="{navButtonClass}">
        <Svg name="logout" height="32" width="32" />
        Logout
      </button>
    </nav>

    <div class="text-sm lg:w-40">
      <hr />
      <br />
      <a class="text-indigo-500 cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte"
        >GitHub</a
      >
      •
      <a
        class="text-indigo-500 cursor-pointer hover:underline"
        href="https://github.com/Ananto30/golpo-svelte/labels/bug">Report Bug</a
      >
      •
      <a
        class="text-indigo-500 cursor-pointer hover:underline"
        href="https://github.com/Ananto30/golpo-express/discussions/categories/request-feature">Request Feature</a
      >
      •
      <a class="text-indigo-500 cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte"
        >Policy</a
      >
    </div>
  </div>
</div>
