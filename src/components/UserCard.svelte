<script>
  import { IMAGE_LARGE, TAGLINE, WORK } from "../defaults";
  
  export let user;
</script>

<a href="#/profile/{user.username}">
  <div class="p-2">
    <div
      class="h-full p-4 text-center transition duration-200 transform bg-white border rounded-xl md:shadow-sm hover:shadow-lg"
    >
      <div class="mb-3">
        <img
          class="w-auto mx-auto border-2 border-indigo-400 rounded-full h-28"
          src="{user.image || IMAGE_LARGE}"
          alt="{user.username}"
        />
      </div>
      <h2 class="font-bold text-indigo-500 cursor-pointer">{user.display_name || user.username}</h2>
      <span class="block mb-2 text-sm text-gray-500 line-clamp-2">{user.work || WORK}</span>
      <span class="block mb-4 text-sm text-gray-500 line-clamp-2">{user.tagline || TAGLINE}</span>
    </div>
  </div>
</a>
