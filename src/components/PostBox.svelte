<script>
  import { loggedUserImage, tags, error, info } from "../store";
  import client from "../client";
  import { showTag } from "../helpers";

  import Multiselect from "./Multiselect.svelte";

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

<div class="max-w-xl p-5 mx-auto border rounded-lg shadow-sm">
  <div class="flex items-center max-w-xl mx-auto">
    <div class="flex items-center w-full max-w-xl gap-2">
      <img class="w-12 border-2 border-indigo-400 rounded-full" src="{$loggedUserImage}" alt="Alex" />
      <div class="w-full">
        <input
          bind:value="{url}"
          aria-placeholder="Share a link"
          placeholder="Share a link"
          class="block w-full px-5 py-2 text-sm bg-white border border-gray-300 rounded-full focus:shadow-md focus:outline-none focus:border-indigo-400 focus:text-gray-700 md:text-base"
        />
      </div>

      <button
        on:click="{sharePost}"
        class="flex items-center gap-1 p-2 transition-colors border border-gray-300 rounded-full hover:shadow-lg hover:bg-indigo-100 focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500"
      >
        <span
          ><img
            alt=""
            width="32"
            src="data:image/png;base64,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"
          />
        </span>
      </button>
    </div>
  </div>
  <div class="w-full px-12 pt-3 mx-auto">
    {#if $tags.length > 0}
      <Multiselect id="tags" bind:value="{selectedTags}" placeholder="+ Add tags">
        {#each $tags as tag}
          <option value="{tag}">{showTag(tag)}</option>
        {/each}
      </Multiselect>
    {/if}
  </div>
</div>
