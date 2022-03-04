<template>
  <div ref="container" class="container">
    <div style="width: 160px; height: 80px">
      <img src="../assets/logo.png" width="100%" height="100%" />
    </div>

    <div
      v-for="item in list"
      :key="item.id"
      class="grid-container"
      @click="onClick"
    >
      <div class="grid-item item1">{{ item.title }}</div>
      <div class="grid-item item2">{{ item.image }}</div>
      <div class="grid-item item3">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  name: 'IndexPage',
  data() {
    return {};
  },
  async asyncData({ store }) {
    console.log('asyncData', store.getters.getList);
    const newsList = store.getters.getList || [];
    const scrollInfo = store.getters.getScrollInfo || {
      pos: 0,
      size: 10,
      page: 1,
      total: 0,
    };
    const currentPage = scrollInfo.page;
    // const size = 10;
    // const page = 1;
    // const scrollPos = 0;
    let list = [];
    // let total = 0;

    if (_.isEmpty(newsList)) {
      const response = await axios.get(
        `http://localhost:9999/list?_limit=${scrollInfo.size * scrollInfo.page}`
      );

      list = _.cloneDeep(response.data);
      scrollInfo.total = Number(response.headers['x-total-count']);

      store.commit('setList', response.data);
    } else {
      list = _.cloneDeep(newsList);
    }

    return { list, scrollInfo, currentPage };
  },

  mounted() {
    window.scrollTo(0, this.getScrollInfo.pos);
    document.addEventListener('scroll', this.onScroll);
  },

  destroyed() {
    document.removeEventListener('scroll', this.onScroll);
  },

  computed: {
    ...mapGetters(['getScrollPosition', 'getScrollInfo', 'getList']),
  },
  methods: {
    onClick(e) {
      this.$store.commit('setScrollInfo', {
        ...this.scrollInfo,
      });
      this.$router.push('/detail');
    },
    onScroll(e) {
      console.log(this.$refs.container);

      const { clientHeight, scrollHeight } = this.$refs.container;

      if (window.scrollY + clientHeight >= scrollHeight) {
        console.log('끝');
        if (!this.isScrollEnded) {
          this.getNewsList(this.currentPage++);
        }
      }
    },
    async getNewsList(page = 1) {
      const limit = page * this.scrollInfo.size;

      this.isScrollEnded = this.scrollInfo.total < limit;

      if (!this.isScrollEnded) {
        const response = await axios.get(
          `http://localhost:9999/list?_limit=${limit}`
        );

        this.list = _.cloneDeep(response.data);
        this.$store.commit('setTotalCount', response.headers['x-total-count']);
        this.$store.commit('setList', response.data);
        this.$store.commit('setCurrentPage', this.currentPage);
        this.$store.commit('setScrollInfo', {
          ...this.scrollInfo,
        });
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