<script>
	import client from '../client';

	export let hide;
	export let work;
	export let tagline;

	let updatedWork;
	let updatedTagline;

	const updateProfile = async () => {
		const res = await client.User.updateMeta({
			work: updatedWork,
			tagline: updatedTagline
		});
		hide = true;
		work = updatedWork;
		tagline = updatedTagline;
	};
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
	class="{hide ? 'hidden' : 'fixed'} inset-0 z-50 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
	>
		<!--
        Background overlay, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
		<div class="bg-opacity-75 fixed inset-0 bg-white transition-opacity" aria-hidden="true"></div>

		<!-- This element is to trick the browser into centering the modal contents. -->
		<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
			>&#8203;</span
		>

		<!--
        Modal panel, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
		<div
			class="inline-block w-full transform overflow-hidden border border-gray-400 bg-white text-left align-bottom transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
		>
			<div class="bg-dark2 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div class="w-full text-center sm:text-left md:m-4">
						<h3 class="text-lg leading-6 font-semibold text-gray-900" id="modal-title">
							Update profile information
						</h3>
						<div class="mt-4 text-sm">
							<!-- <label for="username" class="block text-gray-700">Work/Education</label> -->
							<input
								bind:value={updatedWork}
								type="text"
								name=""
								id="work"
								placeholder="Work/Education"
								class="mt-2 w-full border-b py-3 focus:border-black focus:outline-none"
							/>
							<!-- <label for="tagline" class="block mt-2 text-gray-700">About/Tagline</label> -->
							<input
								bind:value={updatedTagline}
								type="text"
								name=""
								id="tagline"
								placeholder="About/Tagline"
								class="mt-2 w-full border-b py-3 focus:border-black focus:outline-none"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					on:click={updateProfile}
					type="button"
					class="inline-flex w-full justify-center border border-transparent bg-black px-4 py-2 text-base font-medium text-white transition duration-200 hover:border-current hover:bg-white hover:text-black focus:outline-none focus-visible:ring sm:ml-3 sm:w-auto sm:text-sm"
				>
					Save
				</button>
				<button
					on:click={() => (hide = true)}
					type="button"
					class="active:bg-dark2 mt-3 inline-flex w-full justify-center bg-transparent px-4 py-2 text-base font-medium text-gray-600 transition duration-200 hover:underline focus:outline-none focus-visible:ring sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</div>
