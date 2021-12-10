<template>
  <section class="field">
    <label class="label" :name="name">{{ name }}</label>
    <div class="control">
      <input
        class="input"
        :type="type"
        :value="modelValue"
        @input="inputHandler"
      />
    </div>
    <p class="is-danger help">{{ error }}</p>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
  },
  setup(_, ctx) {
    const inputHandler = (e: Event) => {
      ctx.emit("update:modelValue", (e.target as HTMLInputElement).value);
    };
    return { inputHandler };
  },
});
</script>
