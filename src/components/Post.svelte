<script>
  import { fade } from "svelte/transition";
  import { info, loggedUsername } from "../store";
  import moment from "moment";
  import client from "../client";
  import { showTag } from "../helpers";

  export let post;
  export let onDelete;

  const lovePost = postId => {
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
  <div class="flex max-w-xl py-3 overflow-hidden bg-white border-b-2 ">
    <div class="flex items-center w-full">
      <div class="w-full">
        <div class="flex flex-row px-5 py-3">
          <div class="w-auto h-auto border-2 border-indigo-500 rounded-full">
            <a href="#/profile/{post.author}" class="">
              <img
                class="object-cover w-12 h-12 rounded-full shadow cursor-pointer"
                alt="User avatar"
                src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
              />
            </a>
          </div>
          <div class="flex flex-col mt-1 mb-2 ml-4">
            <div class="text-sm font-semibold text-gray-600">{post.author}</div>
            <div class="flex w-full mt-1">
              <div class="mr-1 text-xs text-indigo-700 cursor-pointer font-base">
                {post.tags.map(tag => showTag(tag)).join(" • ")}
              </div>

              <div class="text-xs text-gray-400">• {moment(post.created_at).fromNow()}</div>
            </div>
          </div>
        </div>
        <div class="border-gray-100 md:border-none"></div>
        <div class="px-5 mt-6 text-sm font-medium text-gray-400 mb-7">
          <img class="rounded" alt="{post.title}" src="{post.image}" />
        </div>
        <div class="px-5 mb-2 text-lg font-semibold text-gray-600">
          {post.title}
        </div>
        <div class="px-5 mb-3 text-sm text-gray-500">
          {post.description ? post.description : ""}
        </div>
        <div class="flex justify-start mb-4 border-gray-100 md:border-none">
          <div class="flex gap-4 pl-5 mt-3">
            <button
              title="loves"
              on:click="{() => lovePost(post._id)}"
              class="flex items-center gap-1 px-3 py-1 text-sm transition duration-200 ease-in-out border border-gray-300 rounded-full hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500"
            >
              {#if post.isLovedByMe}
                <img
                  alt=""
                  width="16"
                  src="data:image/png;base64,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"
                />
              {:else}
                <img
                  alt=""
                  width="16"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAE1ElEQVR4nO2bW4hVVRjHf04z4zgzUo5pWmCYFIaZY0kaWpgTpSEpaBZW9hRED13oJQqCCBIfgqAgCx+72ZiOBUGXB03KSxdMzFK7EDk5WdkZbTxexjk9fPvEPmt955y991lrzxnaP1gPi7PW//vWmr3XXutb30BGRkZGxv+XUQ40pgDzgKuADmAM8DdwFNgLfAWcSqjdClwPdAKTgXFAHjgOHAR2Ab/W4HtiJgJPA98BhSplANgILIyhvwjoDvpW0z8APAVMqHFMkWgH1kV0TCufAtMr6F8N7EioPQCsBdocjdViFvBzQufCJQ88CTSGtBuRv2Legf6PwEzXg18OnKxg9BzwPbAd6AE+B/qqOPoe8o63Au9XadsXaPYENg4GNsu1PwHc6Wrwa4DzZQx9BNyLLE4anchjmSvT/7OgaL/lgr6dZbQ7gPuAj8v0Pw+sSDTiEAvRZ3o/0BVD5yLgVWCojLPhMgSsD/pE5VbgW0XrH8pPYFXGAb2KaA+yGCZhFXBa0SyW08BdCbXHAlsVzV+IN5n/8Yoi1g00JHSwSBfyjmrv7aIatRuATYr2S3GFpmI/+l8jC5YLlgCDIe1BYLEj7TZkAxb2/SxweRyRFw2BIWCOIweLPIY88v3Ag46152KvNy9E7dwIHDM6b3TsYJEWoNmTdjelYzgKXBCl4zzsdyjOil8v3IY9Dusp1ha0G416DtnCjjS2Ia9XmPlmI20CzL36l8iCONI4i5xEw1jnEG0CJhr131x5NAz0GvVLzAbaBLQY9ePO3Emfv4z6GLOBNgFmp1TO2Z4w/+J/mA20Cegz6rE2EHXGFKP+u9lAmwAzxDQHj0EGj7Rjf/Yihc+uw/5+LnXqWjoswx7HrCgdG5B3JdzxTT8+euVtSsdwjBgHuTeMzmeQqOxI4TJkHxAew+txBG7Bfnyec+ujV9Zi+x8nKg3YEZaTwCR3PnpjMhIJCvt+gAR3IA9jz+LLztz0hxbIeSiJUDMSYjYDC9c6cdMPndiBnB+ApqSCq7Fncw8Rz9Up0wDsxPb3nlpFdyuij9Yi6oknsP3cRe0xTGYin8GwcJ76ehVmIBew5qf7GlcGnsWe3f0op6thoAX4Btu/Z1waaUYCI6aR11waScgG9HXKeaxxGvoV1yOuDcXgccWfHHCFL4N3KwbPAbf7MliBxZTeLRRL0pulyKxTjPYjC1FaTEeyUEw/nk/D+CjgLcX4T8DFKdjvAA4p9jfh4JMXlVbgC8WJHfgNnrShZ5Dswd21XWQmITevpjOfYAdWXTAa+ECx14scf4eFGehfhg8Rh13RjJ5FcoKIUR6fdKHn9rxLaR5QUpqALYp+njq6srsDe7tcQBbLWiahCXhH0T2DXLHXFcuxw1AF5NFNsmUeDWxW9AaRTJO6ZCV6TtE2JIUlKm1IApY2+NUO/fXCA+g7tJ2UzyYL04EcY7XB3+/BXy8sQ0+GOgxcWaHfVCR+p73z3re4rlmCfUYvAH8CC5T2c9GTKwdwlz+UOjcj5wRzUKcoTWJcgT5ZOeCmFP31wmzgCPbgClTOFD1CHWxyXHEpkq2hDVQr+7Bvdkc87VRPii4gn78Lh8lH7zQi/2ihZYr2B7+52D5HxsW/zCRhPHL/eENQ341slszslIyMjIyMDI/8CyI/esaELVXaAAAAAElFTkSuQmCC"
                />
              {/if}
              <span>{post.loveCount}</span>
            </button>
            <a
              href="#/post/{post._id}"
              title="comments"
              class="flex items-center gap-1 px-3 py-1 text-sm transition duration-200 ease-in-out border border-gray-300 rounded-full hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                style=" fill:#000000;"
              >
                <path
                  d="M 2 2 L 2 12 C 2 13.097656 2.902344 14 4 14 L 12 14 C 13.097656 14 14 13.097656 14 12 L 14 5 L 11 5 L 11 2 Z M 3 3 L 10 3 L 10 12 C 10 12.367188 10.109375 12.703125 10.28125 13 L 4 13 C 3.441406 13 3 12.558594 3 12 Z M 4 5 L 4 6 L 9 6 L 9 5 Z M 11 6 L 13 6 L 13 12 C 13 12.558594 12.558594 13 12 13 C 11.441406 13 11 12.558594 11 12 Z M 4 7 L 4 8 L 6 8 L 6 7 Z M 7 7 L 7 8 L 9 8 L 9 7 Z M 4 9 L 4 10 L 6 10 L 6 9 Z M 7 9 L 7 10 L 9 10 L 9 9 Z M 4 11 L 4 12 L 6 12 L 6 11 Z M 7 11 L 7 12 L 9 12 L 9 11 Z"
                ></path>
              </svg>
              <span>{post.commentCount}</span>
            </a>
            <a
              title="visit link"
              href="{post.url}"
              target="_blank"
              class="flex items-center gap-1 px-3 py-1 text-sm transition duration-200 ease-in-out border border-gray-300 rounded-full hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style=" fill:#000000;"
                >
                  <path
                    d="M 9 2 L 9 3 L 12.292969 3 L 6.023438 9.273438 L 6.726563 9.976563 L 13 3.707031 L 13 7 L 14 7 L 14 2 Z M 4 4 C 2.894531 4 2 4.894531 2 6 L 2 12 C 2 13.105469 2.894531 14 4 14 L 10 14 C 11.105469 14 12 13.105469 12 12 L 12 7 L 11 8 L 11 12 C 11 12.550781 10.550781 13 10 13 L 4 13 C 3.449219 13 3 12.550781 3 12 L 3 6 C 3 5.449219 3.449219 5 4 5 L 8 5 L 9 4 Z"
                  >
                  </path>
                </svg>
              </span>
            </a>

            {#if post.author == $loggedUsername}
              <button
                title="delete"
                on:click="{onDelete}"
                class="flex items-center gap-1 px-3 py-1 text-sm transition duration-200 ease-in-out border border-gray-300 rounded-full hover:bg-indigo-100 focus:bg-indigo-100 focus:outline-none focus-visible:border-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  style=" fill:#000000;"
                  ><path
                    d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.324219 3.675781 14 4.5 14 L 10.5 14 C 11.324219 14 12 13.324219 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 4 L 11 4 L 11 12.5 C 11 12.78125 10.78125 13 10.5 13 L 4.5 13 C 4.21875 13 4 12.78125 4 12.5 L 4 4 L 6 4 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 5 12 L 6 12 L 6 5 Z M 7 5 L 7 12 L 8 12 L 8 5 Z M 9 5 L 9 12 L 10 12 L 10 5 Z"
                  ></path></svg
                >
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
