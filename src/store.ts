import { App, inject, reactive, readonly } from "vue";
import axios from "axios";
import { Post } from "./mocks";

export interface User {
  id: string;
  username: string;
  password: string;
}

export type Author = Omit<User, "password">;

interface PostState {
  ids: string[];
  all: Map<string, Post>;
  loaded: boolean;
}
interface BaseState<T> {
  // o(n)
  ids: string[]; // [1, 2, 3, 4]

  // o(1)
  all: Map<string, T>;

  loaded: boolean;
}

type PostsState = BaseState<Post>;
interface AuthorsState extends BaseState<Author> {
  currentUserId: string | undefined;
}

interface State {
  posts: PostState;
  authors: AuthorsState;
}
// symbol is always unique
export const storeKey = Symbol("store");

class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  getState() {
    return readonly(this.state);
  }

  install(app: App) {
    app.provide(storeKey, this);
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

  async createUser(user: User) {
    console.log("user", user);
    // const response = await axios.post<Author>("/users", user);
    // this.state.authors.all.set(response.data.id, response.data);
    // this.state.authors.ids.push(response.data.id);
    // this.state.authors.currentUserId = response.data.id;
    // console.log(this.state.authors);
  }
}

export const store = new Store({
  posts: {
    all: new Map(),
    ids: [],
    loaded: false,
  },
  authors: {
    all: new Map<string, Author>(),
    ids: [],
    loaded: false,
    currentUserId: "1",
  },
});

export const useStore = () => {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error("Did you forgot to call provide?");
  }

  return _store;
};

console.log(store.getState().posts.loaded);
