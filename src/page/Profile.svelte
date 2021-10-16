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

  export let slug;

  let allPosts = [];
  let editable = false;
  let work;
  let tagline;
  let image;
  let followed = false;
  let userDetailsOnTop = false;
  let selectedTag = "";

  $: if (slug == "" || slug == $loggedUsername) {
    editable = true;
    slug = $loggedUsername;
  }

  const getProfileInfo = async () => {
    const res = await client.User.getByUsername(slug);
    console.log(res.data);
    work = res.data.work;
    tagline = res.data.tagline;
    image = res.data.image;
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

  const topTracker = () => {
    let element = document.getElementById("user-details");
    let atTop = element.getBoundingClientRect().top;
    if (atTop == 0) {
      userDetailsOnTop = true;
    } else {
      userDetailsOnTop = false;
    }
  };

  $: if (slug) {
    $page = "profile";
    getProfileInfo();
    getPosts();
  }

  onMount(async () => {
    window.addEventListener("scroll", topTracker);
  });

  onDestroy(() => {
    window.removeEventListener("scroll", topTracker);
  });
</script>

<div in:fade class="grid min-h-screen grid-cols-12">
  <div class="col-span-12 md:col-span-8">
    <div class="z-10 bg-white md:sticky top-14 md:top-0">
      <div class="w-full mx-auto">
        <div
          id="user-details"
          class="{userDetailsOnTop ? 'border-b-2' : ''} flex w-full px-3 py-5 mt-14 md:mt-20 md:px-16"
        >
          <div class="flex-none w-20 h-20 rounded-full md:w-32 md:h-32">
            <img
              class="object-cover w-20 h-20 border-2 border-indigo-500 rounded-full shadow cursor-pointer md:w-32 md:h-32"
              alt="User avatar"
              src="{image ? image : IMAGE_LARGE}"
            />
          </div>
          <div class="flex flex-col mt-1 mb-2 ml-4">
            <div class="text-2xl font-bold ">{slug}</div>
            <div class="mr-1 font-base">{work ? work : WORK}</div>
            <div class="text-sm text-gray-500">
              {tagline ? tagline : TAGLINE}
            </div>
            {#if !editable}
              <div class="mt-5">
                {#if followed}
                  <button
                    in:fade
                    on:click="{followButtonHandler}"
                    class="flex-none px-3 py-1 text-sm text-white transition duration-200 bg-indigo-500 border border-indigo-200 rounded-full hover:shadow-md hover:bg-indigo-600 focus:bg-indigo-400 focus:outline-none focus-visible:border-gray-500"
                  >
                    <span>{followed ? "Following" : "Follow"}</span>
                  </button>
                {:else}
                  <button
                    in:fade
                    on:click="{followButtonHandler}"
                    class="flex-none px-3 py-1 text-sm transition duration-200 border border-indigo-200 rounded-full hover:shadow-md hover:bg-indigo-100 focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500"
                  >
                    <span>{followed ? "Following" : "Follow"}</span>
                  </button>
                {/if}
                <button
                  class="flex-none px-3 py-1 text-sm transition duration-200 border border-indigo-200 rounded-full hover:shadow-md hover:bg-indigo-100 focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500"
                >
                  <span>Send Message</span>
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <div class="min-w-full px-3 pt-5 border-t md:px-0 md:py-7 md:border-t-0">
      {#if editable}
        <PostBox />
      {/if}
    </div>
    <div class="grid mx-auto">
      <div class="mx-auto">
        <Posts bind:allPosts bind:selectedTag />
      </div>
    </div>
  </div>
  <div class="col-span-4">
    <Tags bind:selectedTag />
  </div>
</div>

<div class="mt-20">
  <Footer />
</div>
