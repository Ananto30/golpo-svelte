<script lang="ts">
	import { fly } from 'svelte/transition';

	export let name: string;
	export let message: string;

	type AlertType = {
		name: string;
		textColor: string;
		bgColor: string;
		borderColor: string;
	};

	let alertTypes: AlertType[] = [
		{
			name: 'error',
			textColor: 'text-red-600',
			bgColor: 'bg-red-100',
			borderColor: 'border-red-400'
		},
		{
			name: 'info',
			textColor: 'text-blue-600',
			bgColor: 'bg-blue-100',
			borderColor: 'border-blue-400'
		}
	];

	let alert: AlertType | undefined = alertTypes.find((e) => e.name === name);

	$: if (message) {
		setTimeout(() => {
			message = '';
		}, 5000);
	}
</script>

<div
	transition:fly={{ y: 200, duration: 500 }}
	class="fixed bottom-10 left-1/2 z-50 flex -translate-x-1/2 transform px-4 py-3"
>
	<div
		class="mx-auto flex items-center p-4 text-sm {alert?.textColor} {alert?.bgColor} {alert?.borderColor} rounded-lg border shadow-lg"
		role="alert"
	>
		<svg
			class="mr-3 h-6 w-6"
			fill="currentColor"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
				clip-rule="evenodd"
			>
			</path>
		</svg>
		<div>
			<strong class="font-bold">{name.charAt(0).toUpperCase() + name.slice(1)}:</strong>
			<span class="block sm:inline">{message}</span>
		</div>
	</div>
</div>
