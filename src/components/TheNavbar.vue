<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" @click="show">Sign Up</button>
        <router-link to="/posts/new" class="button">New Post</router-link>
      </div>
    </div>
  </nav>
  <teleport to="#modal">
    <div>Modal</div>
  </teleport>
</template>

<script lang="ts">
import { useModal } from "@/composable/useModal";
export default {
  setup() {
    const modal = useModal();
    return { show: modal.showModal };
  },
};
</script>
