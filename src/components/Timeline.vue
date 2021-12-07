<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods" :key="period">{{ period }}</a>
    </span>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Timeline",
  setup() {
    const periods = ["Today", "This Week", "This Month"];

    return { periods };
  },
});
</script>

<style scoped></style>
