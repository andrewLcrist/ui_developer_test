import { shallowMount } from "@vue/test-utils";
import DownloadTable from "@/components/DownloadTable.vue";

describe("DownloadTable.vue", () => {
  it("renders hello 'first test'", () => {
    const wrapper = shallowMount(DownloadTable);
    console.log("www", wrapper.find("div").text());
    expect(wrapper.find("div").text()).toMatch("first test");
  });
});
