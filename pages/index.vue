<template>
  <!-- <Tutorial /> -->
  <div>
    <div v-for="item in list" :key="item.id">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'IndexPage',
  async asyncData() {
    const { data } = await axios.get('http://localhost:9999/list')

    return { list: data }
  },
}
</script>
