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
            :for="`${datum[labelKeyProp]}-checkbox`"
          >
            <input
              :id="`${datum[labelKeyProp]}-checkbox`"
              type="checkbox"
              v-model="datum.selected"
              @change="updateSelectAllState"
            />
            <span class="custom-checkbox"></span>
          </label>
        </td>
        <td
          v-for="(dataKey, j) in Object.values(dataKeysProp)"
          :key="j"
          :class="{
            capitalize: capitalizeContent(j),
            'green-mark': includeGreenMark(datum, j),
          }"
        >
          {{ datum[Object.values(dataKeysProp)[j]] }}
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
      files: structuredClone(this?.filesProp),
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
    capitalizeContent(jIndex) {
      return this.capitalizedValues.includes(
        Object.values(this.dataKeysProp)[jIndex]
      );
    },
    downloadSelected() {
      const selectedFiles = this.files.filter((item) => item.selected);
      if (selectedFiles.length > 0) {
        const alertMessage = selectedFiles
          .map((file) => `Path: ${file.path}, Device: ${file.device}`)
          .join("\n");

        alert(alertMessage);
      }
    },
    includeGreenMark(datum, jIndex) {
      return this.greenMarkKVPs.find((item) => {
        const matchObject = {
          [Object.values(this.dataKeysProp)[jIndex]?.toLowerCase()]:
            datum[Object.values(this.dataKeysProp)[jIndex]]?.toLowerCase(),
        };
        return JSON.stringify(item) === JSON.stringify(matchObject);
      });
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
