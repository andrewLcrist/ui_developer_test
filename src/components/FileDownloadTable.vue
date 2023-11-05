<template>
  <table id="table">
    <thead>
      <tr>
        <th colspan="5">
          <div class="ib" id="select-all-container">
            <label class="checkbox-label-container" for="select-all">
              <input
                id="select-all"
                type="checkbox"
                v-model="selectAllState"
                @change="selectAllfiles"
              />
              <span
                id="select-all-span"
                :class="[
                  'custom-checkbox',
                  selectAllState === null && 'indeterminate',
                ]"
              ></span>
            </label>
            <p id="select-all-desc" data-testid="selected-count">
              {{ selectedCountText }}
            </p>
          </div>
          <div
            id="download-selected"
            role="button"
            class="ib"
            @click="downloadSelected"
            :disabled="selectedCount === 0"
          >
            <div class="download-icon ib">
              <div class="arrow-down"></div>
              <div class="tray"></div>
            </div>
            <p class="ib">Download Selected</p>
          </div>
        </th>
      </tr>
      <tr>
        <th
          v-for="(header, i) in createHeaders"
          :key="i"
          data-testid="table-header"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        id="table-row"
        :class="{ 'selected-row': datum.selected }"
        v-for="(datum, i) in this.files"
        :key="i"
      >
        <td>
          <label
            class="checkbox-label-container"
            :for="`${datum[labelKey]}-checkbox`"
          >
            <input
              :id="`${datum[labelKey]}-checkbox`"
              type="checkbox"
              v-model="datum.selected"
              @change="updateSelectAllState"
            />
            <span class="custom-checkbox"></span>
          </label>
        </td>
        <td
          v-for="(_, j) in Object.keys(dataKeys).length"
          :key="j"
          :class="{
            capitalize: capitalizedValues.includes(Object.values(dataKeys)[j]),
            'green-mark': greenMarkKVPs.find((item) => {
              const matchObject = {
                [Object.values(dataKeys)[j]?.toLowerCase()]:
                  datum[Object.values(dataKeys)[j]]?.toLowerCase(),
              };
              return JSON.stringify(item) === JSON.stringify(matchObject);
            }),
          }"
        >
          {{ datum[Object.values(dataKeys)[j]] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style src="@/styles/fileDownloadTable.css"></style>

<script>
export default {
  data() {
    return {
      dataKeys: this.dataKeysProp,
      files: structuredClone(this?.filesProp),
      labelKey: this.labelKeyProp,
      selectAllState: false,
    };
  },
  props: {
    greenMarkKVPs: Array,
    capitalizedValues: Array,
    dataKeysProp: Object,
    filesProp: Array,
    labelKeyProp: String,
  },
  computed: {
    createHeaders() {
      const headers = ["", ...Object.keys(this.filesProp[0])];
      return headers.map((header) => {
        return header.length
          ? header.charAt(0).toUpperCase() + header.slice(1)
          : header;
      });
    },
    selectedCount() {
      return this.files.filter((item) => item.selected).length;
    },
    selectedCountText() {
      if (this.selectedCount === 0) {
        return "None Selected";
      } else {
        return `Selected ${this.selectedCount}`;
      }
    },
  },
  methods: {
    downloadSelected() {
      const selectedFiles = this.files.filter((item) => item.selected);
      if (selectedFiles.length > 0) {
        const alertMessage = selectedFiles
          .map((file) => `Path: ${file.path}, Device: ${file.device}`)
          .join("\n");

        alert(alertMessage);
      }
    },
    selectAllfiles() {
      if (this.selectAllState) {
        this.files.forEach((item) => (item.selected = true));
      } else {
        this.files.forEach((item) => (item.selected = false));
      }
    },
    updateSelectAllState() {
      if (this.selectedCount === 0) {
        this.selectAllState = false;
      } else if (this.selectedCount === this.files.length) {
        this.selectAllState = true;
      } else {
        this.selectAllState = null;
      }
    },
  },
};
</script>
