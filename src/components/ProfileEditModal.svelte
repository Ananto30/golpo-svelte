<script lang="ts">
	import client from '../client';

	export let hide: boolean;
	export let work: string;
	export let tagline: string;

	let updatedWork: string = work;
	let updatedTagline: string = tagline;

	const updateProfile = async (): Promise<void> => {
		await client.User.updateMeta({
			work: updatedWork,
			tagline: updatedTagline
		});
		hide = true;
		work = updatedWork;
		tagline = updatedTagline;
	};
</script>

<div
	class="{hide ? 'hidden' : 'fixed'} inset-0 z-50 overflow-y-auto"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
	>
		<div class="bg-opacity-75 fixed inset-0 bg-white transition-opacity" aria-hidden="true"></div>
		<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
			>&#8203;</span
		>
		<div
			class="inline-block w-full transform overflow-hidden border border-gray-400 bg-white text-left align-bottom transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
		>
			<div class="bg-dark2 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<h3 class="text-lg font-semibold text-gray-900" id="modal-title">
					Update profile information
				</h3>
				<div class="mt-4 text-sm">
					<input
						bind:value={updatedWork}
						type="text"
						id="work"
						placeholder="Work/Education"
						class="mt-2 w-full border-b py-3 focus:border-black focus:outline-none"
					/>
					<input
						bind:value={updatedTagline}
						type="text"
						id="tagline"
						placeholder="About/Tagline"
						class="mt-2 w-full border-b py-3 focus:border-black focus:outline-none"
					/>
				</div>
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					on:click={updateProfile}
					type="button"
					class="inline-flex w-full justify-center border border-transparent bg-black px-4 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:border-current hover:bg-white hover:text-black focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
				>
					Save
				</button>
				<button
					on:click={() => (hide = true)}
					type="button"
					class="mt-3 inline-flex w-full justify-center bg-transparent px-4 py-2 text-base font-medium text-gray-600 transition duration-200 hover:cursor-pointer hover:underline focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</div>
