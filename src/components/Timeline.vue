<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        :key="period"
        @click="setCurrentPeriod(period)"
        :class="{ 'is-active': period === currentPeriod }"
        :data-test="period"
        >{{ period }}</a
      >
    </span>
    <time-line-post v-for="post in posts" :post="post" :key="post.id" />
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import moment from "moment";
import { today, thisWeek, thisMonth, Post } from "../mocks";
import TimeLinePost from "./TimeLinePost.vue";
import { useStore } from "../store";
type Period = "Today" | "This Week" | "This Month";

export default defineComponent({
  name: "Timeline",
  components: {
    TimeLinePost,
  },
  async setup() {
    const periods = ["Today", "This Week", "This Month"];
    const currentPeriod = ref<Period>("Today");
    const store = useStore();
    if (!store.getState().posts.loaded) await store.fetchPosts();
    const allPosts = store.getState().posts.ids.reduce<Post[]>((acc, id) => {
      const thePost = store.getState().posts.all.get(id);
      if (!thePost) {
        throw Error("The post is not present");
      }
      return acc.concat(thePost);
    }, []);
    const posts = computed(() => {
      return allPosts.filter((post) => {
        const { value } = currentPeriod;
        if (value === "Today") {
          return post.created.isAfter(moment().subtract(1, "day"));
        }
        if (value === "This Week") {
          return post.created.isAfter(moment().subtract(1, "week"));
        }
        if (value === "This Month") {
          return post.created.isAfter(moment().subtract(1, "month"));
        }
      });
    });

    const setCurrentPeriod = (period: Period) => {
      currentPeriod.value = period;
    };
    return { periods, currentPeriod, posts, setCurrentPeriod };
  },
});
</script>

<style scoped></style>
