<template>
  <div class="container">
    <div class="row">
<SubjectListComponent></SubjectListComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import SubjectListComponent from "../components/SubjectListComponent";
export default defineComponent({
  name: "SubjectsView",
  components: {SubjectListComponent}
})
</script>

<style scoped>

</style>