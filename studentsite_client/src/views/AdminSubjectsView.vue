<template>
  <div class="container">
    <div class="row">
      <AddSubjectComponent></AddSubjectComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddSubjectComponent from "@/components/AddSubjectComponent.vue";
export default defineComponent({
  name: "AdminSubjectsView",
  components: {AddSubjectComponent}
})
</script>

<style scoped>

</style>