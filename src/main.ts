import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import axios from "axios";
import FormInput from "./components/FormInput.vue";
import { random } from "lodash";
import { thisMonth, thisWeek, today } from "./mocks";
import "highlight.js/styles/atom-one-dark.css";
import { Author, store } from "./store";

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

// @ts-ignore
axios.post = async (url: string, payload: any) => {
  if (url === "/posts") {
    await delay();
    const id = random(100, 10000);
    return Promise.resolve({
      data: { ...payload, id },
    });
  }
  if (url === "/users") {
    const id = random(100, 10000);
    await delay();
    const author: Author = {
      id: id.toString(),
      username: payload.username,
    };
    return Promise.resolve({
      data: author,
    });
  }
};

const app = createApp(App);
app.use(router);
app.use(store);
app.component("form-input", FormInput);

app.mount("#app");
