<script>
	import { fade, fly } from "svelte/transition";

	let bazarList = [
		{
			name: "Healthy 101",
			items: ["Carrot", "Pea", "Rui Fish", "Chicken"],
		},
		{
			name: "Healthy 101",
			items: ["Carrot", "Pea", "Rui Fish", "Chicken"],
		},
		{
			name: "Healthy 101",
			items: ["Carrot", "Pea", "Rui Fish", "Chicken"],
		},
	];
</script>

<div in:fade class="p-5 pt-16 antialiased my-auto min-h-screen">

  <div class="min-h-screen flex justify-center items-center">
    <div class="w-48 h-64 rounded-xl bg-gray-200 flex flex-col shadow">
      <img class="w-auto rounded-t-xl" src="https://avatars.githubusercontent.com/u/16485031?v=4" alt="avatar" />
      <div class="text-center flex flex-col p-2">
        <span class="text-base font-bold">Dendi Handian</span>
        <span class="text-xs italic">Software Engineer</span>
      </div>
    </div>
  </div>

  
	<div
		class="max-w-3xl text-xl md:text-2xl font-medium my-2 md:my-2 pb-1 border-b
    flex">
		Your bazar lists
	</div>
	<p class="text-sm md:text-base mb-4">Choose from your saved bazar list -</p>
	<div class="max-w-3xl grid gap-3">
		{#each bazarList as bazar}
			<div class="rounded-sm flex border text-xs md:text-base">
				<svg
					class="m-2 h-7 md:h-12"
					version="1.1"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 512 512"
					style="enable-background:new 0 0 512 512;"
					xml:space="preserve">
					<rect x="175.941" y="111.89" style="fill:#FEB860;" width="272.201" height="392.286" />
					<rect x="175.941" y="111.89" style="fill:#FEC986;" width="224.165" height="392.286" />
					<rect x="55.856" y="272.013" style="fill:#9B4573;" width="168.121" height="232.173" />
					<rect x="55.856" y="272.013" style="fill:#C8546F;" width="96.072" height="232.173" />
					<g>
						<path
							style="fill:#1D1D1B;"
							d="M227.794,512H52.038V264.191h175.756V512z
              M67.678,496.36h144.475V279.831H67.678V496.36z" />
						<path
							style="fill:#1D1D1B;"
							d="M187.951,296.214h-32.023v15.64h8.191v40.215c0,13.346-10.857,24.204-24.204,24.204
              c-13.345,0-24.203-10.857-24.203-24.204v-40.215h8.191v-15.64H91.881v15.64h8.191v40.215c0,21.969,17.874,39.844,39.843,39.844
              c21.97,0,39.844-17.875,39.844-39.844v-40.215h8.191v-15.64H187.951z" />
						<polygon
							style="fill:#1D1D1B;"
							points="459.962,512 235.986,512 235.986,496.36 444.322,496.36
              444.322,119.715 187.765,119.715 187.765,255.999 172.125,255.999
              172.125,104.075 459.962,104.075 " />
						<rect x="260.002" y="136.101" style="fill:#1D1D1B;" width="16.011" height="15.64" />
						<rect x="356.074" y="136.101" style="fill:#1D1D1B;" width="16.011" height="15.64" />
						<path
							style="fill:#1D1D1B;"
							d="M371.899,95.883h-15.64V55.854c0-22.175-18.04-40.214-40.215-40.214s-40.215,18.04-40.215,40.214
              v40.029h-15.64V55.854C260.188,25.056,285.245,0,316.044,0s55.855,25.056,55.855,55.854V95.883z" />
					</g>
				</svg>
				<div class="mx-0 my-2">
					<div class="md:text-lg font-semibold">{bazar.name}</div>
					<div class="gap-2 md:gap-3">
						<p>{bazar.items.join(", ")}</p>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
