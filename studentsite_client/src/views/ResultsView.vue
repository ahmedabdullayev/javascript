<template>
  <ResultAfterQuizComponent></ResultAfterQuizComponent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import ResultAfterQuizComponent from "../components/ResultAfterQuizComponent.vue";
export default defineComponent({
  name: "ResultsView",
  components: {ResultAfterQuizComponent}
})
</script>

<style scoped>

</style>