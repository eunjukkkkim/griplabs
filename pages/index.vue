<template>
  <div class="container">
    <div v-for="item in list" :key="item.id" class="grid-container">
      <div class="grid-item item1">{{ item.title }}</div>
      <div class="grid-item item2">{{ item.image }}</div>
      <div class="grid-item item3">{{ item.name }}</div>
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
<style scoped>
.container {
  height: 100vh;
  display: grid;
}
.item {
  width: 40px;
  height: 40px;
  border: 1px solid black;
}

.grid-container {
  display: grid;
  gap: 10px;
  background-color: #2196f3;
  padding: 10px;
  margin-bottom: 10px;
}

.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px;
  font-size: 30px;
}

.item1,
.item3 {
  grid-column: 1 / span 2;
}

.item2 {
  grid-column: 3;
  grid-row: 1 / span 2;
}
</style>