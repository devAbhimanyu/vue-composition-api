<template>
  new post
  <post-writer :post="newPost" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PostWriter from "@/components/PostWriter.vue";
import { Post } from "@/mocks";
import moment from "moment";

export default defineComponent({
  name: "NewPost",
  components: {
    PostWriter,
  },
  setup() {
    const newPost: Post = {
      id: "12",
      title: "test post",
      created: moment(),
    };
    return { newPost };
  },
});
</script>

<style></style>
