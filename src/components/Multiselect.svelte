<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { error } from '../store';
	import Svg from '../components/Svg.svelte';
	import { getTagSvgName } from '../helpers';

	export let id: string = '';
	export let value: string[] = [];
	export let readonly: boolean = false;
	export let placeholder: string = '';
	export let limit: number = 3;

	let input: HTMLInputElement;
	let inputValue: string = '';
	let options: { value: string; name: string }[] = [];
	let activeOption: { value: string; name: string } | undefined;
	let showOptions: boolean = false;
	let selected: { [key: string]: { value: string; name: string } } = {};
	let first: boolean = true;
	let slot: HTMLSelectElement;

	onMount(() => {
		slot.querySelectorAll('option').forEach((o: HTMLOptionElement) => {
			options = [...options, { value: o.value, name: o.textContent || '' }];
		});
	});

	$: if (selected) value = Object.values(selected).map((o) => o.value);
	$: filtered = options.filter((o) =>
		inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o
	);
	$: if ((activeOption && !filtered.includes(activeOption)) || (!activeOption && inputValue))
		activeOption = filtered[0];

	function add(token: { value: string; name: string }) {
		if (Object.values(selected).length < limit) {
			if (!readonly) selected[token.value] = token;
		} else {
			$error = 'You can put at most 3 tags!';
		}
	}

	function remove(value: string) {
		if (!readonly) {
			const { [value]: val, ...rest } = selected;
			selected = rest;
		}
	}

	function optionsVisibility(show: boolean | undefined) {
		if (readonly) return;
		if (typeof show === 'boolean') {
			showOptions = show;
			show && input.focus();
		} else {
			showOptions = !showOptions;
		}
		if (!showOptions) {
			activeOption = undefined;
		}
	}

	function handleKeyup(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			Object.keys(selected).includes(activeOption?.value || '')
				? remove(activeOption?.value || '')
				: add(activeOption!);
			inputValue = '';
		}
		if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
			const increment = e.key === 'ArrowUp' ? -1 : 1;
			const calcIndex = filtered.indexOf(activeOption!) + increment;
			activeOption =
				calcIndex < 0
					? filtered[filtered.length - 1]
					: calcIndex === filtered.length
						? filtered[0]
						: filtered[calcIndex];
		}
	}

	function handleBlur(e: FocusEvent) {
		optionsVisibility(false);
	}

	function handleTokenClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target.closest('.token-remove')) {
			e.stopPropagation();
			remove((target.closest('.token') as HTMLElement)!.dataset.id!);
		} else if (target.closest('.remove-all')) {
			selected = {};
			inputValue = '';
		} else {
			optionsVisibility(true);
		}
	}

	function handleOptionMousedown(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const value = target.dataset.value!;
		if (selected[value]) {
			remove(value);
		} else {
			add(options.filter((o) => o.value === value)[0]);
			input.focus();
		}
	}
</script>

