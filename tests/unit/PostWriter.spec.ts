import { mount } from "@vue/test-utils";
import PostWriter from "@/components/post/PostWriter.vue";

describe("PostWriter.vue", () => {
  it("renders today post by default", async () => {
    const wrapper = mount(PostWriter, {
      props: {
        post: {
          title: "New title",
        },
      },
    });
    const title = "New Title";
    await wrapper.find('[data-test="title"]').setValue(title);

    const $content = wrapper.find<HTMLDivElement>(
      '[data-test="contentEditable"]'
    );
    $content.element.innerText = "## New Content";

    await $content.trigger("input");

    setTimeout(async () => {
      await wrapper.find('[data-test="save-btn"]').trigger("click");
      const emitted = (wrapper.emitted()["save"] as any)[0][0];
      expect(emitted.title).toBe(title);
      expect(emitted.markdown).toBe("## New content");
      expect(emitted.html).toBe('<h2 id="new-content">New content</h2>\n');
    });
  });
});
