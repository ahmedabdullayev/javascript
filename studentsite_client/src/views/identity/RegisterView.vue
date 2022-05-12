<template>
  <div class="container">
    <div class="row">
      <RegisterComponent></RegisterComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import RegisterComponent from "@/components/identity/RegisterComponent.vue";
export default defineComponent({
  name: "RegisterView",
  components: {RegisterComponent}
})
</script>

<style scoped>

</style>