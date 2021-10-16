<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { info, loggedUsername } from "../store";
  import client from "../client";
  import moment from "moment";

  import Post from "../components/Post.svelte";
  import Footer from "../components/Footer.svelte";

  export let slug;
  let post;
  let postComment;

  const lovePost = postId => {
    if (!post.isLovedByMe) {
      client.Post.reactLove(postId);
      post.isLovedByMe = true;
      post.loveCount++;
    } else {
      $info = "You cannot un-love a post!";
    }
  };

  const getPost = async postId => {
    const res = await client.Post.getById(postId);
    post = res.data;
    post.commentCount = post.comments.length;
    post.loveCount = post.loves.length;
    post.isLovedByMe = post.loves.some(love => love.author == $loggedUsername);
    post.comments = post.comments.reverse();
  };

  const handleKeyup = e => {
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      addComment();
    }
  };

  const addComment = async () => {
    postComment = postComment.trim();
    if (postComment != "") {
      const res = await client.Post.createComment(post._id, postComment);
      console.log(res.data);
      post.comments = res.data.comments.reverse();
      post.commentCount++;
      postComment = "";
    }
  };

  onMount(async () => {
    getPost(slug);
  });
</script>

<div in:fade class="grid grid-cols-12">
  <div class="col-span-12 md:col-span-10">
    <div class="grid pt-16 md:pt-5">
      {#if post}
        <Post bind:post />

        <div class="max-w-xl px-5 mt-4 text-sm">
          <textarea
            class="w-full px-2 py-1 border rounded outline-none focus:border-gray-400"
            placeholder="Add your comment"
            on:keyup="{handleKeyup}"
            bind:value="{postComment}"
            style="resize: none;"></textarea>
          <button
            on:click="{addComment}"
            class="items-center px-3 py-1 mb-5 text-sm transition duration-200 border border-gray-200 rounded-full hover:shadow-md hover:bg-indigo-100 focus:outline-none focus-visible:border-gray-500"
          >
            <span class="text-xs text-gray-500">Comment</span>
          </button>
          {#each post.comments as comment}
            <div in:fade class="px-1 py-3">
              <div class="flex w-full">
                <div class="flex-none w-10 h-10 rounded-full">
                  <img
                    class="object-cover w-10 h-10 border-2 border-indigo-500 rounded-full shadow cursor-pointer"
                    alt="User avatar"
                    src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                  />
                </div>
                <div class="flex flex-col mt-1 mb-2 ml-4">
                  <div class="text-sm font-semibold text-gray-600">{comment.author}</div>
                  <div class="text-xs font-thin text-gray-400">{moment(comment.created_at).fromNow()}</div>
                </div>
              </div>
              <div class="mt-1 text-sm text-gray-600">{comment.text}</div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>


<div class="mt-20">
  <Footer />
</div>
