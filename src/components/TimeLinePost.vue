<template>
  <router-link :to="path" :key="post.id" class="panel-block">
    <div class="is-flex is-flex-direction-column is-align-items-flex-start">
      <a>{{ post.title }}</a>
      <div>{{ post.created.format("Do MMM") }}</div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Post } from "../mocks";

export default defineComponent({
  name: "TimelinePost",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const path = computed(() => {
      return `/posts/${props.post.id}`;
    });
    return { path };
  },
});
</script>

<style scoped></style>
