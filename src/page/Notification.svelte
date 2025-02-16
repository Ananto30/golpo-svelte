<script lang="ts">
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Footer from '../components/Footer.svelte';
	import { isLoading, loggedUsername, page } from '../store';
	import type { Notification } from '../types';

	type NotificationGroups = {
		thisWeek: Notification[];
		lastWeek: Notification[];
		lastMonth: Notification[];
		lastYear: Notification[];
		ancient: Notification[];
	};

	let notifications: NotificationGroups = {
		thisWeek: [],
		lastWeek: [],
		lastMonth: [],
		lastYear: [],
		ancient: []
	};
	let categoryNameMap: Record<string, string> = {
		thisWeek: 'This Week',
		lastWeek: 'Last Week',
		lastMonth: 'Last Month',
		lastYear: 'Last Year',
		ancient: 'Ancient'
	};

	let hasLoaded = false;

	const getNotifications = async (): Promise<void> => {
		const res = await client.Notification.getAll($loggedUsername);
		const allNotifications: Notification[] = res.data.notifications.reverse();
		const now = moment();

		let newNotifications: NotificationGroups = {
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
		hasLoaded = true;
	};

	const clickedNotification = async (id: string): Promise<void> => {
		await client.Notification.click(id);
	};

	onMount(async () => {
		$page = 'notification';
		await getNotifications();
	});
</script>

<div class="grid grid-cols-12">
	<div class="col-span-12 md:col-span-8 md:ml-10">
		{#if !hasLoaded}
			<div class="flex h-64 items-center justify-center">
				<p class="text-center text-gray-600">Loading...</p>
			</div>
		{:else if hasLoaded && Object.values(notifications).every((notis) => notis.length === 0)}
			<div class="flex h-64 items-center justify-center">
				<p class="text-center text-gray-500">No notifications yet...</p>
			</div>
		{:else}
			{#each Object.entries(notifications) as [category, notis]}
				{#if notis.length > 0}
					<div in:fade>
						<h4 class="font-poppins mt-8 mb-2 text-sm font-semibold text-gray-400">
							{categoryNameMap[category]}
						</h4>
						<hr class=" text-gray-300" />
						{#each notis as noti}
							<a href="#/post/{noti.post_id}" on:click={() => clickedNotification(noti._id)}>
								<div
									class="flex items-center justify-between gap-4 border-b border-gray-300 p-4 text-sm transition ease-in-out hover:bg-gray-100
                                {noti.clicked ? '' : 'bg-blue-50'}"
								>
									<p>
										<b>{noti.comment_author}</b> commented on
										{noti.username == $loggedUsername ? 'your post' : 'a post you commented on'}
									</p>

									<span class="text-xs text-gray-500">{moment(noti.created_at).fromNow()}</span>
								</div>
							</a>
						{/each}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>
