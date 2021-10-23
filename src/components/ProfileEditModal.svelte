<script>
  import client from "../client";

  export let hide;
  export let work;
  export let tagline;

  let updatedWork;
  let updatedTagline;

  const updateProfile = async () => {
    const res = await client.User.updateMeta({
      work: updatedWork,
      tagline: updatedTagline,
    });
    hide = true;
    work = updatedWork;
    tagline = updatedTagline;
  };
</script>

<!-- This example requires Tailwind CSS v2.0+ -->
<div
  class="{hide ? 'hidden' : 'fixed'} inset-0 z-50 overflow-y-auto"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
    <!--
        Background overlay, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
    <div class="fixed inset-0 transition-opacity bg-opacity-75 bg-dark1" aria-hidden="true"></div>

    <!-- This element is to trick the browser into centering the modal contents. -->
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

    <!--
        Modal panel, show/hide based on modal state.
  
        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
    <div
      class="inline-block w-full overflow-hidden text-left align-bottom transition-all transform rounded-lg bg-dark3 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="px-4 pt-5 pb-4 bg-dark2 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="w-full text-center md:m-4 sm:text-left">
            <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">Update profile information</h3>
            <div class="mt-4 text-sm">
              <label for="username" class="block text-gray-700">Work/Education</label>
              <input
                bind:value="{updatedWork}"
                type="text"
                name=""
                id="work"
                placeholder="Work/Education"
                class="w-full px-4 py-3 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
              />
              <label for="tagline" class="block mt-2 text-gray-700">About/Tagline</label>
              <input
                bind:value="{updatedTagline}"
                type="text"
                name=""
                id="tagline"
                placeholder="About/Tagline"
                class="w-full px-4 py-3 mt-2 bg-gray-100 border rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          on:click="{updateProfile}"
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white rounded-md bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Save
        </button>
        <button
          on:click="{() => (hide = true)}"
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
