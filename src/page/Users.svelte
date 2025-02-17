<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import client from '../client';
	import Footer from '../components/Footer.svelte';
	import Tab from '../components/Tab.svelte';
	import UserCard from '../components/UserCard.svelte';
	import { isLoading, loggedUsername, page } from '../store';
	import type { UserMeta } from '../types';
	import Loading from '../components/Loading.svelte';

	let users: UserMeta[] = [];
	let tabs = ['All', 'Followers', 'Following'];
	let selectedTab = 'All';

	let hasLoaded = false;

	const getAllUsers = async () => {
		const res = await client.User.getAllUsers();
		users = res.data.users;
		$isLoading = false;
		hasLoaded = true;
	};

	const getFollowers = async () => {
		const res = await client.User.getFollowers($loggedUsername);
		users = res.data.users;
	};

	const getFollowing = async () => {
		const res = await client.User.getFollowing($loggedUsername);
		users = res.data.users;
	};

	$: if (selectedTab === 'All') {
		getAllUsers();
	} else if (selectedTab === 'Followers') {
		getFollowers();
	} else if (selectedTab === 'Following') {
		getFollowing();
	}

	onMount(async () => {
		$page = 'users';
		getAllUsers();
	});
</script>

<div in:fade class="min-h-screen">
	<div class="sticky top-0 z-10 mb-3 bg-white pt-16 md:pt-8">
		{#if !hasLoaded}
			<div class="flex h-80 w-full items-center justify-center">
				<Loading />
			</div>
		{:else if hasLoaded && users.length === 0}
			<div class="flex h-80 w-full items-center justify-center">
				<p class="text-center text-gray-800">No users yet...</p>
			</div>
		{:else}
			<div in:fade class="justify-center">
				<Tab items={tabs} bind:selectedItem={selectedTab} />
			</div>
			<div in:fade class="grid grid-cols-2 lg:grid-cols-4">
				{#each users as user}
					<div in:fade>
						<UserCard bind:user />
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<Footer />
