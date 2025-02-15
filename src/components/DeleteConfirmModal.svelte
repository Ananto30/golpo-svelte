<script context="module">
	import { writable } from 'svelte/store';

	const visible = writable(false);

	export const modal = {
		open() {
			visible.set(true);
		},
		close() {
			visible.set(false);
		}
	};
</script>

<script>
	export let onConfirm = () => void 0;
	export let closeAfterConfirm = true;
	export let title = 'Delete';
	export let description = 'Are you sure?';
	export let confirmText = 'Yes';
	export let cancelText = 'No';

	const handleConfirm = () => {
		onConfirm();
		closeAfterConfirm && modal.close();
	};
</script>

{#if $visible}
	<div class="fixed inset-0 z-50 overflow-y-auto">
		<div
			class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<div
				class="bg-opacity-75 absolute inset-0 bg-white transition-opacity"
				on:click={modal.close}
			></div>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle"></span>​
			<div
				class="relative inline-block w-full overflow-hidden border border-gray-400 bg-white text-left align-bottom sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
			>
				<div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
					<div class="sm:flex sm:items-start">
						<div class="w-full text-center sm:text-left">
							<h3 class="text-2xl leading-6 font-semibold text-gray-900" id="modal-title">
								{title}
							</h3>
							<div class="mt-4">
								{description}
							</div>
						</div>
					</div>
				</div>
				<div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
					<button
						type="button"
						class="inline-flex w-full justify-center border border-transparent bg-black px-4 py-2 text-base font-medium text-white transition duration-200 hover:border-current hover:bg-white hover:text-black focus:outline-none focus-visible:ring sm:ml-3 sm:w-auto sm:text-sm"
						on:click={handleConfirm}>{confirmText}</button
					>
					<button
						type="button"
						class="active:bg-dark2 mt-3 inline-flex w-full justify-center bg-transparent px-4 py-2 text-base font-medium text-gray-600 transition duration-200 hover:underline focus:outline-none focus-visible:ring sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						on:click={modal.close}>{cancelText}</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}
