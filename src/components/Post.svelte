<script>
	import moment from "moment";
	import client from "../client";
	import { fade } from "svelte/transition";
	import { info } from "../store";

	export let post;

	const lovePost = (postId) => {
		if (!post.isLovedByMe) {
			client.Post.reactLove(postId);
			post.isLovedByMe = true;
			post.loveCount++;
		} else {
			$info = "You cannot un-love a post!";
		}
	};
</script>

<div in:fade class="">
	<div
		class="flex max-w-xl my-5 bg-white md:shadow-sm md:rounded-lg overflow-hidden mx-auto border-t border-b md:border">
		<div class="flex items-center w-full">
			<div class="w-full">
				<div class="flex flex-row px-5 py-3">
					<div class="w-auto h-auto rounded-full border-2 border-indigo-500">
						<img
							class="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
							alt="User avatar"
							src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200" />
					</div>
					<div class="flex flex-col mb-2 ml-4 mt-1">
						<div class="text-gray-600 text-sm font-semibold">{post.author}</div>
						<div class="flex w-full mt-1">
							<div class="text-indigo-700 font-base text-xs mr-1 cursor-pointer">{post.tags}</div>
							<div class="text-gray-400 font-thin text-xs">• {moment(post.created_at).fromNow()}</div>
						</div>
					</div>
				</div>
				<div class="border-b border-gray-100" />
				<div class="text-gray-400 font-medium text-sm mb-7 mt-6 px-5">
					<img class="rounded" alt={post.title} src={post.image} />
				</div>
				<div class="text-gray-600 font-semibold text-lg mb-2 px-5">
					{post.title}
				</div>
				<div class="text-gray-500 text-sm mb-6 px-5">
					{post.description ? post.description : ""}
				</div>
				<div class="flex justify-start mb-4 border-t border-gray-100">
					<div class="flex pl-5 gap-4 mt-3">
						<button
							title="loves"
							on:click={() => lovePost(post._id)}
							class="flex text-sm items-center gap-1 border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-100 transition duration-200 ease-in-out focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500">
							{#if post.isLovedByMe}
								<img
									width="16"
									src="data:image/png;base64,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" />
							{:else}
								<img
									width="16"
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAE1ElEQVR4nO2bW4hVVRjHf04z4zgzUo5pWmCYFIaZY0kaWpgTpSEpaBZW9hRED13oJQqCCBIfgqAgCx+72ZiOBUGXB03KSxdMzFK7EDk5WdkZbTxexjk9fPvEPmt955y991lrzxnaP1gPi7PW//vWmr3XXutb30BGRkZGxv+XUQ40pgDzgKuADmAM8DdwFNgLfAWcSqjdClwPdAKTgXFAHjgOHAR2Ab/W4HtiJgJPA98BhSplANgILIyhvwjoDvpW0z8APAVMqHFMkWgH1kV0TCufAtMr6F8N7EioPQCsBdocjdViFvBzQufCJQ88CTSGtBuRv2Legf6PwEzXg18OnKxg9BzwPbAd6AE+B/qqOPoe8o63Au9XadsXaPYENg4GNsu1PwHc6Wrwa4DzZQx9BNyLLE4anchjmSvT/7OgaL/lgr6dZbQ7gPuAj8v0Pw+sSDTiEAvRZ3o/0BVD5yLgVWCojLPhMgSsD/pE5VbgW0XrH8pPYFXGAb2KaA+yGCZhFXBa0SyW08BdCbXHAlsVzV+IN5n/8Yoi1g00JHSwSBfyjmrv7aIatRuATYr2S3GFpmI/+l8jC5YLlgCDIe1BYLEj7TZkAxb2/SxweRyRFw2BIWCOIweLPIY88v3Ag46152KvNy9E7dwIHDM6b3TsYJEWoNmTdjelYzgKXBCl4zzsdyjOil8v3IY9Dusp1ha0G416DtnCjjS2Ia9XmPlmI20CzL36l8iCONI4i5xEw1jnEG0CJhr131x5NAz0GvVLzAbaBLQY9ePO3Emfv4z6GLOBNgFmp1TO2Z4w/+J/mA20Cegz6rE2EHXGFKP+u9lAmwAzxDQHj0EGj7Rjf/Yihc+uw/5+LnXqWjoswx7HrCgdG5B3JdzxTT8+euVtSsdwjBgHuTeMzmeQqOxI4TJkHxAew+txBG7Bfnyec+ujV9Zi+x8nKg3YEZaTwCR3PnpjMhIJCvt+gAR3IA9jz+LLztz0hxbIeSiJUDMSYjYDC9c6cdMPndiBnB+ApqSCq7Fncw8Rz9Up0wDsxPb3nlpFdyuij9Yi6oknsP3cRe0xTGYin8GwcJ76ehVmIBew5qf7GlcGnsWe3f0op6thoAX4Btu/Z1waaUYCI6aR11waScgG9HXKeaxxGvoV1yOuDcXgccWfHHCFL4N3KwbPAbf7MliBxZTeLRRL0pulyKxTjPYjC1FaTEeyUEw/nk/D+CjgLcX4T8DFKdjvAA4p9jfh4JMXlVbgC8WJHfgNnrShZ5Dswd21XWQmITevpjOfYAdWXTAa+ECx14scf4eFGehfhg8Rh13RjJ5FcoKIUR6fdKHn9rxLaR5QUpqALYp+njq6srsDe7tcQBbLWiahCXhH0T2DXLHXFcuxw1AF5NFNsmUeDWxW9AaRTJO6ZCV6TtE2JIUlKm1IApY2+NUO/fXCA+g7tJ2UzyYL04EcY7XB3+/BXy8sQ0+GOgxcWaHfVCR+p73z3re4rlmCfUYvAH8CC5T2c9GTKwdwlz+UOjcj5wRzUKcoTWJcgT5ZOeCmFP31wmzgCPbgClTOFD1CHWxyXHEpkq2hDVQr+7Bvdkc87VRPii4gn78Lh8lH7zQi/2ihZYr2B7+52D5HxsW/zCRhPHL/eENQ341slszslIyMjIyMDI/8CyI/esaELVXaAAAAAElFTkSuQmCC" />
							{/if}
							<span>{post.loveCount}</span>
						</button>
						<button
							title="comments"
							class="flex text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-indigo-100 transition duration-200 ease-in-out focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500">
							<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAeElEQVQ4jdWSQQqAIBBFn9EJPENna9shkg7WlSJo2thGRCYRrU09GITv8OcvPnyFBRDAV4wAThsIYCuPWeDQom9MHPf70mcGo4WcwW2pxD8SFA1fJ+jCe9LWA9GiI9/EHZjCobSJc23CAVjDtJYtYoAR2J4apGluXAfjI7lbYdmVAAAAAElFTkSuQmCC" /><span
								>{post.commentCount}</span>
						</button>
						<a
							title="visit link"
							href={post.url}
							target="_blank"
							class="flex text-sm items-center gap-1 border border-gray-300 px-3 py-1 rounded-full hover:bg-indigo-100 transition duration-200 ease-in-out focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500">
							<span
								><img
									src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAhUlEQVQ4jcWSTQ5AQAyFP44lxM+KuJSruBoWnIKFCiYtEyJe0kXb917bzMDfCDx58wvtCRkwGYbUwCDNYzSOOLMMeiAyJqciTiVXDdQiEAMjUNxxteImziVvFI5p4IqvtlSbLfvNjwy8OKGH6BJHg4H1bgsJ61ObqITgfqQtOqB8sexHWADPDSfbel/NCgAAAABJRU5ErkJggg==" /></span
							></a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
