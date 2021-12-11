<template>
  <section :style="style" class="modal">
    <div class="modal-background">
      <div class="modal-content">
        <div id="modal"></div>
      </div>
      <button @click="closeModal" class="modal-close is-large"></button>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <the-navbar />
      <router-view></router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import TheNavbar from "./components/TheNavbar.vue";
import { useModal } from "./composable/useModal";
export default defineComponent({
  name: "App",
  components: {
    TheNavbar,
  },
  setup() {
    const modal = useModal();
    const username = ref("enter name");
    const style = computed(() => {
      return {
        display: modal.show.value ? "block" : "none",
      };
    });

    const closeModal = modal.hideModal;

    return { style, closeModal, username };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
