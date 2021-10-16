<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  body {
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; */
    font-family: "Proxima Nova", sans-serif;
  }
  * {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>

<script>
  import { onMount } from "svelte";
  import Nav from "./components/Nav.svelte";

  import Home from "./page/Home.svelte";
  import Chat from "./page/Chat.svelte";
  import Users from "./page/Users.svelte";
  import Login from "./page/Login.svelte";
  import Profile from "./page/Profile.svelte";
  import Post from "./page/Post.svelte";
  import MobileUserChat from "./components/MobileUserChat.svelte";
  import ErrorAlert from "./components/ErrorAlert.svelte";
  import InfoAlert from "./components/InfoAlert.svelte";

  import { loggedUsername, error, info } from "./store.js";

  let currentPage;
  let props;

  const pageMapping = {
    "": Home,
    home: Home,
    chat: Chat,
    users: Users,
    profile: Profile,
    userchat: MobileUserChat,
  };

  const slugPageMapping = {
    chat: Chat,
    profile: Profile,
    post: Post,
  };

  function hashchange() {
    // the poor man's router!
    let path = window.location.hash.slice(1);
    path = path.split("?")[0];
    path = path.split("/");

    console.log(path);
    if (path.length == 3 && path[2] != "") {
      setTimeout(() => {
        props = { slug: path[2] };
        currentPage = slugPageMapping[path[1]];
        window.scrollTo(0, 0);
      }, 200);
    } else {
      setTimeout(() => {
        path = path[1] || path[0];
        currentPage = pageMapping[path];
        window.scrollTo(0, 0);
      }, 200);
    }
  }

  onMount(hashchange);
</script>

<svelte:window on:hashchange="{hashchange}" />

<body class="container mx-auto max-w-7xl antialised">
  <div class="grid mx-auto">
    {#if $error}
      <ErrorAlert />
    {/if}
  </div>
  <div class="grid mx-auto">
    {#if $info}
      <InfoAlert />
    {/if}
  </div>

  <!-- HINT: remove the ! for easy developemnt without login everytime -->
  {#if !$loggedUsername}
    <Login />
  {:else}
    <div>
      <div class="grid grid-cols-12 mx-auto max-w-7xl">
        <div class="col-span-12 md:col-span-2">
          <Nav />
        </div>
        <div class="col-span-12 md:col-span-10">
          <svelte:component this="{currentPage}" {...props} />
        </div>
      </div>
    </div>
  {/if}
</body>
