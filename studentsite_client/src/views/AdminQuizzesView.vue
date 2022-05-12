<template>
  <div class="container">
    <div class="row">
      <AddQuizComponent></AddQuizComponent>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddQuizComponent from "@/components/AddQuizComponent.vue";

export default defineComponent({
  name: "AdminQuizzesView",
  components: {AddQuizComponent}
})
</script>

<style scoped>

</style>