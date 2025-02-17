<script lang="ts">
	export let src: string | undefined;
	export let alt: string = 'User avatar';
	export let size: 's' | 'm' | 'l' | 'xs' = 's';

	let sizes: { [key: string]: string } = {
		xs: 'h-8 w-8',
		s: 'h-10 w-10',
		m: 'h-12 w-12',
		l: 'h-28 w-28'
	};

	const fallbackSrc = `https://api.dicebear.com/9.x/lorelei/svg?seed=${alt}`;
</script>

<div class="{sizes[size]} flex-none rounded-full bg-gray-200">
	<img
		class="{sizes[size]} cursor-pointer rounded-full object-cover"
		{alt}
		src={src || fallbackSrc}
	/>
</div>
