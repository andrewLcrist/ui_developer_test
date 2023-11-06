<template>
  <FileDownloadTable
    :greenMarkKVPs="[{ [DOWNLOADABLE_KEYS.STATUS]: AVAILABLE }]"
    :capitalizedValues="[DOWNLOADABLE_KEYS.STATUS]"
    :filesProp="files"
    :dataKeysProp="DOWNLOADABLE_KEYS"
    :labelKeyProp="DOWNLOADABLE_KEYS.DEVICE"
    :ariaCheckboxKeyProp="DOWNLOADABLE_KEYS.NAME"
    :downloadableQualifier="{
      key: DOWNLOADABLE_KEYS.STATUS,
      value: AVAILABLE,
    }"
  />
</template>
<style src="./styles/reset.css"></style>
<style src="./styles/root.css"></style>

<script>
import FileDownloadTable from "./components/FileDownloadTable.vue";
import { DOWNLOADABLE_KEYS, AVAILABLE } from "./utils/consts/downloadSchema";

export default {
  name: "App",
  components: {
    FileDownloadTable,
  },
  data() {
    return {
      AVAILABLE,
      DOWNLOADABLE_KEYS: DOWNLOADABLE_KEYS,
      files: [
        {
          name: "smss.exe",
          device: "Mario",
          path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
          status: "scheduled",
        },
        {
          name: "netsh.exe",
          device: "Luigi",
          path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
          status: "available",
        },
        {
          name: "uxtheme.dll",
          device: "Peach",
          path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
          status: "available",
        },
        {
          name: "aries.sys",
          device: "Daisy",
          path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
          status: "scheduled",
        },
        {
          name: "cryptbase.dll",
          device: "Yoshi",
          path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
          status: "scheduled",
        },
        {
          name: "7za.exe",
          device: "Toad",
          path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
          status: "scheduled",
        },
      ],
    };
  },
};
</script>
