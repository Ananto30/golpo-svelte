<script>
	import { fade } from "svelte/transition";
	import Tags from "../components/Tags.svelte";
	import Post from "../components/Post.svelte";
	import Footer from "../components/Footer.svelte";

	let posts = [
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption:
				"From the motion picture The Wall, by Pink Floyd.asdfasdgasdf a asdgasdfg asdgfa sdgas dgasdga sdg asdgas dgasdga asd gasdgasdg asdga sdga sdgasd gas g asdgasdgasfgasegasdfgad fgadf gasdg asdga sgasdg",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption: "From the motion picture The Wall, by Pink Floyd.",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption: "From the motion picture The Wall, by Pink Floyd.",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption: "From the motion picture The Wall, by Pink Floyd.",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption: "From the motion picture The Wall, by Pink Floyd.",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption: "From the motion picture The Wall, by Pink Floyd.",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
		{
			author: "Jalil",
			time: "2 hours ago",
			title: "Pink Floyd - Mother",
			desctiption: "From the motion picture The Wall, by Pink Floyd.",
			loveCount: 123,
			commentCount: 12,
			link: "https://www.youtube.com/watch?v=lX3uCuFKlqw",
			tags: ["music", "pink floyd", "wall"],
			image: "https://i.ytimg.com/vi/lX3uCuFKlqw/maxresdefault.jpg",
		},
	];
</script>

<div in:fade class="pt-12 md:pt-14 antialiased my-auto min-h-screen">
	<Tags />

	<div class="max-w-3xl grid gap-1 border-r">
		<div class="pl-5 py-2 md:py-5 border-b flex items-center justify-between">
			<div class="w-full flex items-center">
				<img
					class="w-12 rounded-full"
					src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
					alt="Alex" />
				<div class="w-full mr-5">
					<input
						aria-placeholder="Share a link"
						placeholder="Share a link"
						class="w-full py-2 pr-5 mx-3 pl-5 block rounded-full focus:outline-none focus:border-gray-400 border-2 bg-gray-100 focus:text-gray-700  text-sm md:text-base" />
				</div>
			</div>
			<button
				class="mr-5 flex text-md items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
				<span>Share</span>
			</button>
			<div>
				<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-7 w-7 cursor-pointer"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
			</svg> -->
			</div>
		</div>
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
</div>
<Footer />