<div class="multiselect relative z-0 w-full px-4" class:readonly>
	<button
		class="tokens flex cursor-pointer flex-wrap items-center"
		class:showOptions
		on:click={handleTokenClick}
	>
		{#each Object.values(selected) as s}
			<div class="token m-1 flex items-center rounded-full px-1 py-1 text-sm" data-id={s.value}>
				<span
					><span class="flex items-center gap-1">
						<Svg name={getTagSvgName(s.name)} height="16" width="16" />{s.name}</span
					></span
				>
				{#if !readonly}
					<div class="token-remove hover:bg-yellow ml-1 rounded-full" title="Remove {s.name}">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="16"
							height="16"
							viewBox="0 0 16 16"
							style=" fill:#000000;"
							><path
								d="M 7.5 1 C 3.917969 1 1 3.917969 1 7.5 C 1 11.082031 3.917969 14 7.5 14 C 11.082031 14 14 11.082031 14 7.5 C 14 3.917969 11.082031 1 7.5 1 Z M 7.5 2 C 10.542969 2 13 4.457031 13 7.5 C 13 10.542969 10.542969 13 7.5 13 C 4.457031 13 2 10.542969 2 7.5 C 2 4.457031 4.457031 2 7.5 2 Z M 5.5 4.792969 L 4.792969 5.5 L 5.148438 5.851563 L 6.792969 7.5 L 5.148438 9.148438 L 4.792969 9.5 L 5.5 10.207031 L 5.851563 9.851563 L 7.5 8.207031 L 9.148438 9.851563 L 9.5 10.207031 L 10.207031 9.5 L 9.851563 9.148438 L 8.207031 7.5 L 9.851563 5.851563 L 10.207031 5.5 L 9.5 4.792969 L 9.148438 5.148438 L 7.5 6.792969 L 5.851563 5.148438 Z"
							></path>
						</svg>
					</div>
				{/if}
			</div>
		{/each}
		<div class="actions flex flex-1 items-center">
			{#if !readonly}
				<input
					class="h-8 w-full bg-white text-sm outline-none"
					{id}
					autocomplete="off"
					bind:value={inputValue}
					bind:this={input}
					on:keyup={handleKeyup}
					on:blur={handleBlur}
					{placeholder}
				/>
				<div
					class="remove-all hover:bg-yellow ml-1 rounded-full"
					title="Remove All"
					class:hidden={!Object.keys(selected).length}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="16"
						height="16"
						viewBox="0 0 16 16"
						style=" fill:#000000;"
						><path
							d="M 7.5 1 C 3.917969 1 1 3.917969 1 7.5 C 1 11.082031 3.917969 14 7.5 14 C 11.082031 14 14 11.082031 14 7.5 C 14 3.917969 11.082031 1 7.5 1 Z M 7.5 2 C 10.542969 2 13 4.457031 13 7.5 C 13 10.542969 10.542969 13 7.5 13 C 4.457031 13 2 10.542969 2 7.5 C 2 4.457031 4.457031 2 7.5 2 Z M 5.5 4.792969 L 4.792969 5.5 L 5.148438 5.851563 L 6.792969 7.5 L 5.148438 9.148438 L 4.792969 9.5 L 5.5 10.207031 L 5.851563 9.851563 L 7.5 8.207031 L 9.148438 9.851563 L 9.5 10.207031 L 10.207031 9.5 L 9.851563 9.148438 L 8.207031 7.5 L 9.851563 5.851563 L 10.207031 5.5 L 9.5 4.792969 L 9.148438 5.148438 L 7.5 6.792969 L 5.851563 5.148438 Z"
						></path>
					</svg>
				</div>
			{/if}
		</div>
	</button>

	<select bind:this={slot} class="bg-dark1 hidden"><slot /></select>

	{#if showOptions}
		<button
			class="options"
			transition:fly={{ duration: 200, y: 5 }}
			on:mousedown|preventDefault={handleOptionMousedown}
		>
			{#each filtered as option}
				<li
					class:selected={selected[option.value]}
					class:active={activeOption === option}
					data-value={option.value}
				>
					<span class="flex items-center gap-1" data-value={option.value}>
						<Svg name={getTagSvgName(option.name)} height="16" width="16" />{option.name}</span
					>
				</li>
			{/each}
		</button>
	{/if}
</div>

<style>
	.readonly .token {
		color: hsl(0, 0%, 40%);
	}

	.options {
		box-shadow:
			0px 2px 4px rgba(0, 0, 0, 0.1),
			0px -2px 4px rgba(0, 0, 0, 0.1);
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
		background-color: #fff;
		cursor: pointer;
		padding: 0.5rem;
	}
	li:last-child {
		border-bottom-left-radius: 0.2rem;
		border-bottom-right-radius: 0.2rem;
	}
	li:not(.selected):hover {
		background-color: rgba(243, 244, 246);
	}
	li.selected {
		background-color: rgba(243, 244, 246);
	}
	li.selected:nth-child(even) {
		background-color: rgba(229, 231, 235);
	}
	li.active {
		background-color: hsl(214, 17%, 88%);
	}
	li.selected.active,
	li.selected:hover {
		background-color: rgba(209, 213, 219);
	}

	.hidden {
		display: none;
	}
</style>
