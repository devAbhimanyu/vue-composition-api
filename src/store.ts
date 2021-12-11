import { App, inject, reactive, readonly } from "vue";
import axios from "axios";
import { Post } from "./mocks";

export interface User {
  id: string;
  username: string;
  password: string;
}

export type Author = Omit<User, "password">;

interface BaseState<T> {
  // o(n)
  ids: string[]; // [1, 2, 3, 4]

  // o(1)
  all: Map<string, T>;

  loaded: boolean;
}

type PostState = BaseState<Post>;

interface AuthorsState extends BaseState<Author> {
  currentUserId: string | undefined;
}

interface State {
  posts: PostState;
  authors: AuthorsState;
}
// symbol is always unique
export const storeKey = Symbol("store");

export class Store {
  private state: State;

  constructor(initial: State) {
    this.state = reactive(initial);
  }

  /**
   * @function getter for store state
   * @returns {State} store state
   */
  getState() {
    return readonly(this.state);
  }

  /**
   * @function installing plugin to app instance
   * @param {App} app Vue App
   */
  install(app: App) {
    app.provide(storeKey, this);
  }

  /**
   * @function Fetches posts from api and sets it to state.posts
   */
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

  /**
   * add new post to api and store
   * @param {Post} post new post
   */
  async createPost(post: Post) {
    const { data } = await axios.post<Post>("/posts", post);
    this.state.posts.all.set(data.id, data);
    this.state.posts.ids.push(data.id);
    console.log(data);
  }

  async updatePost(post: Post) {
    const response = await axios.put<Post>("/posts", post);
    this.state.posts.all.set(response.data.id, response.data);
  }

  async createUser(user: User) {
    const { data } = await axios.post<Author>("/users", user);
    this.state.authors.all.set(data.id, data);
    this.state.authors.ids.push(data.id);
    this.state.authors.currentUserId = data.id;
    console.log(this.state.authors);
  }

  async signIn(user: User) {
    // hard code test user as id: 1
    const { data } = await axios.post<Author>("/sign_in", user);
    this.state.authors.all.set("1", data);
    this.state.authors.ids.push("1");
    this.state.authors.currentUserId = "1";
  }

  signOut() {
    this.state.authors.currentUserId = undefined;
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
    currentUserId: "",
  },
});

export const useStore = () => {
  const _store = inject<Store>(storeKey);
  if (!_store) {
    throw Error("Did you forgot to call provide?");
  }

  return _store;
};
