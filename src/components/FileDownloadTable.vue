<template>
  <table>
    <thead>
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
      <tr v-for="(datum, i) in this.files" :key="i">
        <td>
          <label :for="createLabelKey(datum)">
            <input
              :id="createLabelKey(datum)"
              type="checkbox"
              v-model="datum.selected"
              @change="updateSelectAllState"
            />
            <span class="custom-checkbox"></span>
          </label>
        </td>
        <td v-for="(_, j) in this.files" :key="j">
          {{ datum[Object.values(dataKeys)[j]] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      dataKeys: this.dataKeysProp,
      files: structuredClone(this?.filesProp),
    };
  },
  props: {
    dataKeysProp: Object,
    filesProp: Array,
  },
  computed: {
    createHeaders() {
      const headers = ["", ...Object.keys(this?.files[0])];
      return headers.map((header) => {
        return header.length
          ? header.charAt(0).toUpperCase() + header.slice(1)
          : header;
      });
    },
  },
  methods: {
    createLabelKey(datum) {
      return datum[Object.keys(datum)[0]].split(".").join("") + "-checkbox";
    },
  },
};
</script>
