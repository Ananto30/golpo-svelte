<script>
	import client from "../client";

	let url;

	const sharePost = () => {
		client.Post.createPost(url).then((res) => {
			if (res.status === 200) {
				url = ""
				alert("Post shared!");
			}
		});
	};
</script>

<div class="flex items-center justify-between">
	<div class="w-full flex items-center">
		<img
			class="w-12 rounded-full"
			src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
			alt="Alex" />
		<div class="w-full mr-5">
			<input
				bind:value={url}
				aria-placeholder="Share a link"
				placeholder="Share a link"
				class="w-full py-2 pr-5 mx-3 pl-5 block rounded-full focus:outline-none focus:border-gray-300 border-2 bg-gray-50 focus:text-gray-700  text-sm md:text-base" />
		</div>
	</div>
	<button
		on:click={sharePost}
		class="mr-5 flex text-md items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
		<span>Share</span>
	</button>
</div>
