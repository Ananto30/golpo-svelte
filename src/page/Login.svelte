<script>
	import { fade } from "svelte/transition";
</script>

<div in:fade class=" flex">
	<div
		class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center">
		<div class="w-full h-100 bg-gray-100 px-10 pb-10 rounded-3xl">
			<img class=" h-32 mx-auto mt-6" src="images/charliebrown.png" />
			<h1 class="text-xl md:text-2xl font-bold leading-tight mt-4">Log in to Golpo</h1>

			<form class="mt-6" action="#" method="POST">
				<div>
					<label class="block text-gray-700">Email Address</label>
					<input
						type="email"
						name=""
						id=""
						placeholder="Enter Email Address"
						class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
						autofocus
						autocomplete
						required />
				</div>

				<div class="mt-4">
					<label class="block text-gray-700">Password</label>
					<input
						type="password"
						name=""
						id=""
						placeholder="Enter Password"
						minlength="6"
						class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
          focus:bg-white focus:outline-none"
						required />
				</div>

				<!-- <div class="text-right mt-2">
					<a href="#" class="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
						>Forgot Password?</a>
				</div> -->

				<button
					type="submit"
					class="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
        px-4 py-3 mt-6">Log In</button>
			</form>

			<hr class="my-6 border-gray-300 w-full" />

			<button
				type="button"
				class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
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
