<style>
  .navshadow {
    box-shadow: 0px 15px 10px -15px rgb(109, 107, 107);
  }
</style>

<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import { loggedUsername, error, page } from "../store";
  import client from "../client";
  import { TAGLINE, WORK, IMAGE_LARGE } from "../defaults";

  import PostBox from "../components/PostBox.svelte";
  import Footer from "../components/Footer.svelte";
  import Posts from "../components/Posts.svelte";
  import Tags from "../components/Tags.svelte";
  import UserCard from "../components/UserCard.svelte";
  import Tab from "../components/Tab.svelte";
  import ProfileEditModal from "../components/ProfileEditModal.svelte";

  export let slug;

  let allPosts = [];
  let editable = false;
  let work;
  let tagline;
  let image;
  let followed = false;
  let userDetailsOnTop = false;
  let selectedTag = "";
  let displayName = "";
  let users = [];
  let editModalHide = true;

  const profileButtonClass =
    "flex-none px-3 py-1 text-sm transition duration-200 rounded-full bg-dark1 hover:bg-color1 focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500";

  let tabs = ["Posts", "Followers", "Following"];
  let selectedTab = "Posts";

  $: if (slug == "" || slug == $loggedUsername) {
    editable = true;
    slug = $loggedUsername;
  }

  const getProfileInfo = async () => {
    const res = await client.User.getByUsername(slug);
    work = res.data.work;
    tagline = res.data.tagline;
    image = res.data.image;
    displayName = res.data.display_name;
    followed = res.data.followers.includes($loggedUsername);
  };

  const getPosts = async () => {
    const res = await client.Post.getByUsername(slug);
    allPosts = res.data.posts.reverse();
  };

  const followButtonHandler = async () => {
    if (followed) {
      await client.User.unFollowUser(slug);
      followed = false;
    } else {
      await client.User.followUser(slug);
      followed = true;
    }
  };

  const getFollowers = async () => {
    const res = await client.User.getFollowers(slug);
    users = res.data.users;
  };

  const getFollowing = async () => {
    const res = await client.User.getFollowing(slug);
    users = res.data.users;
  };

  const topTracker = () => {
    let element = document.getElementById("user-details");
    let atTop = element.getBoundingClientRect().top;
    if (atTop == 0 || atTop == 40) {
      userDetailsOnTop = true;
    } else {
      userDetailsOnTop = false;
    }
  };

  $: if (slug) {
    $page = "profile";
    getProfileInfo();
    selectedTab = "Posts";
  }

  $: if (selectedTab == "Posts") {
    getPosts();
  } else if (selectedTab == "Followers") {
    getFollowers();
  } else if (selectedTab == "Following") {
    getFollowing();
  }

  onMount(async () => {
    window.addEventListener("scroll", topTracker);
  });

  onDestroy(() => {
    window.removeEventListener("scroll", topTracker);
  });
</script>

<div in:fade class="grid min-h-screen grid-cols-12">
  <ProfileEditModal bind:hide="{editModalHide}" bind:work bind:tagline />
  <div class="col-span-12 md:col-span-8">
    <div
      id="user-details"
      class="{userDetailsOnTop ? ' border-light1' : ''} z-10 bg-dark2 sticky top-12 md:top-0 pt-6 mt-16 md:mt-20"
    >
      <div class="w-full mx-auto">
        <div class="flex flex-row w-full px-4 md:px-16">
          <div class="flex-none w-20 h-20 rounded-full md:w-32 md:h-32">
            <img
              class="object-cover w-20 h-20 border-2 border-indigo-500 rounded-full cursor-pointer md:w-32 md:h-32"
              alt="User avatar"
              src="{image ? image : IMAGE_LARGE}"
            />
          </div>
          <div class="flex flex-col mb-2 ml-6 md:mt-2">
            <div class="text-2xl font-bold">{displayName || slug}</div>
            <div class="font-base">{work ? work : WORK}</div>
            <div class="text-sm text-gray-500">
              {tagline ? tagline : TAGLINE}
            </div>

            <div class="mt-2 -mx-2 md:mt-6">
              {#if !editable}
                {#if followed}
                  <button in:fade on:click="{followButtonHandler}" class="bg-color1 {profileButtonClass}">
                    <span>Following</span>
                  </button>
                {:else}
                  <button in:fade on:click="{followButtonHandler}" class="{profileButtonClass}">
                    <span>Follow</span>
                  </button>
                {/if}
                <button class="{profileButtonClass}">
                  <span>Send Message</span>
                </button>
              {:else}
                <button in:fade on:click="{() => (editModalHide = !editModalHide)}" class="{profileButtonClass}">
                  <span>Edit profile</span>
                </button>
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 mt-2 text-sm bg-white md:px-16">
        <Tab items="{tabs}" bind:selectedItem="{selectedTab}" />
      </div>
    </div>

    {#if selectedTab == "Followers" || selectedTab == "Following"}
      <div in:fade class="grid grid-cols-2 px-4 pt-6 lg:grid-cols-3">
        {#each users as user}
          <UserCard bind:user />
        {/each}
      </div>
    {/if}

    {#if selectedTab == "Posts"}
      {#if editable}
        <div class="px-4 mt-8 md:px-0">
          <PostBox />
        </div>
      {/if}

      <div class="grid mx-auto mt-4">
        <div class="mx-auto">
          <Posts bind:allPosts bind:selectedTag />
        </div>
      </div>
    {/if}
  </div>
  <div class="col-span-4">
    <Tags bind:selectedTag />
  </div>
</div>

<div class="mt-20">
  <Footer />
</div>
