import { ref } from "vue";
const show = ref(false);
const component = ref();
export function useModal() {
  return {
    show,
    component,
    showModal: () => (show.value = true),
    hidModal: () => (show.value = false),
  };
}
