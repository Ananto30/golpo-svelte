<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { loggedUsername } from "../store";
  import client from "../client";
  import moment from "moment";
  import { IMAGE_LARGE } from "../defaults";

  import Post from "../components/Post.svelte";
  import Footer from "../components/Footer.svelte";

  import Svg from "../components/Svg.svelte";

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
      postComments = post.comments; // Update postComments to reflect the new comment
    }
  };

  const deleteComment = async commentId => {
    const res = await client.Post.deleteComment(post._id, commentId);
    post.comments = res.data.post.comments.reverse();
    post.commentCount--;
    postComments = post.comments; // Update postComments to reflect the deleted comment
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

        <div class="max-w-xl p-4 mt-4 text-sm">
          <div class="mb-4 border-gray-300 ">
            <textarea
              class="w-full outline-none focus:border-gray-800"
              placeholder="Add your comment"
              on:keyup="{handleKeyup}"
              bind:value="{postComment}"
              rows="3"
              style="resize: none;"></textarea>
            <div class="flex justify-end">
              <button
                on:click="{addComment}"
                class="px-2 py-1 text-sm text-white transition duration-200 bg-black border border-transparent hover:bg-white hover:text-black hover:border-current focus-visible:ring"
              >
                <span class="text-xs ">Comment</span>
              </button>
            </div>
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
                <div class="flex flex-col w-full mt-1 mb-2 ml-2">
                  <div class="inline-flex w-full">
                    <div class="flex text-sm font-semibold text-gray-600">{comment.authorName || comment.author}</div>
                    {#if comment.author == $loggedUsername}
                      <div class="flex pl-2">
                        <button title="delete" on:click="{() => deleteComment(comment._id)}">
                          <Svg name="delete" height="16" width="16" />
                        </button>
                      </div>
                    {/if}
                  </div>
                  <div class="text-xs font-thin text-gray-500">{moment(comment.created_at).fromNow()}</div>

                  <div class="text-sm text-gray-600 break-all">
                    {comment.text}
                  </div>
                </div>
              </div>
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