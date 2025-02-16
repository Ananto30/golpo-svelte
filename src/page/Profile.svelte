<script>
	import { fade } from 'svelte/transition';
	import { loggedUsername, page, isLoading } from '../store';
	import client from '../client';
	import { TAGLINE, WORK } from '../defaults';

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
	let selectedTag = '';
	let displayName = '';
	let users = [];
	let editModalHide = true;
	let user;

	const profileButtonClass =
		'flex-none px-3 py-1 text-sm transition ease-in-out text-white bg-black border border-transparent hover:bg-white hover:text-black hover:border-current focus-visible:ring cursor-pointer';

	let tabs = ['Posts', 'Followers', 'Following'];
	let selectedTab = 'Posts';

	$: if (slug == '' || slug == $loggedUsername) {
		editable = true;
		slug = $loggedUsername;
	}

	const getProfileInfo = async () => {
		const res = await client.User.getByUsername(slug);
		user = res.data;
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
</script>

<div class="grid min-h-screen grid-cols-12">
	{#if user}
		<ProfileEditModal bind:hide={editModalHide} {work} {tagline} />
		<div in:fade class="col-span-12 md:col-span-8">
			<div id="user-details" class="navshadow z-10 bg-white pt-14 md:sticky md:top-0 md:pt-8">
				<div class="mx-auto w-full">
					<div class="flex w-full flex-col gap-4 md:flex-row md:px-14">
						<div class="flex justify-center md:block">
							<Avatar src={image} alt={displayName || slug} size="l" />
						</div>
						<div class="mb-2 ml-4 flex flex-col md:mt-2 md:ml-6">
							<div class="font-rubik font-semibold md:text-xl">{displayName || slug}</div>
							<div class="mt-1 text-sm">{work || WORK}</div>
							<div class="mt-1 text-sm text-gray-500">
								{tagline || TAGLINE}
							</div>

							<div class="mt-2 md:mt-4">
								{#if !editable}
									{#if followed}
										<button
											in:fade
											on:click={followButtonHandler}
											class="bg-color1 {profileButtonClass} follow-button"
											aria-label="Unfollow"
										>
											<span>Unfollow</span>
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
									<button in:fade on:click={() => (editModalHide = !editModalHide)} class={profileButtonClass}>
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

				<div in:fade class="mx-auto mt-4 grid">
					<div class="mx-auto">
						<Posts bind:allPosts bind:selectedTag />
					</div>
				</div>
			{/if}
		</div>
	{:else}
		<div in:fade class="col-span-12 flex h-screen items-center justify-center md:col-span-8">
			<h3 class="text-md text-center">Loading...</h3>
		</div>
	{/if}
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
</style>
