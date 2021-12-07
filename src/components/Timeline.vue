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
    <a v-for="post in posts" :key="post.id" class="panel-block">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format("Do MMM") }}</div>
    </a>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import moment from "moment";
import { today, thisWeek, thisMonth } from "../mocks";

type Period = "Today" | "This Week" | "This Month";
export default defineComponent({
  name: "Timeline",
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
