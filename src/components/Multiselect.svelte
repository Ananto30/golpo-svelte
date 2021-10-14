<!-- copied from https://svelte.dev/repl/c7094fb1004b440482d2a88f4d1d7ef5?version=3.14.0 -->
<script>
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	export let id = "";
	export let value = [];
	export let readonly = false;
	export let placeholder = "";
	export let limit = 3;

	let input,
		inputValue,
		options = [],
		activeOption,
		showOptions = false,
		selected = {},
		first = true,
		slot;
	const iconClearPath =
		"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z";

	onMount(() => {
		slot.querySelectorAll("option").forEach((o) => {
			o.selected && !value.includes(o.value) && (value = [...value, o.value]);
			options = [...options, { value: o.value, name: o.textContent }];
		});
		value &&
			(selected = options.reduce((obj, op) => (value.includes(op.value) ? { ...obj, [op.value]: op } : obj), {}));
		first = false;
	});

	$: if (!first) value = Object.values(selected).map((o) => o.value);
	$: filtered = options.filter((o) => (inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o));
	$: if ((activeOption && !filtered.includes(activeOption)) || (!activeOption && inputValue))
		activeOption = filtered[0];

	function add(token) {
		if (value.length <= limit) {
			if (!readonly) selected[token.value] = token;
		}
	}

	function remove(value) {
		if (!readonly) {
			const { [value]: val, ...rest } = selected;
			selected = rest;
		}
	}

	function optionsVisibility(show) {
		if (readonly) return;
		if (typeof show === "boolean") {
			showOptions = show;
			show && input.focus();
		} else {
			showOptions = !showOptions;
		}
		if (!showOptions) {
			activeOption = undefined;
		}
	}

	function handleKeyup(e) {
		if (e.keyCode === 13) {
			Object.keys(selected).includes(activeOption.value) ? remove(activeOption.value) : add(activeOption);
			inputValue = "";
		}
		if ([38, 40].includes(e.keyCode)) {
			// up and down arrows
			const increment = e.keyCode === 38 ? -1 : 1;
			const calcIndex = filtered.indexOf(activeOption) + increment;
			activeOption =
				calcIndex < 0
					? filtered[filtered.length - 1]
					: calcIndex === filtered.length
					? filtered[0]
					: filtered[calcIndex];
		}
	}

	function handleBlur(e) {
		optionsVisibility(false);
	}

	function handleTokenClick(e) {
		if (e.target.closest(".token-remove")) {
			e.stopPropagation();
			remove(e.target.closest(".token").dataset.id);
		} else if (e.target.closest(".remove-all")) {
			selected = [];
			inputValue = "";
		} else {
			optionsVisibility(true);
		}
	}

	function handleOptionMousedown(e) {
		const value = e.target.dataset.value;
		if (selected[value]) {
			remove(value);
		} else {
			add(options.filter((o) => o.value === value)[0]);
			input.focus();
		}
	}
</script>

