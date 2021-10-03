<script>
  import ItemList from './components/ItemList.svelte'

  import { page } from './store.js'
  let vegetables = [
    {
      id: 'carrot1',
      name: 'Carrot',
      type: 'vegetable',
      price: 20,
      unit: 'kg',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaU1uIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--20f4a81c732575b1f8c9d008c5a1950969375e56/111-1115732_carrots-png-image-transparent-carrots-png-png-download.png',
    },
    {
      id: 'tomato1',
      name: 'Tomato',
      type: 'vegetable',
      price: 25,
      unit: 'kg',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUVuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d37d4a94951d30cfa604b85536f7be499df8b244/Tomatoes.jpg',
    },
    {
      id: 'potato1',
      name: 'Potato',
      type: 'vegetable',
      price: 18,
      unit: 'gram',
      amount: 700,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDhuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d689a6524875ed852e338723c79884b7f226a3e7/Potato_potato.jpg',
    },
    {
      id: 'seem1',
      name: 'Seem',
      type: 'vegetable',
      price: 18,
      unit: 'gram',
      amount: 500,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVluIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--af89ebe642514d6d2b9c93b060f78c54441103de/seam.jpg',
    },
    {
      id: 'tomato2',
      name: 'Green Tomato',
      type: 'vegetable',
      price: 18,
      unit: 'gram',
      amount: 500,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVVuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--526ab354dec5efe47bc84d8575393b4a2c2effb6/green%20tomato.jpg',
    },

    {
      id: 'pumpkin1',
      name: 'Pumpkin',
      type: 'vegetable',
      price: 30,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVFuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--36e860d1dc2c5f97bdaffc4eb16915c9bd648cd5/pumpkin.jpg',
    },
    {
      id: 'pea1',
      name: 'Green Peas',
      type: 'vegetable',
      price: 30,
      unit: 'gram',
      amount: 500,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaUFuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--af0438a550c2c326284a8bdcdda70efe80981ddb/Green-peas.jpg',
    },
    {
      id: 'cauliflower1',
      name: 'Cauliflower',
      type: 'vegetable',
      price: 40,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDRuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--db6e95cc6ffe7213ad6a04f84e7f969d047b0378/cauliflower-1agz939.jpg',
    },
    {
      id: 'cabbage1',
      name: 'Cabbage',
      type: 'vegetable',
      price: 30,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDBuIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e363a24293005e4f2579cd986cda58750d5679e4/500_500_productGfx_e5df68652cd293bec313bfc66dedde81.jpg',
    },
  ]
  let fishes = [
    {
      id: 'rui1',
      name: 'Rui (1.5 kg)',
      type: 'fish',
      price: 280,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTRKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--169c1586251e9357da7bcbe58a1581b5b134d7e6/rui.jpg',
    },
    {
      id: 'rui2',
      name: 'Rui (700 gram)',
      type: 'fish',
      price: 200,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaTRKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--169c1586251e9357da7bcbe58a1581b5b134d7e6/rui.jpg',
    },
    {
      id: 'katla1',
      name: 'Katla (700 gram)',
      type: 'fish',
      price: 150,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazRKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--759e97c1bd0b29cdb780cd970261c579cd1de8f7/bd3d66a6d8a665973ea23c02cdf1b78b.jpg',
    },
    {
      id: 'katla2',
      name: 'Katla (2 kg)',
      type: 'fish',
      price: 300,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBazRKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--759e97c1bd0b29cdb780cd970261c579cd1de8f7/bd3d66a6d8a665973ea23c02cdf1b78b.jpg',
    },
  ]
  let meats = [
    {
      id: 'goat1',
      name: 'Goat',
      type: 'meat',
      price: 900,
      unit: 'kg',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaklKIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--210cd87a72aae28f88d73cd0a4a952ac39699221/frozen-goat-meat-1510206203-3440949.jpeg',
    },
    {
      id: 'chicken1',
      name: 'Sonali chicken',
      type: 'meat',
      price: 350,
      unit: 'pc',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBak1KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2d59d3db62caa926e4df64696bd07b6aac974e2d/raw-chicken-meat-white-background_58830-687.jpg',
    },
    {
      id: 'beef1',
      name: 'Beef',
      type: 'meat',
      price: 600,
      unit: 'kg',
      amount: 1,
      img:
        'https://ifarmer.asia/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaU1KIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--11cadbf4ae3e3456dcb1718059d60a37d91ee611/greggr151100379.jpg',
    },
  ]
</script>

<ItemList title={'Choose Fish'} bind:items={fishes} />
{#if $page == 'chooseVeg'}
  <ItemList title={'Choose Vegetable'} bind:items={vegetables} />
{:else if $page == 'chooseFish'}
  <ItemList title={'Choose Fish'} bind:items={fishes} />
{:else if $page == 'chooseMeat'}
  <ItemList title={'Choose Fish'} bind:items={meats} />
{/if}
