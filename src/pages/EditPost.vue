<template>
  <suspense>
    <template #default>
      <post-editor />
    </template>

    <template #fallback>
      <the-spinner />
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostEditor from "../components/post/PostEditor.vue";
import TheSpinner from "../components/TheSpinner.vue";

export default defineComponent({
  components: {
    PostEditor,
    TheSpinner,
  },
});
</script>
