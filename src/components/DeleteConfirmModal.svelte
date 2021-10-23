<script context="module">
  import { writable } from "svelte/store";

  const visible = writable(false);

  export const modal = {
    open() {
      visible.set(true);
    },
    close() {
      visible.set(false);
    },
  };
</script>

<script>
  export let onConfirm = () => void 0;
  export let closeAfterConfirm = true;
  export let title = "Delete";
  export let description = "Are you sure?";
  export let confirmText = "Yes";
  export let cancelText = "No";

  const handleConfirm = () => {
    onConfirm();
    closeAfterConfirm && modal.close();
  };
</script>

{#if $visible}
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div class="absolute inset-0 transition-opacity bg-opacity-75 bg-dark1" on:click="{modal.close}"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>​
      <div
        class="relative inline-block w-full overflow-hidden text-left align-bottom rounded-lg bg-dark3 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="px-4 pt-5 pb-4 bg-dark2 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="w-full text-center sm:text-left">
              <h3 class="text-2xl font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
              <div class="mt-4">
                {description}
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white transition duration-200 rounded-md bg-red focus:outline-none focus-visible:ring sm:ml-3 sm:w-auto sm:text-sm active:bg-red-dark hover:bg-red-dark"
            on:click="{handleConfirm}">{confirmText}</button
          >
          <button
            type="button"
            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-600 transition duration-200 bg-transparent rounded-md focus:outline-none focus-visible:ring sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm active:bg-dark2 hover:underline"
            on:click="{modal.close}">{cancelText}</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
