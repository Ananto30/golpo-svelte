<script>
	import { fade } from 'svelte/transition';
	import { jwt, loggedUsername, loggedUserImage, error, isLoading } from '../store';
	import client from '../client';

	import TickSvg from '../svgs/TickSvg.svelte';
	import { onMount } from 'svelte';
	import GoogleSvg from '../svgs/GoogleSvg.svelte';

	let username = '';
	let password = '';
	let redirecting = false;
	let googleLoading = false;

	const generalLogin = async () => {
		try {
			const res = await client.Auth.login(username, password);
			$jwt = res.data.access_token;
			const user = await client.User.getMe();
			$loggedUsername = user.data.username;
		} catch (err) {
			if (err.response && err.response.data) {
				$error = err.response.data.errors;
			} else {
				$error = 'Something went wrong!';
			}
		}
	};

	const handleGetGoogleAuthUrl = async () => {
		googleLoading = true;
		try {
			const res = await client.Auth.getGoogleAuthUrl();
			window.location.href = res.data.auth_url;
		} catch (err) {
			googleLoading = false;
			if (err.response && err.response.data) {
				$error = err.response.data.errors;
			} else {
				$error = 'Something went wrong!';
			}
		}
	};

	const redirectToHome = async (code) => {
		try {
			const res = await client.Auth.getTokenByGoogleCode(code);
			$jwt = res.data.access_token;
			const user = await client.User.getMe();
			$loggedUsername = user.data.username;
			$loggedUserImage = user.data.image;
		} catch (err) {
			if (err.response && err.response.data) {
				$error = err.response.data.errors;
			} else {
				console.log(err);
				$error = 'Something went wrong!';
			}
		}
	};

	const searchParams = new URLSearchParams(window.location.search);

	if (searchParams.has('code')) {
		redirecting = true;
		const code = searchParams.get('code');
		redirectToHome(code);
		window.history.replaceState({}, document.title, '/');
	}

	onMount(() => {
		$isLoading = false;
	});
</script>

{#if redirecting}
	<div in:fade class="p-5 pt-16 md:p-20 md:pt-28">
		<h3 class="text-md text-center">Please wait a bit while we are talking with Google 😉</h3>
	</div>
{:else}
	<div class="flex min-h-screen flex-col gap-5 md:flex-row">
		<div class="my-auto max-w-3xl flex-1 p-6">
			<div class="mx-auto md:mx-0">
				<img alt="Charlie Brown with Snoopy" class="h-44" src="images/charliebrown.png" />
				<p class="mx-2 mb-2 text-xs text-gray-400">*Image is property of peanuts[r]</p>
				<h2 class="font-rubik text-6xl font-bold">Golpo</h2>
			</div>
			<p class="mt-10 max-w-2xl text-xl font-semibold text-gray-800">
				Golpo is a clutter free platform for sharing links. We support people and content makers to share their work and
				nothing more. Stay simple!
			</p>
			<div class="bg-dark1 mt-10 max-w-md rounded-2xl">
				<div class="font-rubik text-xl leading-tight font-bold md:text-2xl">Why Golpo?</div>
				<div class="mt-3 flex items-center gap-2 py-2 font-medium text-gray-700">
					<TickSvg />
					Clutter free
				</div>
				<div class="flex items-center gap-2 py-2 font-medium text-gray-700">
					<TickSvg />
					Ad free & focused
				</div>
				<div class="flex items-center gap-2 py-2 font-medium text-gray-700">
					<TickSvg />
					Promote your content
				</div>
				<div class="flex items-center gap-2 py-2 font-medium text-gray-700">
					<TickSvg />
					Follow creators and like minded people
				</div>
				<div class="flex items-center gap-2 py-2 font-medium text-gray-700">
					<TickSvg />
					Chat with them
				</div>
				<div class="flex items-center gap-2 py-2 font-medium text-gray-700">
					<TickSvg />
					And yes we love Charlie Brown!
				</div>
				<div class="flex items-center gap-2 py-2 text-gray-500">More features coming soon...</div>
			</div>
		</div>
		<div class="my-auto max-w-lg flex-1 p-6">
			<div class="bg-dark1 h-100 w-full rounded-3xl md:p-10">
				<h1 class="font-rubik text-xl leading-tight font-bold md:text-2xl">Join Us!</h1>

				<button
					on:click={handleGetGoogleAuthUrl}
					type="button"
					class="mt-6 mb-12 block w-full cursor-pointer border border-gray-400 bg-white px-4 py-3 font-semibold text-gray-900 transition duration-200 hover:bg-black hover:text-white"
					disabled={googleLoading}
				>
					<div class="flex items-center justify-center">
						{#if googleLoading}
							<svg class="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						{:else}
							<GoogleSvg />
							<span class="ml-4"> Login with Google</span>
						{/if}
					</div>
				</button>

				<div class="mt-6">
					<h3 class="font-rubik mb-4 text-xl font-medium">For internal users</h3>
					<div>
						<!-- <label for="username" class="block text-gray-700">Username</label> -->
						<input
							bind:value={username}
							type="text"
							name=""
							id="username"
							placeholder="Username"
							class="bg-light1 mt-2 w-full border-b px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
							required
						/>
					</div>

					<div class="mt-4">
						<!-- <label for="password" class="block text-gray-700">Password</label> -->
						<input
							bind:value={password}
							type="password"
							name=""
							id="password"
							placeholder="Enter Password"
							class="bg-light1 mt-2 w-full border-b px-4 py-3 focus:border-blue-500 focus:bg-white focus:outline-none"
							required
						/>
					</div>

					<button
						on:click={generalLogin}
						class="mt-8 block w-full border border-gray-400 bg-white px-4 py-3 font-semibold text-gray-900 transition duration-200 hover:bg-black hover:text-white"
						>Log In</button
					>
				</div>
				<!-- <p class="mt-8">
          Need an account?
          Login with google 👆
        </p> -->
			</div>
		</div>
	</div>
{/if}
