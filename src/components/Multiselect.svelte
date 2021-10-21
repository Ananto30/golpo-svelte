<style>
  .readonly .token {
    color: hsl(0, 0%, 40%);
  }

  .multiselect:hover .dropdown-arrow path {
    fill: hsl(0, 0%, 50%);
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
    background-color: #292b2f;
    cursor: pointer;
    padding: 0.5rem;
  }
  li:last-child {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
  li:not(.selected):hover {
    background-color: #36393f;
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

<!-- copied from https://svelte.dev/repl/c7094fb1004b440482d2a88f4d1d7ef5?version=3.14.0 -->
<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  export let id = "";
  export let value = [];
  export let readonly = false;
  export let placeholder = "";
  export let limit = 3;
  import { error } from "../store";

  let input,
    inputValue,
    options = [],
    activeOption,
    showOptions = false,
    selected = {},
    first = true,
    slot;

  onMount(() => {
    slot.querySelectorAll("option").forEach(o => {
      // o.selected && !value.includes(o.value) && (value = [...value, o.value]);
      options = [...options, { value: o.value, name: o.textContent }];
    });
    // value &&
    //   (selected = options.reduce((obj, op) => (value.includes(op.value) ? { ...obj, [op.value]: op } : obj), {}));
    // first = false;
  });

  $: if (selected) value = Object.values(selected).map(o => o.value);
  $: filtered = options.filter(o => (inputValue ? o.name.toLowerCase().includes(inputValue.toLowerCase()) : o));
  $: if ((activeOption && !filtered.includes(activeOption)) || (!activeOption && inputValue))
    activeOption = filtered[0];

  function add(token) {
    if (Object.values(selected).length < limit) {
      if (!readonly) selected[token.value] = token;
    } else {
      $error = "You can put at most 3 tags!";
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
      add(options.filter(o => o.value === value)[0]);
      input.focus();
    }
  }
</script>

<div class="relative z-0 w-full px-4 bg-light3 rounded-xl multiselect" class:readonly>
  <div class="flex flex-wrap items-center cursor-pointer tokens " class:showOptions on:click="{handleTokenClick}">
    {#each Object.values(selected) as s}
      <div class="flex items-center px-1 py-1 m-1 text-sm rounded-full token" data-id="{s.value}">
        <span>{s.name}</span>
        {#if !readonly}
          <div class="ml-1 rounded-full token-remove hover:bg-light2" title="Remove {s.name}">
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
    <div class="flex items-center flex-1 actions ">
      {#if !readonly}
        <input
          class="w-full h-8 text-sm outline-none bg-light3 "
          id="{id}"
          autocomplete="off"
          bind:value="{inputValue}"
          bind:this="{input}"
          on:keyup="{handleKeyup}"
          on:blur="{handleBlur}"
          placeholder="{placeholder}"
        />
        <div
          class="ml-1 rounded-full remove-all hover:bg-light2"
          title="Remove All"
          class:hidden="{!Object.keys(selected).length}"
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
  </div>

  <select bind:this="{slot}" type="multiple" class="hidden bg-dark1"><slot /></select>

  {#if showOptions}
    <ul
      class="options rounded-xl "
      transition:fly="{{ duration: 200, y: 5 }}"
      on:mousedown|preventDefault="{handleOptionMousedown}"
    >
      {#each filtered as option}
        <li
          class:selected="{selected[option.value]}"
          class:active="{activeOption === option}"
          data-value="{option.value}"
        >
          {option.name}
        </li>
      {/each}
    </ul>
  {/if}
</div>
