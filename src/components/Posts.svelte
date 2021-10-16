<script>
  import client from "../client";

  import Post from "./Post.svelte";

  export let allPosts;
  export let selectedTag;

  let filteredPosts;

  const deletePost = async id => {
    if (confirm("Are you sure you want to delete this post?")) {
      const rest = await client.Post.deletePost(id);
      allPosts = allPosts.filter(post => post._id !== id);
      filteredPosts = allPosts;
    }
  };

  const filterByTag = tag => {
    if (tag == "all") {
      filteredPosts = allPosts;
    } else {
      filteredPosts = allPosts.filter(post => {
        return post.tags.includes(tag);
      });
    }
  };

  $: if (selectedTag) filterByTag(selectedTag);
  $: if (allPosts) filteredPosts = allPosts;
</script>

{#each filteredPosts as post}
  <Post post="{post}" onDelete="{() => deletePost(post._id)}" />
{/each}
