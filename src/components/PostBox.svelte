<script>
  import { loggedUserImage, tags, error, info, loggedUsername } from "../store";
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

<div class="flex max-w-xl p-2 mx-auto bg-dark1 rounded-2xl md:p-4">
  <img
    class="border-2 rounded-full border-light2 h-14 w-14"
    src="{$loggedUserImage ? $loggedUserImage : IMAGE_LARGE}"
    alt="{$loggedUsername}"
  />
  <div class="w-full ml-2">
    <div class="flex max-w-xl mx-auto">
      <div class="w-full">
        <input
          bind:value="{url}"
          aria-placeholder="Share a link"
          placeholder="Share a link"
          class="block w-full h-10 px-4 py-2 text-sm rounded-xl bg-light3 focus:outline-none focus:ring-1 focus:ring-light2"
        />
      </div>
    </div>
    <div class="flex mx-auto mt-2 md:mt-4">
      {#if $tags.length > 0}
        <div class="flex flex-grow ">
          <Multiselect id="tags" bind:value="{selectedTags}" placeholder="+ Add tags">
            {#each $tags as tag}
              <option value="{tag}">{showTag(tag)}</option>
            {/each}
          </Multiselect>
        </div>
      {/if}
      <div class="flex justify-end">
        <button
          on:click="{sharePost}"
          type="button"
          class="inline-flex justify-center px-4 py-2 ml-2 text-sm transition duration-200 rounded-lg bg-color1 hover:bg-color1-dark focus:outline-none focus:bg-color1-dark"
        >
          Share
        </button>
      </div>
    </div>
  </div>
</div>
