<template>
  <DownloadTable />
</template>
<style src="./styles/reset.css"></style>
<style src="./styles/downloadTable.css"></style>

<script>
import DownloadTable from "./components/DownloadTable.vue";

export default {
  name: "App",
  components: {
    DownloadTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
