<script>
	import { fly } from 'svelte/transition';

	export let name;
	export let message;

	let alertTypes = [
		{
			name: 'error',
			textColor: 'text-red-600'
		},
		{
			name: 'info',
			textColor: 'text-black'
		}
	];

	let alert = alertTypes.find((e) => e.name === name);

	$: if (message) {
		setTimeout(() => {
			message = '';
		}, 5000);
	}
</script>

<div in:fly={{ x: 200, duration: 500 }} class="insert-x-0 fixed top-20 right-0 z-50 flex px-2 md:top-10 md:right-20">
	<div class="mx-auto flex p-2 text-sm {alert.textColor} border border-gray-400 bg-white" role="alert">
		<svg class="mr-2 inline h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
			<path
				fill-rule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
				clip-rule="evenodd"
			>
			</path>
		</svg>
		<div>
			{message}
		</div>
	</div>
</div>
