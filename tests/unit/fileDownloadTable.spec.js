import { shallowMount } from "@vue/test-utils";
import { files } from "../consts/FileDownloadTable";
import FileDownloadTable from "@/components/FileDownloadTable.vue";
import { DOWNLOADABLE_KEYS } from "@/utils/consts/downloadSchema";

describe("FileDownloadTable.vue", () => {
  describe("Computed methods", () => {
    it("createHeaders returns array of capitalized headers based on file keys", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          dataKeysProp: DOWNLOADABLE_KEYS,
          filesProp: [...files],
        },
      });

      const computedHeaders = wrapper.vm.createHeaders;

      expect(computedHeaders).toEqual(["", "Name", "Device", "Path", "Status"]);
    });
  });

  describe("View table", () => {
    it("renders the column headers correctly", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          dataKeysProp: DOWNLOADABLE_KEYS,
          filesProp: [...files],
        },
      });

      const columnHeadersDOM = wrapper.findAll('[data-testid="table-header"]');
      const columnHeaders = columnHeadersDOM.map((header) => header.text());

      expect(columnHeaders).toHaveLength(5);
      expect(columnHeaders).toEqual(["", "Name", "Device", "Path", "Status"]);
    });
    describe("Select All Toggle", () => {
      it('toggles "Select All" checkbox when clicked', async () => {
        const labelKeyProp = DOWNLOADABLE_KEYS.DEVICE;
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
            labelKeyProp,
          },
        });

        const filesCheckboxClasses = files.map((datum) => {
          return `#${datum[labelKeyProp]}-checkbox`;
        });
        const selectAllCheckbox = wrapper.find("#select-all");
        const individualCheckboxes = filesCheckboxClasses.map((name) => {
          return wrapper.find(name);
        });

        await selectAllCheckbox.setChecked(true);

        expect(selectAllCheckbox.element.checked).toBe(true);

        individualCheckboxes.forEach((checkboxWrapper) => {
          expect(checkboxWrapper?.element?.checked).toBe(true);
        });
      });

      it('displays "None Selected" when none are selected', async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
          },
        });

        const selectedCount = wrapper.find('[data-testid="selected-count"]');

        expect(selectedCount.element.textContent).toBe("None Selected");
      });

      it("displays files length when select all is true", async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
          },
        });

        const selectAllCheckbox = wrapper.find("#select-all");
        const selectedCount = wrapper.find('[data-testid="selected-count"]');
        const filesLength = files.length;

        await selectAllCheckbox.setChecked(true);

        expect(selectedCount.element.textContent).toBe(
          `Selected ${filesLength}`
        );
      });
    });
    describe("Download functionality", () => {
      it('disables "Download Selected" button when no items are selected', async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
          },
        });

        const downloadButton = wrapper.find("#download-selected");
        expect(downloadButton.attributes("disabled")).toBeTruthy();
      });

      it('displays an alert box with selected file information when "Download Selected" is clicked', async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
          },
        });
        const selectAllCheckbox = wrapper.find("#select-all");

        const alertSpy = jest.spyOn(window, "alert");
        const downloadButton = wrapper.find("#download-selected");

        await selectAllCheckbox.setChecked(true);
        await downloadButton.trigger("click");

        expect(alertSpy).toHaveBeenCalled();
      });
    });
  });
});
