<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let dots: string = '';
	let interval: number;

	onMount((): void => {
		interval = window.setInterval((): void => {
			dots = dots.length < 3 ? dots + '.' : '';
		}, 200);
	});

	onDestroy((): void => {
		clearInterval(interval);
	});
</script>

<div class="flex h-screen items-center justify-center">
	<div class="mx-auto w-40">
		Loading{dots}
	</div>
</div>