<div class="z-0 multiselect bg-white border-gray-300 relative" class:readonly>
	<div class="tokens flex items-center flex-wrap cursor-pointer" class:showOptions on:click={handleTokenClick}>
		{#each Object.values(selected) as s}
			<div
				class="token flex px-2 py-1 m-1 rounded-full border border-indigo-200 items-center text-sm hover:bg-indigo-100"
				data-id={s.value}>
				<span>{s.name}</span>
				{#if !readonly}
					<div class="token-remove rounded-full hover:bg-indigo-400 ml-1" title="Remove {s.name}">
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQ4jaXTvzJDQRQG8N/F1ShV0iAZnVBoVHqTjNfIjBmkUPjzBPIEvENu5QW8AIXRMWM0erUZUdwNa3MjMb5m9zvnO3t2zzmbqUaGDSwH/oJ7DFLhbMLncYhjLOAtaLbRxRLu8FGVdRF97I65FbRQBO1I5j7qvwQP0QjaPDZ2J2RO0cbRkGThxBgXqEW8FmwxihBrEyeJs4brsMb7GGdozmEFT4nzFR1cBd4JthiPqM/4HwaUTzhNHNM84RxNykIUibNntIi9RPNVRMqWtP5w9T0cxIZc2crGFMGVg8T3KLcnZP4xylkiyLGPHdwqWwVr2MINLvE+7oDYvo7VwJ/xoOI7fwJNxCuQl6lZRgAAAABJRU5ErkJggg==" />
					</div>
				{/if}
			</div>
		{/each}
		<div class="actions block">
			{#if !readonly}
				<input
					{id}
					autocomplete="off"
					bind:value={inputValue}
					bind:this={input}
					on:keyup={handleKeyup}
					on:blur={handleBlur}
					{placeholder} />
				<div
					class="remove-all rounded-full hover:bg-indigo-300 ml-1"
					title="Remove All"
					class:hidden={!Object.keys(selected).length}>
					<img
						src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAABBklEQVQ4jaXTvzJDQRQG8N/F1ShV0iAZnVBoVHqTjNfIjBmkUPjzBPIEvENu5QW8AIXRMWM0erUZUdwNa3MjMb5m9zvnO3t2zzmbqUaGDSwH/oJ7DFLhbMLncYhjLOAtaLbRxRLu8FGVdRF97I65FbRQBO1I5j7qvwQP0QjaPDZ2J2RO0cbRkGThxBgXqEW8FmwxihBrEyeJs4brsMb7GGdozmEFT4nzFR1cBd4JthiPqM/4HwaUTzhNHNM84RxNykIUibNntIi9RPNVRMqWtP5w9T0cxIZc2crGFMGVg8T3KLcnZP4xylkiyLGPHdwqWwVr2MINLvE+7oDYvo7VwJ/xoOI7fwJNxCuQl6lZRgAAAABJRU5ErkJggg==" />
				</div>
			{/if}
		</div>
	</div>

	<select bind:this={slot} type="multiple" class="hidden"><slot /></select>

	{#if showOptions}
		<ul
			class="options rounded-xl"
			transition:fly={{ duration: 200, y: 5 }}
			on:mousedown|preventDefault={handleOptionMousedown}>
			{#each filtered as option}
				<li
					class:selected={selected[option.value]}
					class:active={activeOption === option}
					data-value={option.value}>
					{option.name}
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.readonly .token {
		color: hsl(0, 0%, 40%);
	}

	.actions {
		align-items: center;
		display: flex;
		flex: 1;
		min-width: 15rem;
	}

	input {
		border: none;
		line-height: 1.5rem;
		margin: 0;
		outline: none;
		padding: 0;
		width: 100%;
	}

	.dropdown-arrow path {
		fill: hsl(0, 0%, 70%);
	}
	.multiselect:hover .dropdown-arrow path {
		fill: hsl(0, 0%, 50%);
	}

	.icon-clear path {
		fill: white;
	}

	.options {
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1), 0px -2px 4px rgba(0, 0, 0, 0.1);
		left: 0;
		list-style: none;
		margin-block-end: 0;
		margin-block-start: 0;
		max-height: 70vh;
		overflow: auto;
		padding-inline-start: 0;
		position: absolute;
		top: calc(100% + 1px);
		width: 100%;
	}
	li {
		background-color: white;
		cursor: pointer;
		padding: 0.5rem;
	}
	li:last-child {
		border-bottom-left-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
	}
	li:not(.selected):hover {
		background-color: hsl(214, 17%, 92%);
	}
	li.selected {
		background-color: rgb(68, 89, 224);
		color: white;
	}
	li.selected:nth-child(even) {
		background-color: hsl(232, 50%, 45%);
		color: white;
	}
	li.active {
		background-color: hsl(214, 17%, 88%);
	}
	li.selected.active,
	li.selected:hover {
		background-color: hsl(232, 48%, 50%);
	}

	.hidden {
		display: none;
	}
</style>
