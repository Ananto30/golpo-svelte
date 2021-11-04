<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { page } from "../store.js";
  import client from "../client";
  import moment from "moment";

  import Tags from "../components/Tags.svelte";
  import Posts from "../components/Posts.svelte";
  import Footer from "../components/Footer.svelte";

  let notifications = [];

  const getNotifications = async () => {
    const res = await client.Notification.getAll();
    notifications = res.data.notifications.reverse();
  };

  const clickedNotification = async id => {
    await client.Notification.click(id);
  };

  onMount(async () => {
    $page = "notification";
    getNotifications();
  });
</script>

<div in:fade class="grid grid-cols-12">
  <div class="col-span-12 md:col-span-8">
    <div class="grid mx-auto">
      <div class="mt-14 md:ml-10 md:mt-10">
        <h3 class="px-4 text-xl font-bold md:mb-6 font-montserrat">Notifications</h3>
        {#each notifications as notification}
          <a href="#/post/{notification.post_id}" on:click="{() => clickedNotification(notification._id)}">
            <div class="{notification.clicked ? '' : 'bg-blue-50'} p-4 border-b border-gray-300 hover:bg-gray-100">
              <p><b>{notification.comment_author}</b> commented on your post</p>
              <span class="text-sm font-thin">{moment(notification.created_at).fromNow()}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</div>

<div class="mt-20">
  <Footer />
</div>
