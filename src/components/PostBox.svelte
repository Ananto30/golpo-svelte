<script>
  import { tags, error, info } from "../store";
  import client from "../client";

  import Multiselect from "./Multiselect.svelte";

  export let sharedPost;

  let url = "";
  let selectedTags = [];

  const sharePost = async () => {
    if (selectedTags.length === 0) {
      $error = "Atleast select one tag!";
      return;
    }
    if (url == "") {
      $error = "You want to share something? Put the link/url in the box!";
      return;
    }
    try {
      const res = await client.Post.createPost(url, selectedTags);
      url = "";
      selectedTags = [];
      $info = "Post shared!";
      sharedPost = res.data;
      sharedPost.loveCount = 0;
      sharedPost.commentCount = 0;
    } catch (e) {
      $error = "Sharing not successful";
    }
  };
</script>

<div class="flex max-w-xl p-2 mx-auto md:p-4">
  <!-- <img
    class="w-12 h-12 border-black rounded-full"
    src="{$loggedUserImage ? $loggedUserImage : IMAGE_LARGE}"
    alt="{$loggedUsername}"
  /> -->
  <div class="w-full">
    <div class="flex max-w-xl mx-auto">
      <div class="w-full">
        <input
          bind:value="{url}"
          aria-placeholder="Share a link"
          placeholder="Share a link"
          class="block w-full h-10 px-4 py-2 text-sm border-b border-gray-300 focus:outline-none"
        />
      </div>
    </div>
    <div class="flex mx-auto mt-2 md:mt-4">
      {#if $tags.length > 0}
        <div class="flex flex-grow ">
          <Multiselect id="tags" bind:value="{selectedTags}" placeholder="+ Add tags">
            {#each $tags as tag}
              <option value="{tag}">{tag}</option>
            {/each}
          </Multiselect>
        </div>
      {/if}
      <div class="flex justify-end">
        <button
          on:click="{sharePost}"
          type="button"
          class="inline-flex justify-center px-4 py-2 ml-2 text-sm text-white transition duration-200 bg-black border border-transparent hover:bg-white hover:text-black hover:border-current focus-visible:ring"
        >
          Share
        </button>
      </div>
    </div>
  </div>
</div>
