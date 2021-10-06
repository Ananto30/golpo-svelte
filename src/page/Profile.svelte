<script>
	import { fade } from "svelte/transition";
	import PostBox from "../components/PostBox.svelte";

	import Footer from "../components/Footer.svelte";
	import Post from "../components/Post.svelte";

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

<div in:fade class="pt-14 antialiased my-auto min-h-screen">
	<div class="md:fixed md:max-w-sm py-4 px-5">
		<div class="bg-gray-100 rounded-2xl py-3 md:w-60">
			<div class="photo-wrapper p-2">
				<img
					class="w-32 h-32 rounded-full mx-auto"
					src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
					alt="John Doe" />
			</div>
			<div class="p-2">
				<h3 class="text-center text-xl text-gray-900 font-medium leading-8">Joh Doe</h3>
				<div class="text-center text-gray-500 text-xs ">
					<p>Google Inc.</p>
					<p><i>Work hard, play nice :)</i></p>
				</div>

				<div class="text-center my-3">
					<a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#"
						>View Profile</a>
				</div>
			</div>
		</div>
	</div>

	<div class="md:ml-80 py-5 border-b border-l border-t md:border-t-0">
		<div class="pl-5 md:pl-10">
			<PostBox />
		</div>
	</div>
	<div class="md:ml-80 border-l py-5 md:py-0">
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
</div>

<Footer />
