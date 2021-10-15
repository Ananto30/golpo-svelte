<script>
  import { loggedUsername, jwt, page } from "../store.js";

  import { fade } from "svelte/transition";

  let sideBarVisible = true;

  const logout = () => {
    $loggedUsername = "";
    $jwt = null;
  };

  const toggleSideBar = () => {
    sideBarVisible = !sideBarVisible;
  };
</script>

<div in:fade class="sticky top-0 z-10 w-full md:min-h-screen md:flex md:w-auto">
  <!-- mobile menu bar -->
  <div class="fixed z-50 flex justify-between w-full text-gray-100 bg-gray-800 md:hidden">
    <!-- logo -->
    <a href="#/home" class="block px-4 py-2 text-2xl font-bold">Golpo</a>

    <!-- mobile menu button -->
    <button on:click="{toggleSideBar}" class="p-4 mobile-menu-button focus:outline-none focus:bg-gray-700">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
      </svg>
    </button>
  </div>

  <!-- sidebar -->
  <div
    class="{sideBarVisible
      ? '-translate-x-full'
      : 'shadow-lg'} z-30 md:shadow-none w-3/4 space-y-6 md:py-7 px-2 inset-y-0 left-0 transform fixed md:relative md:translate-x-0 transition duration-200 ease-in-out bg-white"
  >
    <!-- logo -->
    <a href="#/home" class="flex items-center px-4 space-x-2 ">
      <span class="text-4xl font-extrabold text-indigo-500">Golpo</span>
    </a>

    <!-- nav -->
    <nav class="grid gap-2 text-xl bg-white">
      <a
        on:click="{toggleSideBar}"
        href="#/home"
        class="{$page == 'home'
          ? 'font-bold'
          : ''} flex items-center gap-2 px-4 py-5 transition duration-200 rounded-full hover:bg-indigo-100"
      >
        <img
          alt=""
          width="36"
          src="data:image/png;base64,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"
        />
        Home</a
      >
      <a
        on:click="{toggleSideBar}"
        href="#/chat"
        class="{$page == 'chat'
          ? 'font-bold'
          : ''} flex items-center gap-2 px-4 py-5 transition duration-200 rounded-full hover:bg-indigo-100"
      >
        <img
          alt=""
          width="36"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAGV0lEQVR4nO2aSWwbVRjHf29sjxPHsZsECg07qFIRixBIVAhu5QAtSEhF5UKBHFAOtCqIqumFEsGFRSyiVYV6aUvUHtqqCNRygQohQFA2IVRUUEsFNImyNIvjLfYsj0My3saJZ+KM7Qj/TuM3733v+3/v87xlBpo0adKkyf8XYV309x9T268kXgexFVhTR5+qYRjBQLyrbU9//5askwZ+66J9IvkaiF3e+VYTupH0tU8kAXY7aZALAJKtALdvWk94dYcn3jlBVX2oqi/3O5s1yGaNRetYTA1O8OvH31paHAVAKbjuBlaseCkh2BmxfnY77VOpXKU2VCs+ndYwTem637oFQAjojAaB+omHwmdADRECVkVUVkVUTAl6gfO1FA91yoDOaJCOyNzod0RUWoNz4qoVX65eJeqSARPTGQxzTvxUQkPXzWURv5QA1CUDVNWHbkoSKb2u4qEOASh0Nj0vvF7iocYBWO6nfbXioYYBaETxUKMANKp4WMIscP70WRJjU8vSefs1HazbuB5V9XHuk++IjUwW3Y92d7Hu0fs9Ew9LyAAhKtdxiqRAkGI3bJqmp+JhCRmwbuN6R/Xcpv29mx/MlXud9oV48gxo5P98Kcu+EmwU8e9sO1hug2A7MVrWADSK+EWwnRjVdRYoxZoVoHrxW3syuevo6tUADA/qnDySLDoxqussUIo19oXiw63Ox6g020rpvj5nK3diVPUsUE3amybMzi6c9sGAQqjFh6abZDRzUb/K9euEqmYBr8W3h+bGpz3kJxhY2NWliocqAuCl+HDITzQcQJlfHCmKIBoOEA7ZE7Ya8eAyAJ1RFSGEp+IBEimdWCJfxzQlsYRGIqUX2apWPLh4BnRGVVZFgoRaAsRSGlIu7EQ14i0ymgkpnWg4QDyl254ByyEeXGTA1IxGNmsSn9U9F2+R0UxSGcMz8eAiAwIBpSYjX4oXaV+IowywnK21+FKWWzxUyIDzp8+i+AT3PflQruynY18DxeuBPz47i+JTinZ0vxz/BhRRtJ8vZ8+qV65tYVm5fs+fPosQzneo5Vg0AKVL3mzWID5aXKaqPlsZkDvcKBz5ckvo0kOQcmXl+l3InltsATBNk3h8hqyWf71+6dJlW8OxsVFbWTX1nJaVszc+PoaqqrSF2233KmELwOTEFcz5P3uwM2xr0IhlUkoymQya5uibiCLsGSDzKXvtA2ttDRq5rNq3w8MAmcmEayONguV7KOQ8EPkMEAwg6Rv57kLFRsFVbVz74FoKPjHKI2Hk+wt1DeStty2+cywklwHxrrY9CN5kPhMWIzOdRE9rZe8lhibrJj4Uktxxt8Hd9+YXT6LCAUYuA+bPyHZT4dua918aSBqaHpKGPc30dJap3wcBkEI8vXPvc0cWsmOd2RWe3HiBPxhc9L6r3WB/f79iGkYLgC9Y/Pw0DYMrv/yNqRsgOPPy3mePunV2uVEUhdawffYoxNWJUGT85tulkIoS8KEE8ktZI6Mx9vMlstMpgMuGwdMCsfTPNqpECAV/UKU1HEYoi4+xqwBIhQ1ICHblo5oen2Hit38xZjUEYkhX5IZd+3pGnNq0DizrhbsASNkjgLY1HWSmk8xcHCU1Gpu7KcQPGtrmvg+eH/TAT89wHIC3tx/aJKS8ByB2cRQtngZA+BTTJ+hvSc2+0Xugt/zUUJ5hoHt4UC88rfWU4cHc7JCb6Rz3rEj5pnWtxdMofr9s7Qp/mRqaeWbHh88OufZmft1x8kjSdVOA62/y88RTbcVLEQknjyYLhS7QNR9Z125CfwUY8/mVL1F8p1oTyZO9729NuXM7T7yrbU/7RO4lheMvOy0G/9EZGtS57oa8hFjMrCR+GMHATFfbq1aBh685vOOd7QffQ/LiurtUHt7YmisfGdY5MZAEwY8v7+2534mthvlU1g2GYD+g/XkuK4cu50c8oM6PpxSt5VvaWZEB2PVBzwUE70qJ+PzTtBGbnlv7RyIKYk7RzRLpKLtXZAAAwpnsK8BXiYTpO344wd9/6QRUwVVXK4AMv7ft0J1O7KzYAPQe6NVazNRjEvHF7Kzk1Ikkxw7nN2Gm4HEndlZsAABe2P9C4sbR0CMS0QfMjI0YjI/O/R2EFD1ObKzoAABsOb7F2LnvubdEwLgFIXYgOANMgay4rW/SpEmT/z3/AWViyQnNwjpgAAAAAElFTkSuQmCC"
        />
        Chat
      </a>
      <a
        on:click="{toggleSideBar}"
        href="#/profile/{$loggedUsername}"
        class="{$page == 'profile'
          ? 'font-bold'
          : ''} flex items-center gap-2 px-4 py-5 transition duration-200 rounded-full hover:bg-indigo-100"
      >
        <img
          alt=""
          width="36"
          src="data:image/png;base64,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"
        />
        Profile
      </a>
      <a
        on:click="{toggleSideBar}"
        href="#/users"
        class="{$page == 'users'
          ? 'font-bold'
          : ''} flex items-center gap-2 px-4 py-5 transition duration-200 rounded-full hover:bg-indigo-100"
      >
        <img
          alt=""
          width="36"
          src="data:image/png;base64,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"
        />
        Users
      </a>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        on:click="{toggleSideBar}"
        on:click="{logout}"
        class="flex items-center gap-2 px-4 py-5 transition duration-200 rounded-full cursor-pointer hover:bg-indigo-100"
      >
        <img
          width="36"
          src="data:image/png;base64,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"
        />
        Logout
      </a>
    </nav>
    <hr />
    <div class="text-sm">
      <a class="text-indigo-500 cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte"
        >GitHub</a
      >
      •
      <a
        class="text-indigo-500 cursor-pointer hover:underline"
        href="https://github.com/Ananto30/golpo-svelte/labels/bug">Report Bug</a
      >
      •
      <a
        class="text-indigo-500 cursor-pointer hover:underline"
        href="https://github.com/Ananto30/golpo-express/discussions/categories/request-feature">Request Feature</a
      >
      •
      <a class="text-indigo-500 cursor-pointer hover:underline" href="https://github.com/Ananto30/golpo-svelte"
        >Policy</a
      >
    </div>
  </div>
</div>
