<script>
	import { fade } from 'svelte/transition';
	import { onMount, onDestroy } from 'svelte';
	import { loggedUsername, page, isLoading } from '../store';
	import client from '../client';
	import { TAGLINE, WORK, IMAGE_LARGE } from '../defaults';

	import PostBox from '../components/PostBox.svelte';
	import Footer from '../components/Footer.svelte';
	import Posts from '../components/Posts.svelte';
	import Tags from '../components/Tags.svelte';
	import UserCard from '../components/UserCard.svelte';
	import Tab from '../components/Tab.svelte';
	import ProfileEditModal from '../components/ProfileEditModal.svelte';
	import Avatar from '../components/Avatar.svelte';

	export let slug;

	let allPosts = [];
	let editable = false;
	let work;
	let tagline;
	let image;
	let followed = false;
	let userDetailsOnTop = false;
	let selectedTag = '';
	let displayName = '';
	let users = [];
	let editModalHide = true;

	const profileButtonClass =
		'flex-none px-3 py-1 text-sm transition duration-200 text-white bg-black border border-transparent hover:bg-white hover:text-black hover:border-current focus-visible:ring hover:cursor-pointer';

	let tabs = ['Posts', 'Followers', 'Following'];
	let selectedTab = 'Posts';

	$: if (slug == '' || slug == $loggedUsername) {
		editable = true;
		slug = $loggedUsername;
	}

	const getProfileInfo = async () => {
		const res = await client.User.getByUsername(slug);
		work = res.data.work;
		tagline = res.data.tagline;
		image = res.data.image;
		displayName = res.data.display_name;
		followed = res.data.followers.includes($loggedUsername);
		$isLoading = false;
	};

	const getPosts = async () => {
		const res = await client.Post.getByUsername(slug);
		allPosts = res.data.posts.reverse();
	};

	const followButtonHandler = async () => {
		if (followed) {
			await client.User.unFollowUser(slug);
			followed = false;
		} else {
			await client.User.followUser(slug);
			followed = true;
		}
	};

	const getFollowers = async () => {
		const res = await client.User.getFollowers(slug);
		users = res.data.users;
	};

	const getFollowing = async () => {
		const res = await client.User.getFollowing(slug);
		users = res.data.users;
	};

	const topTracker = () => {
		let element = document.getElementById('user-details');
		let atTop = element.getBoundingClientRect().top;
		if (atTop == 0 || atTop == 32) {
			userDetailsOnTop = true;
		} else {
			userDetailsOnTop = false;
		}
	};

	$: if (slug) {
		$page = 'profile';
		getProfileInfo();
		selectedTab = 'Posts';
	}

	$: if (selectedTab == 'Posts') {
		getPosts();
	} else if (selectedTab == 'Followers') {
		users = [];
		getFollowers();
	} else if (selectedTab == 'Following') {
		users = [];
		getFollowing();
	}

	onMount(async () => {
		window.addEventListener('scroll', topTracker);
	});

	onDestroy(() => {
		window.removeEventListener('scroll', topTracker);
	});
</script>

<div in:fade class="grid min-h-screen grid-cols-12">
	<ProfileEditModal bind:hide={editModalHide} bind:work bind:tagline />
	<div class="col-span-12 md:col-span-8">
		<div
			id="user-details"
			class="sticky top-8 z-10 mt-14 bg-white pt-6 md:top-0 md:mt-20
			{userDetailsOnTop ? 'navshadow' : ''}"
		>
			<div class="mx-auto w-full">
				<div class="flex w-full flex-row px-4 md:px-16">
					<Avatar src={image} alt={displayName || slug} size="l" />
					<div class="mb-2 ml-4 flex flex-col md:mt-2 md:ml-6">
						<div class="font-montserrat font-bold md:text-2xl">{displayName || slug}</div>
						<div class="font-base">{work ? work : WORK}</div>
						<div class="text-sm text-gray-500">
							{tagline ? tagline : TAGLINE}
						</div>

						<div class="mt-2 md:mt-4">
							{#if !editable}
								{#if followed}
									<button
										in:fade
										on:click={followButtonHandler}
										class="bg-color1 {profileButtonClass} follow-button"
									>
										<span></span>
									</button>
								{:else}
									<button in:fade on:click={followButtonHandler} class={profileButtonClass}>
										<span>Follow</span>
									</button>
								{/if}
								<button class={profileButtonClass}>
									<span>Send Message</span>
								</button>
							{:else}
								<button
									in:fade
									on:click={() => (editModalHide = !editModalHide)}
									class={profileButtonClass}
								>
									<span>Edit profile</span>
								</button>
							{/if}
						</div>
					</div>
				</div>
			</div>
			<div class="mt-2 bg-white px-4 text-sm md:px-16">
				<Tab items={tabs} bind:selectedItem={selectedTab} />
			</div>
		</div>

		{#if selectedTab == 'Followers' || selectedTab == 'Following'}
			<div in:fade class="grid grid-cols-2 px-4 pt-6 lg:grid-cols-3">
				{#each users as user}
					<UserCard bind:user />
				{/each}
			</div>
		{/if}

		{#if selectedTab == 'Posts'}
			{#if editable}
				<div class="mt-8">
					<PostBox />
				</div>
			{/if}

			<div class="mx-auto mt-4 grid">
				<div class="mx-auto">
					<Posts bind:allPosts bind:selectedTag />
				</div>
			</div>
		{/if}
	</div>
	<div class="col-span-4">
		<Tags bind:selectedTag />
	</div>
</div>

<div class="mt-20">
	<Footer />
</div>

<style>
	.navshadow {
		box-shadow: 0 4px 3px -3px rgba(184, 184, 184, 0.644);
	}

	.follow-button:hover span::after {
		content: 'Unfollow';
	}
	.follow-button span::after {
		content: 'Following';
	}
</style>
