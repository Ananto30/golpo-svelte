<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { page } from "../store.js";
  import client from "../client";

  import Tags from "../components/Tags.svelte";
  import Posts from "../components/Posts.svelte";
  import Footer from "../components/Footer.svelte";
  import PostBox from "../components/PostBox.svelte";

  let allPosts = [];
  let selectedTag = "";
  let sharedPost = null;

  const getPosts = async () => {
    const res = await client.Post.getAll();
    allPosts = res.data.posts.reverse();
  };

  $: if (sharedPost) {
    console.log("mama ami koi")
    allPosts = [sharedPost, ...allPosts];
  }

  onMount(async () => {
    $page = "home";
    getPosts();
  });
</script>

<div in:fade class="grid grid-cols-12">
  <div class="col-span-12 md:col-span-8 ">
    {#if allPosts.length == 0}
      <div class="w-full max-w-xl p-4 mx-auto mt-16 md:mt-10">
        <div class="flex space-x-4 animate-pulse">
          <div class="flex-1 py-1 space-y-4">
            <div class="space-y-6">
              <div class="h-4 bg-gray-300 "></div>
              <div class="w-5/6 h-4 bg-gray-300 "></div>
            </div>
          </div>
        </div>
      </div>
      {#each Array(5) as _}
        <div class="w-full max-w-xl p-4 mx-auto">
          <div class="flex space-x-4 animate-pulse">
            <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div class="flex-1 py-1 space-y-4">
              <div class="w-3/4 h-4 bg-gray-300 "></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-300 "></div>
                <div class="w-5/6 h-4 bg-gray-300 "></div>
              </div>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <div class="min-w-full mt-16 md:mt-6">
        <PostBox bind:sharedPost />
      </div>
      <div class="grid mx-auto">
        <div class="mx-auto mt-4">
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
