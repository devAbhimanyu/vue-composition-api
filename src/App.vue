<template>
  <section class="section">
    <div class="container">
      <suspense>
        <template #default>
          <timeline />
        </template>
        <template #fallback>
          <the-spinner></the-spinner>
        </template>
      </suspense>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Timeline from "./components/Timeline.vue";
import TheSpinner from "./components/TheSpinner.vue";
export default defineComponent({
  name: "App",
  components: {
    Timeline,
    TheSpinner,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
