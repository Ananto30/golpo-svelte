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
    <div class="fixed inset-0 transition-opacity bg-white bg-opacity-75" aria-hidden="true"></div>

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
      class="inline-block w-full overflow-hidden text-left align-bottom transition-all transform bg-white border border-gray-400 sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="px-4 pt-5 pb-4 bg-dark2 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="w-full text-center md:m-4 sm:text-left">
            <h3 class="text-lg font-semibold leading-6 text-gray-900" id="modal-title">Update profile information</h3>
            <div class="mt-4 text-sm">
              <!-- <label for="username" class="block text-gray-700">Work/Education</label> -->
              <input
                bind:value="{updatedWork}"
                type="text"
                name=""
                id="work"
                placeholder="Work/Education"
                class="w-full py-3 mt-2 border-b focus:border-black focus:outline-none"
              />
              <!-- <label for="tagline" class="block mt-2 text-gray-700">About/Tagline</label> -->
              <input
                bind:value="{updatedTagline}"
                type="text"
                name=""
                id="tagline"
                placeholder="About/Tagline"
                class="w-full py-3 mt-2 border-b focus:border-black focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          on:click="{updateProfile}"
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white transition duration-200 bg-black border border-transparent hover:border-current hover:bg-white hover:text-black focus:outline-none focus-visible:ring sm:ml-3 sm:w-auto sm:text-sm "
        >
          Save
        </button>
        <button
          on:click="{() => (hide = true)}"
          type="button"
          class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-600 transition duration-200 bg-transparent focus:outline-none focus-visible:ring sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm active:bg-dark2 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>
