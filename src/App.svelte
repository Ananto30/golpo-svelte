<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
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
  import Bookmarks from "./page/Bookmarks.svelte";
  import Notification from "./page/Notification.svelte";

  import Alert from "./components/Alert.svelte";

  import { loggedUsername, error, info } from "./store.js";

  let currentPage;
  let props;

  const pageMapping = {
    "": Home,
    home: Home,
    chat: Chat,
    users: Users,
    profile: Profile,
    bookmarks: Bookmarks,
    notification: Notification,
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
  <div class="flex mx-auto">
    {#if $error}
     <Alert name="error" bind:message="{$error}" />
    {/if}
    {#if $info}
      <Alert name="info" bind:message="{$info}" />
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
