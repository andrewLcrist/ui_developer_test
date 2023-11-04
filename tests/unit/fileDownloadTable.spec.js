import { shallowMount } from "@vue/test-utils";
import { files } from "../consts/FileDownloadTable";
import FileDownloadTable from "@/components/FileDownloadTable.vue";

describe("FileDownloadTable.vue", () => {
  describe("Computed methods", () => {
    it("returns array of capitalized headers based on file keys", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          fileProps: [...files],
        },
      });

      const computedHeaders = wrapper.vm.createHeaders;

      expect(computedHeaders).toEqual(["", "Name", "Device", "Path", "Status"]);
    });
  });
  describe("View", () => {
    it("renders the column headers correctly", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          fileProps: [...files],
        },
      });

      const columnHeadersDOM = wrapper.findAll('[data-testid="table-header"]');
      const columnHeaders = columnHeadersDOM.map((header) => header.text());

      expect(columnHeaders).toHaveLength(5);
      expect(columnHeaders).toEqual(["", "Name", "Device", "Path", "Status"]);
    });
  });
});