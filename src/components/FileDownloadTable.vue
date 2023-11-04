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
  </table>
</template>

<script>
export default {
  data() {
    return {
      files: structuredClone(this?.filesProp),
    };
  },
  props: {
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
};
</script>
