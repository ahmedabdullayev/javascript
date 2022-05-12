<template>
  <div class="container">
    <div class="row">
      <h1 class="text-center">Quizzes</h1>

    <QuizzesListComponent></QuizzesListComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import QuizzesListComponent from "@/components/QuizzesListComponent.vue";
export default defineComponent({
  name: "QuizzesView",
  components: {QuizzesListComponent}
})
</script>

<style scoped>

</style>