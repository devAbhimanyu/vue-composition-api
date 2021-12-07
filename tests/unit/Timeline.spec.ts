import { mount } from "@vue/test-utils";
import Timeline from "@/components/Timeline.vue";
import { thisMonth, thisWeek, today } from "../../src/mocks";
describe("Timeline.vue", () => {
  it("renders today post by default", () => {
    const wrapper = mount(Timeline);
    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
  });

  it("update when the 'This Week' is clicked", async () => {
    const wrapper = mount(Timeline);

    await wrapper.get('[data-test="This Week"]').trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
  });

  it("update when the 'This Month' is clicked", async () => {
    const wrapper = mount(Timeline);

    await wrapper.get('[data-test="This Month"]').trigger("click");

    expect(wrapper.html()).toContain(today.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisWeek.created.format("Do MMM"));
    expect(wrapper.html()).toContain(thisMonth.created.format("Do MMM"));
  });
});
