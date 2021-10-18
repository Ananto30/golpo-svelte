<script>
  import { fade } from "svelte/transition";
  import { info, loggedUsername } from "../store";
  import moment from "moment";
  import client from "../client";
  import { showTag } from "../helpers";
  import LoveSvg from "../svgs/LoveSvg.svelte";
  import DeleteSvg from "../svgs/DeleteSvg.svelte";
  import OpenLinkSvg from "../svgs/OpenLinkSvg.svelte";
  import CommentSvg from "../svgs/CommentSvg.svelte";
  import { IMAGE_LARGE } from "../defaults";

  export let post;
  export let onDelete;

  const mediaButtonClass =
    "flex items-center gap-1 px-2 py-1 text-sm transition duration-200 ease-in-out border border-gray-300 rounded-full md:px-3 h-7 md:h-8 hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500";

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

              <div class="ml-1 text-xs text-gray-400"> • {moment(post.created_at).fromNow()}</div>
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

        <div class="flex justify-start mt-2 border-gray-100 md:border-none">
          <div class="flex gap-4 px-4">
            <button title="loves" on:click="{() => lovePost(post._id)}" class="{mediaButtonClass}">
              {#if post.isLovedByMe}
                <img
                  alt=""
                  width="16"
                  height="16"
                  src="data:image/png;base64,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"
                />
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
