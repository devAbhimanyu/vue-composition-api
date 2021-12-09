import { createApp } from "vue";
import App from "./App.vue";

import { router } from "./router";
import axios from "axios";
import { thisMonth, thisWeek, today } from "./mocks";
import "highlight.js/styles/atom-one-dark.css";

function delay() {
  return new Promise((res) => {
    setTimeout(res, 2200);
  });
}

// @ts-ignore
axios.get = async (url: string) => {
  if (url === "/posts") {
    await delay();
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  }
};

const app = createApp(App);
app.use(router);
app.mount("#app");
