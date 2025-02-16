<script lang="ts">
	import client from '../client';

	export let hide: boolean;
	export let recipient;

	let message = '';

	const sendMessage = async () => {
		if (message.trim() === '') return;
		await client.Chat.sendMessage(recipient, message);
		hide = true;
		message = '';
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
				<h3 class="text-lg font-semibold text-gray-900" id="modal-title">Send Message</h3>
				<div class="mt-4 text-sm">
					<textarea
						bind:value={message}
						placeholder="Type your message here..."
						class="mt-2 w-full border-b py-3 focus:border-black focus:outline-none"
					></textarea>
				</div>
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					on:click={sendMessage}
					type="button"
					class="inline-flex w-full justify-center border border-transparent bg-black px-4 py-2 text-base font-medium text-white transition duration-200 hover:cursor-pointer hover:border-current hover:bg-white hover:text-black focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
				>
					Send
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
