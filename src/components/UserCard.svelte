<script>
  import { IMAGE_LARGE, TAGLINE, WORK } from "../defaults";
  
  export let user;
</script>

<a href="#/profile/{user.username}">
  <div class="p-2">
    <div
      class="h-full p-2 text-center transition duration-200 transform border border-transparent hover:border-current"
    >
      <div class="mt-2 mb-3">
        <img
          class="w-auto mx-auto rounded-full h-28"
          src="{user.image || IMAGE_LARGE}"
          alt="{user.username}"
        />
      </div>
      <h2 class="font-bold cursor-pointer">{user.display_name || user.username}</h2>
      <span class="block mb-2 text-sm text-gray-500 line-clamp-2">{user.work || WORK}</span>
      <span class="block mb-2 text-sm text-gray-500 line-clamp-2">{user.tagline || TAGLINE}</span>
    </div>
  </div>
</a>
