<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { info, loggedUsername } from "../store";
  import client from "../client";
  import moment from "moment";
  import { IMAGE_LARGE } from "../defaults";

  import Post from "../components/Post.svelte";
  import Footer from "../components/Footer.svelte";

  export let slug;
  let post;
  let postComment;
  let postComments;

  const getPost = async postId => {
    const res = await client.Post.getById(postId);
    post = res.data;
    post.commentCount = post.comments.length;
    post.loveCount = post.loves.length;
    post.isLovedByMe = post.loves.some(love => love.author == $loggedUsername);
    post.comments = post.comments.reverse();

    let usernames = [...new Set(post.comments.map(i => i.author))];
    usernames.push(post.author);
    const userRes = await client.User.getUsersMeta(usernames);

    const users = userRes.data.users.reduce((acc, user) => {
      acc[user.username] = user;
      return acc;
    }, {});

    post.authorName = users[post.author].display_name;
    post.authorImage = users[post.author].image;
    post.comments.forEach(comment => {
      comment.authorName = users[comment.author].display_name;
      comment.authorImage = users[comment.author].image;
    });

    postComments = post.comments;
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
    <div class="grid mt-16 md:ml-12 md:mt-6">
      {#if postComments}
        <Post bind:post />

        <div class="max-w-xl p-4 mt-4 text-sm bg-dark1 rounded-2xl">
          <div class="">
            <textarea
              class="w-full px-2 py-2 outline-none rounded-xl bg-light3 focus:border-gray-400"
              placeholder="Add your comment"
              on:keyup="{handleKeyup}"
              bind:value="{postComment}"
              style="resize: none;"></textarea>

            <button
              on:click="{addComment}"
              class="px-3 py-1 mb-2 text-sm transition duration-200 rounded-lg bg-color1 hover:bg-color1-dark focus:outline-none focus-visible:border-gray-500"
            >
              <span class="text-xs text-gray-500">Comment</span>
            </button>
          </div>
          {#each postComments as comment}
            <div in:fade class="py-2">
              <div class="flex w-full">
                <div class="flex-none w-10 h-10 rounded-full">
                  <img
                    class="object-cover w-10 h-10 rounded-full cursor-pointer"
                    alt="User avatar"
                    src="{comment.authorImage || IMAGE_LARGE}"
                  />
                </div>
                <div class="flex flex-col mt-1 mb-2 ml-4">
                  <div class="text-sm font-semibold text-gray-600">{comment.authorName || comment.author}</div>
                  <div class="text-xs font-thin text-gray-400">{moment(comment.created_at).fromNow()}</div>
                </div>
              </div>
              <div class="text-sm text-gray-600 ">{comment.text}</div>
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
