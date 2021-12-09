<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">New Post</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="inputHandler"></div>
    </div>
    <div class="column">
      <div v-html="mdString"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/mocks";
import { defineComponent, onMounted, ref, watch, watchEffect } from "vue";
import { parse } from "marked";
export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  setup(props) {
    const { post } = props;
    const title = ref(post.title);
    const content = ref("## Title\nEnter your post content");
    const contentEditable = ref<HTMLDivElement | null>(null);
    const mdString = ref("");

    watchEffect(() => {
      mdString.value = parse(content.value);
    });
    // both are the same same but watchEffect is cleaner
    // watch(
    //   content,
    //   (newContent) => {
    //     mdString.value = parse(newContent);
    //   },
    //   {
    //     immediate: true,
    //   }
    // );

    console.log(mdString.value);
    function inputHandler() {
      if (contentEditable.value?.textContent)
        content.value = contentEditable.value.innerText;
    }

    onMounted(() => {
      if (contentEditable.value)
        contentEditable.value.textContent = content.value;
    });

    return { title, content, contentEditable, inputHandler, mdString };
  },
});
</script>

<style></style>
