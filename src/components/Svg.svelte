<script lang="ts">
	export let name: string;
	export let width: string = '16';
	export let height: string = '16';
	export let focusable: number = 1;
	let icons = [
		{
			box: 256,
			name: 'home',
			svg: `<path d="M151.99414,207.99263v-48.001a8,8,0,0,0-8-8h-32a8,8,0,0,0-8,8v48.001a8,8,0,0,1-7.999,8l-47.99414.00632a8,8,0,0,1-8.001-8v-92.4604a8,8,0,0,1,2.61811-5.91906l79.9945-72.73477a8,8,0,0,1,10.76339-.00036l80.0055,72.73509A8,8,0,0,1,216,115.53887V207.999a8,8,0,0,1-8.001,8l-48.00586-.00632A8,8,0,0,1,151.99414,207.99263Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" data-darkreader-inline-stroke="" style="--darkreader-inline-stroke:#e9e2d8;"></path>`
		},
		{
			box: 256,
			name: 'chat',
			svg: `<path d="M71.5834,144.00049l-39.58291,32v-128a8,8,0,0,1,8-8h128a8,8,0,0,1,8,8v88a8,8,0,0,1-8,8Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M80.00049,144.00048v40a8,8,0,0,0,8,8h96.41709l39.58291,32v-128a8,8,0,0,0-8-8h-40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'user',
			svg: `<circle cx="128" cy="96" r="64" fill="none" stroke="#000000" stroke-miterlimit="10" stroke-width="16"></circle><path d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'bookmarks',
			svg: `<path d="M168,224l-56.0074-40L56,224V72a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M88,64V40a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8V192l-32-22.85412" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'users',
			svg: `<circle cx="128" cy="140" r="40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M196,116a59.909,59.909,0,0,1,48.00114,23.99567" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M11.99717,139.99792A59.909,59.909,0,0,1,60,116" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M70.4343,215.9991a64.02584,64.02584,0,0,1,115.13125-.00031" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M60,116A32,32,0,1,1,91.437,77.99243" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M164.56291,77.993A32.0027,32.0027,0,1,1,196,116" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'logout',
			svg: `<polyline points="174.011 86 216 128 174.011 170" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="104" y1="128" x2="215.97057" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M104,216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8h56" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'love',
			svg: `<path d="M128,216S28,160,28,92A52.00881,52.00881,0,0,1,128.00008,71.965l-.00019.00008A52.00881,52.00881,0,0,1,228,92C228,160,128,216,128,216Z" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></path>`
		},
		{
			box: 256,
			name: 'red-love',
			svg: `<path d="M128,216S28,160,28,92A52.00881,52.00881,0,0,1,128.00008,71.965l-.00019.00008A52.00881,52.00881,0,0,1,228,92C228,160,128,216,128,216Z" fill="red" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></path>`
		},
		{
			box: 256,
			name: 'comment',
			svg: `<path d="M105.07,192l16,28a8,8,0,0,0,13.9,0l16-28H216a8,8,0,0,0,8-8V56a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8V184a8,8,0,0,0,8,8Z" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>`
		},
		{
			box: 256,
			name: 'bookmark',
			svg: `<path d="M192,224l-64.0074-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></path>`
		},
		{
			box: 256,
			name: 'bookmarkbig',
			svg: `<path d="M192,224l-64.0074-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'bookmarked',
			svg: `<path d="M192,224l-64.0074-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z" fill="#0369a1" stroke="#0369a1" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"></path>`
		},
		{
			box: 256,
			name: 'delete',
			svg: `<line x1="216" y1="56" x2="40" y2="56" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><line x1="104" y1="104" x2="104" y2="168" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="152" y1="104" x2="152" y2="168" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56" fill="none" stroke="#6b7280" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/>`
		},
		{
			box: 256,
			name: 'external',
			svg: `<polyline points="216 100 215.992 40.008 156 40" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="143.9714" y1="112.0286" x2="215.9714" y2="40.0286" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M184,144v64a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8h64" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'music',
			svg: `<circle cx="180" cy="172" r="28" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><circle cx="52" cy="204" r="28" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><line x1="208" y1="80" x2="80" y2="112" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline points="80 204 80 64 208 32 208 172" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>`
		},
		{
			box: 256,
			name: 'controller',
			svg: `<line x1="152" y1="108" x2="184" y2="108" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="72" y1="108" x2="104" y2="108" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="88" y1="92" x2="88" y2="124" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M172.01831,55.7398,84.00446,56A52.01509,52.01509,0,0,0,32.78594,98.96873l.00852.00156-16.3644,84.16289A28.00192,28.00192,0,0,0,63.80532,207.796l-.00165-.00173L107.03924,160l64.97907-.2602a52,52,0,0,0,0-104Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M223.22831,98.71009l16.351,84.42309A28.00192,28.00192,0,0,1,192.204,207.796l.00166-.00173L149,159.832" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'tree',
			svg: `<line x1="128" y1="232" x2="128" y2="88" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="152" x2="80" y2="128" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="128" y1="128" x2="176" y2="104" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M132.476,181.2265a63.99546,63.99546,0,1,0,62.27163-111.367A7.98712,7.98712,0,0,1,190.7243,65.693a68.02876,68.02876,0,0,0-125.44861,0,7.98711,7.98711,0,0,1-4.02328,4.16655,63.99621,63.99621,0,1,0,62.27159,111.367A8.03193,8.03193,0,0,1,132.476,181.2265Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'coffee',
			svg: `<line x1="88" y1="24" x2="88" y2="56" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="120" y1="24" x2="120" y2="56" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="152" y1="24" x2="152" y2="56" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="32" y1="216" x2="208" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M83.29651,216.0038A88.01441,88.01441,0,0,1,32,136V88H208v48a88.0144,88.0144,0,0,1-51.29712,80.00408" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M208,88h0a32,32,0,0,1,32,32V128a32,32,0,0,1-32,32h-3.37846" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'smile-wink',
			svg: `<circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><circle cx="92" cy="108" r="12"></circle><line x1="152" y1="108" x2="176" y2="108" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M169.58,151.99735a48.016,48.016,0,0,1-83.15966.00055" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'chart',
			svg: `<polyline points="224 208 32 208 32 48" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><polyline points="224.002 96 160.002 152 96.002 104 32.002 160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline>`
		},
		{
			box: 256,
			name: 'baby',
			svg: `<circle cx="128" cy="128" r="96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><circle cx="92" cy="128" r="12"></circle><circle cx="164" cy="128" r="12"></circle><path d="M154.53832,168.00269a48.03112,48.03112,0,0,1-53.07491.00115" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M128,32c-16,20-16,40-16,40a16,16,0,0,0,32,0" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'leaf',
			svg: `<line x1="160" y1="96" x2="40" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><path d="M64,192C16,112,80,32,216,40,224,176,144,240,64,192Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'plane',
			svg: `<path d="M209.53911,80.402,175.88745,112l32,88-24,24-47.80786-69.97929L111.88745,176v24l-24,24L73.695,182.14581,31.88745,168l24-24h24l24-24-72-48,24-24,88,32L175.598,46.46089l-.68109.56855A24,24,0,1,1,208.858,80.97056Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'pizza',
			svg: `<path d="M23.44054,75.69239a8.02578,8.02578,0,0,1,2.13281-10.834,176.07221,176.07221,0,0,1,204.85329,0,8.02577,8.02577,0,0,1,2.13281,10.834L134.74929,229.394a8,8,0,0,1-13.49858,0Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M36.74566,96.60039a144.01884,144.01884,0,0,1,182.50866,0" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M164.31747,182.93292a28.00353,28.00353,0,1,1,28.82269-45.29368" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M57.89918,129.84281A28.00328,28.00328,0,1,1,84,168q-.91436,0-1.81448-.05785" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'crown',
			svg: `</rect><path d="M45.12859,196.01674a8.01266,8.01266,0,0,0,9.97356,5.86223,273.90053,273.90053,0,0,1,145.746-.0138,8.01268,8.01268,0,0,0,9.97132-5.85941l25.48872-108.3169a8,8,0,0,0-11.03641-9.143L174.688,101.02754a8,8,0,0,1-10.24237-3.42535l-29.4524-53.01433a8,8,0,0,0-13.98652,0L91.55434,97.60219A8,8,0,0,1,81.312,101.02754L30.72054,78.54246a8,8,0,0,0-11.03717,9.13973Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'grad-cap',
			svg: `<polygon points="8 96 128 32 248 96 128 160 8 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polygon><polyline points="188 240 188 128 128 96" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><path d="M220,110.93333v54.5208a7.95694,7.95694,0,0,1-1.58951,4.78692C211.67382,179.20536,183.2529,212,128,212s-83.67382-32.79464-90.41049-41.75895A7.95694,7.95694,0,0,1,36,165.45413v-54.5208" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'firstaid',
			svg: `<path d="M96,160H40a8,8,0,0,1-8-8V104a8,8,0,0,1,8-8H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8V96h56a8,8,0,0,1,8,8v48a8,8,0,0,1-8,8H160v56a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V160Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'palette',
			svg: `<path d="M221.61367,149.35463a96.28545,96.28545,0,0,0,2.38287-22.17837c-.44383-52.82934-44.1551-95.70346-96.98364-95.17129a96.01642,96.01642,0,0,0-30.989,186.54089A24.002,24.002,0,0,0,128,195.90236V192a24,24,0,0,1,24-24h46.20931A23.99131,23.99131,0,0,0,221.61367,149.35463Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><circle cx="128" cy="76" r="12"></circle><circle cx="82.96668" cy="102" r="12"></circle><circle cx="82.96668" cy="154" r="12"></circle><circle cx="173.03332" cy="102" r="12"></circle>`
		},
		{
			box: 256,
			name: 'pen',
			svg: `<path d="M92.68629,216H48a8,8,0,0,1-8-8V163.31371a8,8,0,0,1,2.34315-5.65686l120-120a8,8,0,0,1,11.3137,0l44.6863,44.6863a8,8,0,0,1,0,11.3137l-120,120A8,8,0,0,1,92.68629,216Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><polyline points="160 192 200 152 192 120" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="40.50826" y1="160.50826" x2="95.49177" y2="215.49177" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>`
		},
		{
			box: 256,
			name: 'gear',
			svg: `<circle cx="128.00098" cy="128.00195" r="48" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M197.40626,80.65057a83.91174,83.91174,0,0,1,6.28744,10.91L229.64,105.964a103.88962,103.88962,0,0,1,.03183,44.05764L203.71112,164.433a83.912,83.912,0,0,1-6.30466,10.90011l.49943,29.67182a103.88959,103.88959,0,0,1-38.13912,22.05638l-25.46093-15.27692a83.91075,83.91075,0,0,1-12.5921-.01L96.2669,227.04288a103.88979,103.88979,0,0,1-38.171-22.00126l.49974-29.68828a83.91052,83.91052,0,0,1-6.28743-10.91005L26.362,150.0399a103.88962,103.88962,0,0,1-.03182-44.05764L52.29083,91.5709a83.9124,83.9124,0,0,1,6.30466-10.9001L58.09606,50.999A103.88973,103.88973,0,0,1,96.23518,28.94259l25.46094,15.27693a83.91075,83.91075,0,0,1,12.5921.00995L159.73505,28.961a103.88943,103.88943,0,0,1,38.171,22.00126Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'running',
			svg: `<circle cx="152" cy="56" r="24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></circle><path d="M56,101.551s32-29.551,80,8c50.46853,39.48219,80,24,80,24" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M135.07558,108.83476C130.73311,129.2401,101.55844,206.95584,32,200" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M110.64453,161.16016C128.46874,164.96875,176,180,176,232" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'briefcase',
			svg: `<rect x="32.00781" y="72.00005" width="192" height="144" rx="8" stroke-width="16" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" fill="none"></rect><path d="M168,72V56a16,16,0,0,0-16-16H104A16,16,0,0,0,88,56V72" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M224.00806,126.30915A191.11647,191.11647,0,0,1,128,152a191.11667,191.11667,0,0,1-95.99345-25.68239" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="116" y1="120" x2="140" y2="120" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>`
		},
		{
			box: 256,
			name: 'football',
			svg: `<path d="M184.56854,184.56854c-41.52913,41.52913-99.19529,38.21906-126.92237,33.52363a24.07744,24.07744,0,0,1-19.73834-19.73834c-4.69543-27.72708-8.0055-85.39324,33.52363-126.92237S170.62675,33.2124,198.35383,37.90783a24.07744,24.07744,0,0,1,19.73834,19.73834C222.7876,85.37325,226.09767,143.03941,184.56854,184.56854Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="160" y1="96" x2="96" y2="160" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="124.68629" y1="102.05887" x2="153.94113" y2="131.31371" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="102.05887" y1="124.68629" x2="131.31371" y2="153.94113" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="148.22436" y1="36.22436" x2="219.77587" y2="107.77587" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="36.22399" y1="148.22399" x2="107.77612" y2="219.77612" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>`
		},
		{
			box: 256,
			name: 'paint-brush',
			svg: `<path d="M20,216H92a52,52,0,1,0-52-52C40,200,20,216,20,216Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M112.40713,116.15918c19.194-25.86782,68.02669-85.12974,112.56343-85.12974,0,44.53626-59.26065,93.36835-85.12891,112.56282" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M132.9608,90.6464a84.40058,84.40058,0,0,1,32.3928,32.3928" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'code',
			svg: `<polyline points="64 88 16 128 64 168" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><polyline points="192 88 240 128 192 168" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></polyline><line x1="160" y1="40" x2="96" y2="216" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>`
		},
		{
			box: 256,
			name: 'laptop',
			svg: `<path d="M40,176V72A16,16,0,0,1,56,56H200a16,16,0,0,1,16,16V176" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M24,176H232a0,0,0,0,1,0,0v16a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V176A0,0,0,0,1,24,176Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><line x1="144" y1="88" x2="112" y2="88" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line>`
		},
		{
			box: 256,
			name: 'wrench',
			svg: `<path d="M184.99131,37.06756,143.02944,79.02944l5.65685,28.28427,28.28427,5.65685,41.96188-41.96187.0041-.00174a64.02489,64.02489,0,0,1-89.88113,81.03367l.00123-.00214L72.97056,216.97056a24,24,0,0,1-33.94112-33.94112L103.9608,126.944l-.00137.0007a64.02489,64.02489,0,0,1,81.03363-89.88122Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		},
		{
			box: 256,
			name: 'bell',
			svg: `<path d="M56.20305,104A71.899,71.899,0,0,1,128.5484,32.002c39.58967.29432,71.25651,33.20133,71.25651,72.90185V112c0,35.81563,7.49325,56.59893,14.093,67.95814A7.999,7.999,0,0,1,207.01628,192H48.98365A7.99908,7.99908,0,0,1,42.103,179.95641c6.60328-11.35959,14.1-32.1426,14.1-67.95641Z" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M96,192v8a32,32,0,0,0,64,0v-8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path>`
		}
	];
	let displayIcon = icons.find((e) => e.name === name);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={$$props.class}
	{focusable}
	{width}
	{height}
	viewBox="0 0 {displayIcon?.box} {displayIcon?.box}"
	>{@html displayIcon?.svg}
</svg>
