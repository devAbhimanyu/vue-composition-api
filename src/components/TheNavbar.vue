<template>
  <nav class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <button class="button" data-test="sign-up" @click="show">
          Sign Up
        </button>
        <router-link to="/posts/new" class="button">New Post</router-link>
      </div>
    </div>
  </nav>
  <teleport to="#modal"> <sign-up></sign-up>> </teleport>
</template>

<script lang="ts">
import { useModal } from "@/composable/useModal";
import SignUp from "./SignUp.vue";
export default {
  components: { SignUp },
  setup() {
    const modal = useModal();
    return { show: modal.showModal };
  },
};
</script>
