<style>
  .navshadow {
    box-shadow: 0 4px 3px -3px rgba(184, 184, 184, 0.644);
  }
</style>

<script>
  import { loggedUsername, jwt, page } from "../store.js";
  import client from "../client";
  import { onMount } from "svelte";

  import { fade } from "svelte/transition";

  import Svg from "../components/Svg.svelte";

  let sideBarVisible = true;
  let hasNotification = false;
  let shouldBorder = false;
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

  const hasNotificationCall = async () => {
    const res = await client.Notification.hasUnclickedNotification();
    if (res.data.hasUnclickedNotification) return true;
    return false;
  };

  const navBorderTracker = () => {
    const top = document.documentElement.scrollTop || document.body.scrollTop;
    if (top != 0) {
      shouldBorder = true;
    } else {
      shouldBorder = false;
    }
  };

  onMount(async () => {
    window.addEventListener("scroll", navBorderTracker);
    hasNotification = await hasNotificationCall();
  });
</script>

<div in:fade class="sticky top-0 z-20 w-full md:w-auto md:min-h-screen ">
  <!-- mobile menu bar -->
  <div
    class="{shouldBorder
      ? 'border-b-2'
      : ''} fixed z-50 flex justify-between w-full bg-white md:w-auto md:hidden"
  >
    <!-- logo -->
    <a href="#/home" class="block px-4 py-2 my-auto text-2xl font-bold font-montserrat">Golpo</a>

    <!-- mobile menu button -->
    <button on:click="{toggleSideBar}" class="p-4 focus:outline-none active:bg-gray-100">
      <div class="flex my-auto">
       
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          {#if hasNotification}
          <span class="relative inline-block h-2">
            <span class="flex w-2 h-2">
              <span class="absolute inline-flex w-full h-full bg-black rounded-full opacity-75 animate-ping"></span>
              <span class="relative inline-flex w-2 h-2 bg-black rounded-full"></span>
            </span>
          </span>
          {/if}
      
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
            <div class="{item.name == 'Notification' && hasNotification ? 'animate-wiggle' : ''}">
              <Svg name="{item.icon}" height="24" width="24" />
            </div>
            {item.name}
            {#if item.name == "Notification" && hasNotification}
              <span class="relative inline-block -mt-4 -ml-2">
                <span class="flex w-2 h-2">
                  <span class="absolute inline-flex w-full h-full bg-black rounded-full opacity-75 animate-ping"></span>
                  <span class="relative inline-flex w-2 h-2 bg-black rounded-full"></span>
                </span>
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
