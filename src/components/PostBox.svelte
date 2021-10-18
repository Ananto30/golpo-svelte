<script>
  import { loggedUserImage, tags, error, info } from "../store";
  import client from "../client";
  import { showTag } from "../helpers";
  import { IMAGE_LARGE } from "../defaults";

  import Multiselect from "./Multiselect.svelte";
  import ShareSvg from "../svgs/ShareSvg.svelte";

  let url = "";
  let selectedTags = [];

  const sharePost = () => {
    if (selectedTags.length === 0) {
      $error = "Atleast select one tag!";
    } else if (url == "") {
      $error = "You want to share something? Put the link/url in the box!";
    } else {
      client.Post.createPost(url, selectedTags)
        .then(res => {
          if (res.status === 200) {
            url = "";
            selectedTags = [];
            $info = "Post shared!";
          } else {
            $error = "Sharing not successful";
          }
        })
        .catch(err => {
          $error = "Sharing not successful";
        });
    }
  };
</script>

<div class="max-w-xl pb-6 mx-auto md:p-4">
  <div class="flex items-center max-w-xl mx-auto">
    <div class="flex items-center w-full max-w-xl gap-2">
      <img class="w-12 rounded-full" src="{$loggedUserImage ? $loggedUserImage : IMAGE_LARGE}" alt="Alex" />
      <div class="w-full">
        <input
          bind:value="{url}"
          aria-placeholder="Share a link"
          placeholder="Share a link"
          class="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-full focus:shadow-md focus:outline-none focus:border-indigo-400 focus:text-gray-700 md:text-base"
        />
      </div>

      <button
        on:click="{sharePost}"
        class="p-3 transition-colors border border-gray-300 rounded-full hover:shadow-lg hover:bg-indigo-100 focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500"
      >
        <span>
          <ShareSvg />
        </span>
      </button>
    </div>
  </div>
  <div class="mx-auto mt-4">
    {#if $tags.length > 0}
      <Multiselect id="tags" bind:value="{selectedTags}" placeholder="+ Add tags">
        {#each $tags as tag}
          <option value="{tag}">{showTag(tag)}</option>
        {/each}
      </Multiselect>
    {/if}
  </div>
</div>
