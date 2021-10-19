<script>
  export let items;
  export let selectedItem;
</script>

<nav class="flex flex-row">
  {#each items as item}
    <button
      on:click="{() => (selectedItem = item)}"
      class="{selectedItem == item
        ? 'text-indigo-500 border-b-2 border-indigo-500 font-semibold'
        : 'text-gray-600'} block px-5 py-2 hover:text-indigo-500 focus:outline-none"
    >
      {item}
    </button>
  {/each}
</nav>
