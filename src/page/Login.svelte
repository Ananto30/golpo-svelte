<script>
	import { fade } from "svelte/transition";
	import { jwt, loggedUsername, loggedUserImage, error } from "../store";
	import client from "../client";

	let username = "";
	let password = "";
	let redirecting = false;

	const searchParams = new URLSearchParams(window.location.search);

	const getUserInfo = (code) => {
		client.Auth.getTokenByGoogleCode(code).then((res) => {
			$jwt = res.data.access_token;
			client.User.getMe().then((res) => {
				$loggedUsername = res.data.username;
				$loggedUserImage = res.data.image;
				window.history.replaceState({}, document.title, "/");
			});
		});
	};

	if (searchParams.has("code")) {
		redirecting = true;
		const code = searchParams.get("code");
		getUserInfo(code);
	}

	const generalLogin = () => {
		client.Auth.login(username, password)
			.then((res) => {
				$jwt = res.data.access_token;
				client.User.getMe().then((res) => {
					$loggedUsername = res.data.username;
				});
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					$error = err.response.data.error;
				}
			});
	};

	const handleGetGoogleAuthUrl = () => {
		client.Auth.getGoogleAuthUrl().then((res) => {
			window.location.href = res.data.auth_url;
		});
	};
</script>

{#if redirecting}
	<div class="p-5 pt-16 md:p-20 md:pt-28 ">
		<h3 class="text-center text-md">Please wait a bit while we are talking with Google 😉</h3>
	</div>
{:else}
	<div class="grid gap-5 grid-cols-5 h-screen">
		<div class="col-span-5 md:col-span-3 p-10 grid my-auto">
			<img alt="Charlie Brown with Snoopy" class="h-44" src="images/charliebrown.png" />
			<h2 class="text-6xl font-extrabold text-indigo-500">Golpo</h2>
			<p class="mt-10 text-xl font-medium text-gray-700 max-w-2xl">
				Golpo is a clutter free platform for sharing links. We support people and content makers to share their
				work and nothing more. Stay simple!
			</p>
			<div class="p-10 border shadow-sm rounded-2xl mt-10 max-w-md">
				<div class="text-xl md:text-2xl font-bold leading-tight">Why Golpo?</div>
				<div class="mt-3 text-gray-700 py-2">✔️ Clutter free</div>
				<div class="text-gray-700 py-2">✔️ Ad free & focused</div>
				<div class="text-gray-700 py-2">✔️ Promote your content</div>
				<div class="text-gray-700 py-2">✔️ Follow creators and like minded people</div>
				<div class="text-gray-700 py-2">✔️ Chat with them</div>
			</div>
		</div>
		<div class="col-span-5 md:col-span-2 grid my-auto p-10">
			<div class="w-full h-100 border shadow-sm p-10 rounded-3xl">
				<h1 class="text-xl md:text-2xl font-bold leading-tight">Join Us!</h1>
				<div class="mt-6">
					<div>
						<label for="username" class="block text-gray-700">Username</label>
						<input
							bind:value={username}
							type="text"
							name=""
							id="username"
							placeholder="Enter Username"
							class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
							autocomplete
							required />
					</div>

					<div class="mt-4">
						<label for="password" class="block text-gray-700">Password</label>
						<input
							bind:value={password}
							type="password"
							name=""
							id="password"
							placeholder="Enter Password"
							class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
							required />
					</div>

					<button
						on:click={generalLogin}
						class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
						>Log In</button>
				</div>

				<hr class="my-6 border-gray-300 w-full" />

				<button
					on:click={handleGetGoogleAuthUrl}
					type="button"
					class="w-full block bg-white hover:bg-indigo-100 focus:bg-indigo-200 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
					<div class="flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							class="w-6 h-6"
							viewBox="0 0 48 48"
							><defs
								><path
									id="a"
									d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs
							><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath><path
								clip-path="url(#b)"
								fill="#FBBC05"
								d="M0 37V11l17 13z" /><path
								clip-path="url(#b)"
								fill="#EA4335"
								d="M0 11l17 13 7-6.1L48 14V0H0z" /><path
								clip-path="url(#b)"
								fill="#34A853"
								d="M0 37l30-23 7.9 1L48 0v48H0z" /><path
								clip-path="url(#b)"
								fill="#4285F4"
								d="M48 48L17 24l-4-3 35-10z" /></svg>
						<span class="ml-4"> Log in with Google</span>
					</div>
				</button>

				<p class="mt-8">
					Need an account?
					<!-- <a href="#" class="text-blue-500 hover:text-blue-700 font-semibold"
				>Create an account</a> -->
					Login with google 👆
				</p>
			</div>
		</div>
	</div>
{/if}
