<script>
	import { fly } from "svelte/transition";
	import { info } from "../store.js";

	let hide = false;

	$: if ($info) {
		console.log("mama");
		hide = false;
		setTimeout(() => {
			hide = true;
			$info = "";
		}, 3000);
	}
</script>

<div class="fixed z-50 px-2 mx-auto top-10">
  <div
    in:fly="{{ y: -200, duration: 500 }}"
    class="{hide ? 'hidden' : 'flex'}  bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700"
    role="alert"
  >
    <svg class="inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"
      ><path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clip-rule="evenodd"></path></svg
    >
    <div>
      {$info}
    </div>
  </div>
</div>
