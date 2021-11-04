<script>
  import { onMount } from "svelte";
  import client from "../client";
  import { fade } from "svelte/transition";
  import { tags } from "../store";
  import { getTagSvgName } from "../helpers";

  import Svg from "../components/Svg.svelte";
  
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

<div in:fade class="sticky top-0 hidden w-full px-2 py-8 pl-10 md:block">
  <div class="bg-white rounded-2xl">
    <h2 class="px-2 text-2xl font-extrabold text-yellow">Tags</h2>
    <div class="flex flex-wrap pt-4">
      {#each $tags as tag}
        <button
          on:click="{() => selectTag(tag)}"
          class="{selectedTag == tag
            ? 'font-bold'
            : 'bg-dark1'} m-2 text-sm items-center border-b border-transparent hover:border-current transition duration-200"
        >
          <span class="flex items-center gap-1"> <Svg name={getTagSvgName(tag)} height="16" width="16" />{tag}</span>
        </button>
      {/each}
    </div>
  </div>
</div>
