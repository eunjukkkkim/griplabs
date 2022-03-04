<template>
  <!-- <client-only> -->
  <div ref="container" class="container">
    <div style="width: 160px; height: 80px">
      <img src="../assets/logo.png" width="100%" height="100%" />
    </div>

    <div v-for="item in list" :key="item.id" class="grid-container">
      <div class="grid-item item1" @click="onClick">{{ item.title }}</div>
      <div class="grid-item item2">{{ item.image }}</div>
      <div class="grid-item item3">{{ item.name }}</div>
    </div>
  </div>
  <!-- </client-only> -->
</template>

<script>
import * as _ from 'lodash';
import axios from 'axios';
export default {
  name: 'IndexPage',
  data() {
    return {
      // size: 2,
      // page: 1,
    };
  },
  async asyncData() {
    const size = 10;
    const page = 1;
    const response = await axios.get(
      `http://localhost:9999/list?_limit=${size * page}`
      // 'http://localhost:9999/list '
    );

    // for (let idx = 35; idx < 100; idx++) {
    //   await axios.post('http://localhost:9999/list', {
    //     title: 'title' + idx,
    //     name: 'name' + idx,
    //     image: 'image' + idx,
    //   })
    // }

    const { list: data, headers } = response;
    const total = Number(headers['x-total-count']);

    return { list: data, size, page, total };
  },

  mounted() {
    document.addEventListener('scroll', this.onScroll);
  },

  methods: {
    onClick(e) {
      this.$router.push('/detail');
    },
    onScroll(e) {
      // console.log(
      //   '--',
      //   window.scrollY,
      //   this.$refs.container.clientHeight,
      //   this.$refs.container.scrollHeight
      // )

      const { clientHeight, scrollHeight } = this.$refs.container;
      // console.log('------', target, target.clientHeight, target.scrollHeight)

      if (window.scrollY + clientHeight >= scrollHeight) {
        console.log('끝');
        this.getList(this.page++);
      }
    },
    async getList(page = 1) {
      const limit = page * this.size;

      if (this.total >= limit) {
        const { data } = await axios.get(
          `http://localhost:9999/list?_limit=${limit}`
        );

        // if (!_.isEmpty(response.data) && this.total >= limit) {
        // this.list = _.cloneDeep(response.data);
        this.list = _.cloneDeep(data);
        // }
      }
    },
  },
};
</script>
<style scoped>
.container {
  padding: 20px;
  height: 100vh;
}
.item {
  width: 40px;
  height: 40px;
  border: 1px solid black;
}

.grid-container {
  display: grid;
  gap: 5px;
  height: 180px;
  background-color: #2196f3;
  padding: 5px;
  margin: 15px 0 5px 0;
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