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
  <div class="columns">
    <div class="column">
      <button @click="save" class="button is-primary is-pulled-right">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from "@/mocks";
import { defineComponent, onMounted, ref, watch } from "vue";
import { parse } from "marked";
import highlight from "highlight.js";
import { debounce } from "lodash";

export default defineComponent({
  name: "PostWriter",
  props: {
    post: {
      type: Object as () => Post,
      required: true,
    },
  },
  emits: {
    save: (post: Post) => {
      return true;
    },
  },
  setup(props, ctx) {
    const { post } = props;
    const { emit } = ctx;
    const title = ref(post.title);
    const content = ref("## Title\nEnter your post content");
    const contentEditable = ref<HTMLDivElement | null>(null);
    const mdString = ref("");

    const parseHtml = (str: string) => {
      mdString.value = parse(str, {
        gfm: true,
        breaks: true,
        highlight: (code: string) => {
          return highlight.highlightAuto(code).value;
        },
      });
    };

    watch(
      content,
      debounce((newContent) => {
        parseHtml(newContent);
      }, 250),
      {
        immediate: true,
      }
    );

    function inputHandler() {
      if (contentEditable.value?.textContent)
        content.value = contentEditable.value.innerText;
      else content.value = "";
    }

    onMounted(() => {
      if (contentEditable.value)
        contentEditable.value.textContent = content.value;
    });

    const save = () => {
      const newPost: Post = {
        ...post,
        title: title.value,
        html: mdString.value,
        markdown: content.value,
      };
      emit("save", newPost);
    };
    return { title, content, contentEditable, inputHandler, mdString, save };
  },
});
</script>

<style>
.column {
  overflow-y: scroll;
}
</style>
