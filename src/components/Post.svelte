<script>
  import { fade } from "svelte/transition";
  import { info, loggedUsername } from "../store";
  import moment from "moment";
  import client from "../client";
  import { showTag } from "../helpers";
  import { IMAGE_LARGE } from "../defaults";

  import LoveSvg from "../svgs/LoveSvg.svelte";
  import DeleteSvg from "../svgs/DeleteSvg.svelte";
  import OpenLinkSvg from "../svgs/OpenLinkSvg.svelte";
  import CommentSvg from "../svgs/CommentSvg.svelte";
  import RedLoveSvg from "../svgs/RedLoveSvg.svelte";

  export let post;
  export let onDelete;

  const mediaButtonClass =
    "flex items-center gap-1 px-2 py-1 text-sm transition duration-200 ease-in-out  rounded-full md:px-3 h-7 md:h-8 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500";

  const lovePost = postId => {
    if (!post.isLovedByMe) {
      client.Post.reactLove(postId);
      post.isLovedByMe = true;
      post.loveCount++;
    } else {
      $info = "You cannot un-love a post!";
    }
  };
</script>

<div in:fade class="">
  <div class="flex max-w-xl py-4 overflow-hidden bg-white border-b-2">
    <div class="flex items-center w-full">
      <div class="w-full">
        <div class="flex flex-row items-center px-4 pb-4">
          <div class="w-auto h-auto rounded-full">
            <a href="#/profile/{post.author}" class="">
              <img
                class="object-cover w-12 h-12 rounded-full shadow cursor-pointer"
                alt="User avatar"
                src="{post.authorImage || IMAGE_LARGE}"
              />
            </a>
          </div>
          <div class="flex flex-col ml-4">
            <div class="text-sm font-semibold text-gray-600">{post.authorName || post.author}</div>
            <div class="flex w-full mt-1">
              <div class="text-xs font-medium text-indigo-700 cursor-pointer">
                {post.tags.map(tag => showTag(tag)).join(" • ")}
              </div>

              <div class="ml-1 text-xs text-gray-400">• {moment(post.created_at).fromNow()}</div>
            </div>
          </div>
        </div>
        <div class="px-4 mb-2 text-lg font-semibold leading-6 text-gray-800 line-clamp-2">
          {post.title}
        </div>
        <div class="px-4 mb-2 text-sm text-gray-600 line-clamp-5">
          {post.description || ""}
        </div>
        <div class="px-4 my-4 text-sm font-medium text-gray-400">
          <img class="rounded" alt="{post.title}" src="{post.image}" />
        </div>

        <div class="flex justify-start mt-4 border-gray-100 md:border-none">
          <div class="flex gap-2 px-6">
            <button title="loves" on:click="{() => lovePost(post._id)}" class="{mediaButtonClass}">
              {#if post.isLovedByMe}
                <RedLoveSvg />
              {:else}
                <LoveSvg />
              {/if}
              <span>{post.loveCount}</span>
            </button>
            <a href="#/post/{post._id}" title="comments" class="{mediaButtonClass}">
              <CommentSvg />
              <span>{post.commentCount}</span>
            </a>
            <a title="visit link" href="{post.url}" target="_blank" class="{mediaButtonClass}">
              <OpenLinkSvg />
            </a>
            {#if post.author == $loggedUsername}
              <button title="delete" on:click="{onDelete}" class="{mediaButtonClass}">
                <DeleteSvg />
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
