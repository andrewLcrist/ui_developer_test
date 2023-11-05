import { shallowMount } from "@vue/test-utils";
import { files } from "../consts/FileDownloadTable";
import FileDownloadTable from "@/components/FileDownloadTable.vue";
import { DOWNLOADABLE_KEYS } from "@/utils/consts/downloadSchema";

const labelKeyProp = DOWNLOADABLE_KEYS.DEVICE;

describe("FileDownloadTable.vue", () => {
  describe("Computed methods", () => {
    it("createHeaders returns array of capitalized headers based on file keys", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
          capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
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
          greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
          capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
          dataKeysProp: DOWNLOADABLE_KEYS,
          filesProp: [...files],
        },
      });

      const columnHeadersDOM = wrapper.findAll('[data-testid="table-header"]');
      const columnHeaders = columnHeadersDOM.map((header) => header.text());

      expect(columnHeaders).toHaveLength(5);
      expect(columnHeaders).toEqual(["", "Name", "Device", "Path", "Status"]);
    });

    it("adds a 'green-mark' class on fields as assigned per the prop", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
          capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
          dataKeysProp: DOWNLOADABLE_KEYS,
          filesProp: [...files],
        },
      });

      const availableTd = wrapper.find(".green-mark");

      expect(availableTd.text()).toEqual("available");
    });
    it("adds 'capitalize' class on fields as assigned per the prop", () => {
      const wrapper = shallowMount(FileDownloadTable, {
        propsData: {
          greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
          capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
          dataKeysProp: DOWNLOADABLE_KEYS,
          filesProp: [files[0]],
        },
      });

      const availableTd = wrapper.find(
        `[data-testid="${DOWNLOADABLE_KEYS.STATUS}"]`
      );

      expect(availableTd.text()).toEqual("scheduled");
    });
    describe("Select All Toggle", () => {
      it('toggles "Select All" checkbox when clicked', async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
            labelKeyProp,
          },
        });

        const fileCheckboxIds = files.map((datum) => {
          return `#${datum[labelKeyProp]}-checkbox`;
        });
        const selectAllCheckbox = wrapper.find("#select-all");
        const individualCheckboxes = fileCheckboxIds.map((name) => {
          return wrapper.find(name);
        });

        individualCheckboxes.forEach((checkboxWrapper) => {
          expect(checkboxWrapper?.element?.checked).toBe(false);
        });

        await selectAllCheckbox.setChecked(true);

        expect(selectAllCheckbox.element.checked).toBe(true);
        individualCheckboxes.forEach((checkboxWrapper) => {
          expect(checkboxWrapper?.element?.checked).toBe(true);
        });
      });

      it('displays "None Selected" when none are selected', () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
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
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
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

      it('displays the "Select All" button in the indeterminate state when some items are selected', async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
            labelKeyProp,
          },
        });

        const marioCheckbox = wrapper.find("#Mario-checkbox");
        const selectAllSpan = wrapper.find("#select-all-span");

        await marioCheckbox.setChecked("true");

        expect(selectAllSpan.classes()).toContain("indeterminate");
      });

      it('displays the "Select All" button in the checked state when all items are selected', async () => {
        let individualCheckboxes = [];

        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
            dataKeysProp: DOWNLOADABLE_KEYS,
            filesProp: [...files],
            labelKeyProp,
          },
        });

        const fileCheckboxIds = files.map((datum) => {
          return `#${datum[labelKeyProp]}-checkbox`;
        });

        for await (let id of fileCheckboxIds) {
          individualCheckboxes.push(wrapper.find(id));
        }

        for await (let cbox of individualCheckboxes) {
          cbox.setChecked(true);
        }

        const selectAllCheckbox = wrapper.find("#select-all");

        expect(selectAllCheckbox.element.checked).toBe(true);
      });
    });
    describe("Download functionality", () => {
      it('disables "Download Selected" button when no items are selected', async () => {
        const wrapper = shallowMount(FileDownloadTable, {
          propsData: {
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
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
            greenMarkKVPs: [{ [DOWNLOADABLE_KEYS.STATUS]: "available" }],
            capitalizedValues: [DOWNLOADABLE_KEYS.STATUS],
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
