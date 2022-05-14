<template>
<div></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import router from "@/router";

export default defineComponent({
  name: "LogoutComponent",
  async beforeMount(){
    localStorage.removeItem("user");
    await router.push('/')
  }
});
</script>

<style scoped>

</style>