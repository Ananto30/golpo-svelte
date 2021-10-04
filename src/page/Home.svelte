<script>
	import { fade } from "svelte/transition";
	import Tags from "../components/Tags.svelte";
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

<div in:fade class="pt-16 antialiased my-auto min-h-screen">
	<Tags />
	<div class="max-w-3xl grid gap-1">
		{#each posts as post}
			<Post {post} />
		{/each}
	</div>
</div>
