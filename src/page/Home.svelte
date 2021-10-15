<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { page } from "../store.js";
  import client from "../client";

  import Tags from "../components/Tags.svelte";
  import Post from "../components/Post.svelte";
  import Footer from "../components/Footer.svelte";
  import PostBox from "../components/PostBox.svelte";

  let allPosts = [];
  let filteredPosts = [];
  let selectedTag = "";

  const getPosts = async () => {
    const res = await client.Post.getAll();
    allPosts = res.data.posts.reverse();
    filteredPosts = allPosts;
  };

  const filterByTag = tag => {
    if (tag == "") {
      filteredPosts = allPosts;
    } else {
      filteredPosts = allPosts.filter(post => {
        return post.tags.includes(tag);
      });
    }
  };

  $: if (selectedTag) {
    filterByTag(selectedTag);
  }

  onMount(async () => {
    $page = "home";
    getPosts();
  });
</script>

<div in:fade class="grid grid-cols-12">
  <div class="col-span-12 md:col-span-8">
    <div class="min-w-full px-3 pt-20 md:px-0 md:py-7">
      <PostBox />
    </div>
    {#each filteredPosts as post}
      <Post post="{post}" />
    {/each}
  </div>
  <div class="col-span-4">
    <Tags bind:selectedTag />
  </div>
</div>

<div class="mt-20">
  <Footer />
</div>
