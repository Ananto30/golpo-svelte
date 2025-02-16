<script>
	import { IMAGE_LARGE, TAGLINE, WORK } from '../defaults';
	import Avatar from './Avatar.svelte';

	export let user;
</script>

<a href="#/profile/{user.username}">
	<div class="p-2">
		<div
			class="h-full transform border border-transparent p-4 text-center transition duration-200 hover:border-current"
		>
			<div class="flex flex-col justify-center gap-4">
				<div class="flex justify-center">
					<Avatar src={user.image} alt={user.username} size="l" />
				</div>
				<div class="flex flex-col gap-1">
					<h2 class="cursor-pointer font-bold">{user.display_name || user.username}</h2>
					<span class="line-clamp-2 block text-sm text-gray-500">{user.work || WORK}</span>
					<span class="line-clamp-2 block text-sm text-gray-500">{user.tagline || TAGLINE}</span>
				</div>
			</div>
		</div>
	</div>
</a>
