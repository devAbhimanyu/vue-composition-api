import { reactive, readonly } from "vue";
import axios from "axios";
import { Post } from "./mocks";

interface PostState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}

interface State {
  posts: PostState;
}

class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  getState() {
    return readonly(this.state);
  }

  async fetchPosts() {
    const { data } = await axios.get<Post[]>("/posts");

    const postState: PostState = {
      ids: [],
      all: new Map(),
      loaded: false,
    };

    for (const post of data) {
      postState.ids.push(post.id);
      postState.all.set(post.id, post);
    }
    postState.loaded = true;
    this.state.posts = postState;
  }

  async createPost(post: Post) {
    const { data } = await axios.post<Post>("/posts", post);
    this.state.posts.all.set(data.id, data);
    this.state.posts.ids.push(data.id);
    console.log(data);
  }
}

const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false,
  },
});

export const useStore = () => {
  return store;
};

console.log(store.getState().posts.loaded);
