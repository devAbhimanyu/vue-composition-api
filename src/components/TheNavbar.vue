<template>
  <nav class="navbar">
    <router-link to="/">Home</router-link>
    <div class="navbar-end">
      <div v-if="auth" class="buttons">
        <router-link class="button" to="/posts/new"> New Post </router-link>

        <button class="button" @click="signOut">Sign Out</button>
      </div>
      <div v-else class="buttons">
        <button class="button" data-test="sign-up" @click="signUp">
          Sign Up
        </button>

        <button class="button" @click="signIn">Sign In</button>
      </div>
    </div>
  </nav>
  <teleport to="#modal"><component :is="component" /></teleport>
</template>

<script lang="ts">
import { defineComponent, h, markRaw } from "vue";
import { useModal } from "../composable/useModal";
import SignUp from "./auth/SignUp.vue";
import Signin from "./auth/Signin.vue";

import { useStore } from "../store";
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default defineComponent({
  components: { SignUp },
  setup() {
    const modal = useModal();
    const store = useStore();
    const router = useRouter();
    const auth = computed(() => {
      return !!store.getState().authors.currentUserId;
    });

    const signIn = () => {
      modal.component.value = markRaw(Signin);
      modal.showModal();
    };
    const signOut = () => {
      store.signOut();
      router.push("/");
    };
    const signUp = () => {
      modal.component.value = markRaw(SignUp);
      modal.showModal();
    };

    return { component: modal.component, auth, signUp, signIn, signOut };
  },
});
</script>
