<template>
  <suspense>
    <template #default>
      <timeline />
    </template>
    <template #fallback>
      <the-spinner></the-spinner>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "../components/Timeline.vue";
import TheSpinner from "../components/TheSpinner.vue";
export default defineComponent({
  name: "Home",
  components: {
    Timeline,
    TheSpinner,
  },
});
</script>
