<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page, isLoading } from '../store';
	import client from '../client';
	import moment from 'moment';

	import Footer from '../components/Footer.svelte';

	let notifications = [];

	const getNotifications = async () => {
		const res = await client.Notification.getAll();
		notifications = res.data.notifications.reverse();
		$isLoading = false;
	};

	const clickedNotification = async (id) => {
		await client.Notification.click(id);
	};

	onMount(async () => {
		$page = 'notification';
		getNotifications();
	});
</script>

<div in:fade class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-8">
		<div class="mx-auto grid">
			<div class="mt-14 md:mt-10 md:ml-10">
				<h3 class="font-montserrat mb-4 px-4 text-xl font-bold md:mb-6">Notifications</h3>
				{#each notifications as notification}
					<a
						href="#/post/{notification.post_id}"
						on:click={() => clickedNotification(notification._id)}
					>
						<div
							class="{notification.clicked
								? ''
								: 'bg-blue-50'} border-b border-gray-300 p-4 hover:bg-gray-100"
						>
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
