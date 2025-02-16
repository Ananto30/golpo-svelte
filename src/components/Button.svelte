<script lang="ts">
	const root: HTMLElement = document.documentElement;

	document.addEventListener('mousedown', (ev: MouseEvent) => {
		const el = ev.target as HTMLElement;
		const x = (ev.clientX - el.offsetLeft) / el.offsetWidth;
		const y = (ev.clientY - el.offsetTop) / el.offsetHeight;

		root.style.setProperty('--ripple-x', x.toString());
		root.style.setProperty('--ripple-y', y.toString());
	});
</script>

<button>
	<span>Click Me!</span>
</button>

<style>
	button {
		border: none;
		outline: none;
		background-color: #8334eb;
		color: white;
		padding: 10px 20px;
		border-radius: 5px;
		box-shadow: 0 2px 2px grey;
		position: relative;
		overflow: hidden;
	}
	button:active {
		background-color: #8334eb;
	}
	button:before {
		content: '';
		position: absolute;
		background-color: white;
		padding: 50%;
		border-radius: 50%;
		left: calc(100% * var(--ripple-x));
		top: calc(100% * var(--ripple-y));
		transform: translate(-50%, -50%) scale(1);
		opacity: 0;
		transition:
			transform 1s,
			opacity 1s;
	}
	button:active::before {
		transition: 0s;
		opacity: 1;
		transform: translate(-50%, -50%) scale(0);
	}
</style>
