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
import { today, thisWeek, thisMonth } from "../mocks";
import TimeLinePost from "./TimeLinePost.vue";

type Period = "Today" | "This Week" | "This Month";
export default defineComponent({
  name: "Timeline",
  components: {
    TimeLinePost,
  },
  setup() {
    const periods = ["Today", "This Week", "This Month"];
    const currentPeriod = ref<Period>("Today");

    const posts = computed(() => {
      return [today, thisWeek, thisMonth].filter((post) => {
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
