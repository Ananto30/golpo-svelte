<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page, isLoading, loggedUsername } from '../store';
	import client from '../client';
	import moment from 'moment';

	import Footer from '../components/Footer.svelte';

	let notifications = {
		thisWeek: [],
		lastWeek: [],
		lastMonth: [],
		lastYear: [],
		ancient: []
	};
	let categoryNameMap = {
		thisWeek: 'This Week',
		lastWeek: 'Last Week',
		lastMonth: 'Last Month',
		lastYear: 'Last Year',
		ancient: 'Ancient'
	};

	const getNotifications = async () => {
		const res = await client.Notification.getAll($loggedUsername);
		const allNotifications = res.data.notifications.reverse();
		const now = moment();

		let newNotifications = {
			thisWeek: [],
			lastWeek: [],
			lastMonth: [],
			lastYear: [],
			ancient: []
		};

		allNotifications.forEach((notification) => {
			const createdAt = moment(notification.created_at);
			if (createdAt.isSame(now, 'week')) {
				newNotifications.thisWeek.push(notification);
			} else if (createdAt.isSame(now.clone().subtract(1, 'week'), 'week')) {
				newNotifications.lastWeek.push(notification);
			} else if (createdAt.isSame(now.clone().subtract(1, 'month'), 'month')) {
				newNotifications.lastMonth.push(notification);
			} else if (createdAt.isSame(now.clone().subtract(1, 'year'), 'year')) {
				newNotifications.lastYear.push(notification);
			} else {
				newNotifications.ancient.push(notification);
			}
		});

		notifications = newNotifications; // Reassign to trigger reactivity
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

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-8 md:ml-10">
		{#each Object.entries(notifications) as [category, notis]}
			{#if notis.length > 0}
				<div in:fade>
					<h4 class="font-rubik mt-8 mb-2 text-right text-lg font-medium">
						{categoryNameMap[category]}
					</h4>
					{#each notis as noti}
						<a href="#/post/{noti.post_id}" on:click={() => clickedNotification(noti._id)}>
							<div
								class="flex items-center justify-between gap-4 border-b border-gray-300 p-4 text-sm hover:bg-gray-100
                                {noti.clicked ? '' : 'bg-blue-50'}"
							>
								<p><b>{noti.comment_author}</b> commented on your post</p>
								<span class="text-xs text-gray-500">{moment(noti.created_at).fromNow()}</span>
							</div>
						</a>
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
