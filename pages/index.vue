<template>
  <div ref="container" class="container">
    <div v-for="item in list" :key="item.id" class="flex-container">
      <div class="flex-item news-info" @click="onClick">
        <div class="news-title">
          {{ item.title }}
        </div>
        <div class="news-name">
          {{ item.name }}
        </div>
      </div>
      <div class="flex-item news-image">
        <img
          src="../assets/test_image.png"
          width="100px"
          height="100px"
          class="br-4"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
  name: 'IndexPage',

  async asyncData({ store }) {
    const newsList = store.getters.getList || [];
    const scrollInfo = store.getters.getScrollInfo || {
      pos: 0,
      size: 10,
      page: 1,
      total: 0,
    };
    const currentPage = scrollInfo.page;
    let list = [];

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

  computed: {
    ...mapGetters(['getScrollInfo', 'getList']),
  },

  mounted() {
    window.scrollTo(0, this.getScrollInfo.pos);
    document.addEventListener('scroll', this.onScroll);
  },

  destroyed() {
    document.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onClick(e) {
      this.$store.commit('setScrollInfo', {
        ...this.scrollInfo,
      });
      this.$router.push('/detail');
    },
    onScroll(e) {
      const { clientHeight, scrollHeight } = this.$refs.container;

      if (window.scrollY + clientHeight >= scrollHeight) {
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
