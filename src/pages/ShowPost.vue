<template>
  <suspense>
    <template #default>
      <post-viewer />
    </template>

    <template #fallback>
      <the-spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import PostViewer from "@/components/post/PostViewer.vue";
import TheSpinner from "@/components/TheSpinner.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    PostViewer,
    TheSpinner,
  },
});
</script>
