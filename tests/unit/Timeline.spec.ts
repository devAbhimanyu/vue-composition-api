import { Store, Author } from "../../src/store";
import { mount, flushPromises } from "@vue/test-utils";
import Timeline from "../../src/components/Timeline.vue";
import { thisMonth, thisWeek, today } from "../../src/mocks";

jest.mock("axios", () => ({
  get: (url: string) => {
    return Promise.resolve({
      data: [today, thisWeek, thisMonth],
    });
  },
}));

function mountTimeline() {
  const store = new Store({
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
  const comp = {
    components: { Timeline },
    template: `
    <suspense>
    <template #default>
      <timeline />
    </template>
  </suspense>
    `,
  };
  return mount(comp, {
    global: {
      plugins: [store],
    },
  });
}

describe("Timeline.vue", () => {
  it("renders today post by default", async () => {
    const wrapper = mountTimeline();
    await flushPromises();
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });

  it("update when the 'This Week' is clicked", async () => {
    const wrapper = mountTimeline();
    await flushPromises();
    await wrapper.get('[data-test="This Week"]').trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("update when the 'This Month' is clicked", async () => {
    const wrapper = mountTimeline();
    await flushPromises();
    await wrapper.get('[data-test="This Month"]').trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  });
});
