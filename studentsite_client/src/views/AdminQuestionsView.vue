<template>
  <div class="container">
    <div class="row">
      <AddQuestionComponent></AddQuestionComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddQuestionComponent from "@/components/AddQuestionComponent.vue";
import QuestionListAdminComponent from "@/components/QuestionListAdminComponent.vue";
export default defineComponent({
  name: "AdminQuestionsView",
  components: {AddQuestionComponent}
})
</script>

<style scoped>

</style>