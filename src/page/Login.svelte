<script>
  import { fade } from "svelte/transition";
  import { jwt, loggedUsername, loggedUserImage, error } from "../store";
  import client from "../client";

  import TickSvg from "../svgs/TickSvg.svelte";

  let username = "";
  let password = "";
  let redirecting = false;

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
        $error = "Something went wrong!";
      }
    }
  };

  const handleGetGoogleAuthUrl = async () => {
    try {
      const res = await client.Auth.getGoogleAuthUrl();
      window.location.href = res.data.auth_url;
    } catch (err) {
      if (err.response && err.response.data) {
        $error = err.response.data.errors;
      } else {
        $error = "Something went wrong!";
      }
    }
  };

  const redirectToHome = async code => {
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
        $error = "Something went wrong!";
      }
    }
  };

  const searchParams = new URLSearchParams(window.location.search);

  if (searchParams.has("code")) {
    redirecting = true;
    const code = searchParams.get("code");
    redirectToHome(code);
    window.history.replaceState({}, document.title, "/");
  }
</script>

{#if redirecting}
  <div in:fade class="p-5 pt-16 md:p-20 md:pt-28">
    <h3 class="text-center text-md">Please wait a bit while we are talking with Google 😉</h3>
  </div>
{:else}
  <div class="grid h-screen grid-cols-5 gap-5">
    <div class="grid col-span-5 p-10 my-auto md:col-span-3">
      <img alt="Charlie Brown with Snoopy" class="h-44" src="images/charliebrown.png" />
      <h2 class="text-6xl font-extrabold text-light2">Golpo</h2>
      <p class="max-w-2xl mt-10 text-xl font-medium text-gray-700">
        Golpo is a clutter free platform for sharing links. We support people and content makers to share their work and
        nothing more. Stay simple!
      </p>
      <div class="max-w-md p-4 mt-10 shadow-sm bg-dark1 md:p-10 rounded-2xl">
        <div class="text-xl font-bold leading-tight md:text-2xl">Why Golpo?</div>
        <div class="flex items-center gap-2 py-2 mt-3 text-gray-700">
          <TickSvg />
          Clutter free
        </div>
        <div class="flex items-center gap-2 py-2 text-gray-700">
          <TickSvg />
          Ad free & focused
        </div>
        <div class="flex items-center gap-2 py-2 text-gray-700">
          <TickSvg />
          Promote your content
        </div>
        <div class="flex items-center gap-2 py-2 text-gray-700">
          <TickSvg />
          Follow creators and like minded people
        </div>
        <div class="flex items-center gap-2 py-2 text-gray-700">
          <TickSvg />
          Chat with them
        </div>
        <div class="flex items-center gap-2 py-2 text-gray-500">More features coming soon...</div>
      </div>
    </div>
    <div class="grid col-span-5 p-10 my-auto md:col-span-2">
      <div class="w-full p-10 shadow-sm bg-dark1 h-100 rounded-3xl ">
        <h1 class="text-xl font-bold leading-tight md:text-2xl">Join Us!</h1>
        <div class="mt-6">
          <div>
            <label for="username" class="block text-gray-700">Username</label>
            <input
              bind:value="{username}"
              type="text"
              name=""
              id="username"
              placeholder="Enter Username"
              class="w-full px-4 py-3 mt-2 rounded-lg bg-light1 focus:border-blue-500 focus:bg-white focus:outline-none text-dark1"
              autocomplete
              required
            />
          </div>

          <div class="mt-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input
              bind:value="{password}"
              type="password"
              name=""
              id="password"
              placeholder="Enter Password"
              class="w-full px-4 py-3 mt-2 rounded-lg bg-light1 focus:border-blue-500 focus:bg-white focus:outline-none text-dark1"
              required
            />
          </div>

          <button
            on:click="{generalLogin}"
            class="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-200 rounded-lg bg-color1 hover:bg-light2 hover:text-dark1 focus:bg-indigo-400"
            >Log In</button
          >
        </div>

        <hr class="w-full my-6 border-gray-300" />

        <button
          on:click="{handleGetGoogleAuthUrl}"
          type="button"
          class="block w-full px-4 py-3 font-semibold text-gray-900 transition duration-200 bg-white rounded-lg bg-color1 hover:bg-light2 hover:text-dark1 focus:bg-indigo-200"
        >
          <div class="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="w-6 h-6"
              viewBox="0 0 48 48"
              ><defs
                ><path
                  id="a"
                  d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                ></path></defs
              ><clipPath id="b"><use xlink:href="#a" overflow="visible"></use></clipPath><path
                clip-path="url(#b)"
                fill="#FBBC05"
                d="M0 37V11l17 13z"></path><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"
              ></path><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"></path><path
                clip-path="url(#b)"
                fill="#4285F4"
                d="M48 48L17 24l-4-3 35-10z"></path></svg
            >
            <span class="ml-4"> Log in with Google</span>
          </div>
        </button>

        <p class="mt-8">
          Need an account?
          <!-- <a href="#" class="font-semibold text-blue-500 hover:text-blue-700"
				>Create an account</a> -->
          Login with google 👆
        </p>
      </div>
    </div>
  </div>
{/if}
