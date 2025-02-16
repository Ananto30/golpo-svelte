<script>
	import { loggedUsername, jwt, page } from '../store';
	import client from '../client';
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	import Svg from '../components/Svg.svelte';

	let sideBarVisible = true;
	let hasNotification = false;
	let shouldBorder = false;
	let navItems = [
		{
			name: 'Home',
			href: '#/home',
			icon: 'home'
		},
		{
			name: 'Profile',
			href: '#/profile/' + $loggedUsername,
			icon: 'user'
		},
		{
			name: 'Notification',
			href: '#/notification',
			icon: 'bell'
		},
		{
			name: 'Chat',
			href: '#/chat',
			icon: 'chat'
		},
		{
			name: 'Bookmarks',
			href: '#/bookmarks',
			icon: 'bookmark'
		},
		{
			name: 'Users',
			href: '#/users',
			icon: 'users'
		}
	];

	const navButtonClass =
		'flex items-center gap-2 -ml-4 mr-4 transition ease-in-out cursor-pointer rounded-lg p-4 hover:bg-gray-200 w-full font-medium font-poppins';

	const logout = () => {
		$loggedUsername = '';
		$jwt = null;
	};

	const toggleSideBar = () => {
		sideBarVisible = !sideBarVisible;
	};

	const hasNotificationCall = async () => {
		const res = await client.Notification.hasUnclickedNotification();
		if (res.data.hasUnclickedNotification) return true;
		return false;
	};

	const navBorderTracker = () => {
		const top = document.documentElement.scrollTop || document.body.scrollTop;
		if (top != 0) {
			shouldBorder = true;
		} else {
			shouldBorder = false;
		}
	};

	onMount(async () => {
		window.addEventListener('scroll', navBorderTracker);
		hasNotification = await hasNotificationCall();
	});
</script>

<div in:fade class="sticky top-0 z-20 w-full md:min-h-screen md:w-auto">
	<!-- mobile menu bar -->
	<div class="{shouldBorder ? 'border-b-2' : ''} fixed z-50 flex w-full justify-between bg-white md:hidden md:w-auto">
		<!-- logo -->
		<a href="#/home" class="font-rubik my-auto block px-4 py-2 text-2xl font-bold">Golpo</a>

		<!-- mobile menu button -->
		<button on:click={toggleSideBar} class="p-4 focus:outline-none active:bg-gray-100">
			<div class="my-auto flex">
				<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
				{#if hasNotification}
					<span class="relative inline-block h-2">
						<span class="flex h-2 w-2">
							<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
							<span class="relative inline-flex h-2 w-2 rounded-full bg-black"></span>
						</span>
					</span>
				{/if}
			</div>
		</button>
	</div>

	<!-- sidebar -->
	<div
		class="{sideBarVisible ? '-translate-x-full' : 'shadow-lg'} 
			fixed inset-y-0 left-0 z-30 w-2/4 transform space-y-6 bg-white px-4 py-4 transition duration-200 ease-in-out md:relative md:translate-x-0 md:py-8 md:shadow-none"
	>
		<!-- logo -->
		<a href="#/home" class="flex items-center space-x-2">
			<span class="font-rubik text-3xl font-bold">Golpo</span>
		</a>

		<!-- nav -->
		<nav class="text-md grid w-full gap-2">
			{#each navItems as item}
				<div class="flex w-full">
					<a
						on:click={toggleSideBar}
						class="{navButtonClass} 
						{$page == item.name.toLowerCase() ? 'bg-gray-200' : ''}"
						href={item.href}
					>
						<div class={item.name == 'Notification' && hasNotification ? 'animate-wiggle' : ''}>
							<Svg name={item.icon} height="24" width="24" />
						</div>
						{item.name}
						{#if item.name == 'Notification' && hasNotification}
							<span class="relative -mt-4 -ml-2 inline-block">
								<span class="flex h-2 w-2">
									<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
									<span class="relative inline-flex h-2 w-2 rounded-full bg-black"></span>
								</span>
							</span>
						{/if}
					</a>
				</div>
			{/each}
			<div class="flex">
				<button on:click={toggleSideBar} on:click={logout} class={navButtonClass}>
					<Svg name="logout" height="24" width="24" />
					Logout
				</button>
			</div>
		</nav>

		<div class="text-xs lg:w-40">
			<a class="cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte"> GitHub </a>
			•
			<a class="cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte/labels/bug">
				Report Bug
			</a>
			•
			<a
				class="cursor-pointer hover:underline"
				href="https://github.com/Ananto30/golpo-express/discussions/categories/request-feature"
			>
				Request Feature
			</a>
			•
			<a class="cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte"> Policy </a>
		</div>
	</div>
</div>

<style>
	.navshadow {
		box-shadow: 0 4px 3px -3px rgba(184, 184, 184, 0.644);
	}
</style>
