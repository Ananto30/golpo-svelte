<script>
	let tags = ["music", "pink floyd", "wall"];
</script>

<div class="hidden md:block mx-10 fixed w-96 top-12 md:top-20" style="margin-left: 760px;">
	<div class="ml-7 p-2  rounded-2xl bg-gray-100">
		<h2 class="px-3 pb-2 border-b-2 text-lg">Tags</h2>
		<div class="flex flex-wrap pt-2">
			{#each tags as tag}
				<button
					class="bg-gray-300  m-2 text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-400 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
					<span>{tag}</span>
				</button>
			{/each}
		</div>
	</div>
</div>
