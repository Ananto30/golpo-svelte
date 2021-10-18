<script>
  import { onMount } from "svelte";
  import client from "../client";
  import { fade } from "svelte/transition";
  import { tags } from "../store";
  import { showTag } from "../helpers";

  export let selectedTag = "";

  const getTags = () => {
    client.Post.getAllTags()
      .then(res => {
        $tags = res.data.tags;
      })
      .catch(err => {
        console.log(err);
      });
  };

  const selectTag = tag => {
    if (selectedTag == tag) {
      selectedTag = "all";
    } else {
      selectedTag = tag;
    }
  };

  onMount(async () => {
    getTags();
  });
</script>

<div in:fade class="sticky top-0 hidden w-full px-2 py-8 mx-10 md:block">
  <div class="bg-white rounded-2xl">
    <h2 class="px-2 text-2xl font-extrabold text-indigo-500">Tags</h2>
    <div class="flex flex-wrap pt-4">
      {#each $tags as tag}
        <button
          on:click="{() => selectTag(tag)}"
          class="{selectedTag == tag
            ? 'bg-indigo-200'
            : ''} hover:shadow-md m-2 text-sm items-center border border-gray-300 px-3 py-1 rounded-full hover:bg-indigo-100 transition duration-200 focus:outline-none focus-visible:border-gray-500"
        >
          <span>{showTag(tag)}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
