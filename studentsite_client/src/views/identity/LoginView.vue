<template>
  <div class="container">
    <div class="row">
  <LoginComponent></LoginComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import LoginComponent from "@/components/identity/LoginComponent.vue";
export default defineComponent({
  name: "LoginView",
  components: {LoginComponent}
})
</script>

<style scoped>

</style>