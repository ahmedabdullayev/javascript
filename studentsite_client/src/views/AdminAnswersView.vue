<template>
  <div class="container">
    <div class="row">
      <AddAnswerComponent></AddAnswerComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddAnswerComponent from "@/components/AddAnswerComponent.vue";
export default defineComponent({
  name: "AdminAnswersView",
  components: {AddAnswerComponent}
})
</script>

<style scoped>

</style>