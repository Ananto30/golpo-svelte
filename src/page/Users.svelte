<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import client from '../client';
	import { page, loggedUsername, isLoading } from '../store';

	import UserCard from '../components/UserCard.svelte';
	import Footer from '../components/Footer.svelte';
	import Tab from '../components/Tab.svelte';

	let users = [];
	let tabs = ['All', 'Followers', 'Following'];
	let selectedTab = 'All';

	const getAllUsers = async () => {
		const res = await client.User.getAllUsers();
		users = res.data.users;
		$isLoading = false;
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
		<!-- <div class="justify-center">
      <Tab items="{tabs}" bind:selectedItem="{selectedTab}" />
    </div> -->
		<div class="grid grid-cols-2 lg:grid-cols-4">
			{#each users as user}
				<UserCard bind:user />
			{/each}
		</div>
	</div>
</div>

<Footer />
