<script lang="ts">
	import { TAGLINE, WORK } from '../defaults';
	import Avatar from './Avatar.svelte';
	import type { UserMeta } from '../types';

	export let user: UserMeta;
</script>

<a href="#/profile/{user.username}">
	<div class="p-2">
		<div
			class="h-full transform border border-transparent text-center transition ease-in-out hover:border-current md:p-4"
		>
			<div class="flex flex-col justify-center gap-4">
				<div class="flex justify-center">
					<Avatar src={user.image} alt={user.username} size="l" />
				</div>
				<div class="flex flex-col gap-1">
					<h2 class="cursor-pointer text-sm font-bold capitalize md:text-base">
						{user.display_name || user.username}
					</h2>
					<p class="line-clamp-2 block text-xs text-gray-500 md:text-sm">
						{user.work || WORK}
					</p>
					<p class="line-clamp-2 block text-xs text-gray-500 md:text-sm">
						{user.tagline || TAGLINE}
					</p>
				</div>
			</div>
		</div>
	</div>
</a>
