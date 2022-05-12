<template>
  <div class="container">
    <div class="row">
      <QuizFlowComponent></QuizFlowComponent>

    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import QuizFlowComponent from "../components/QuizFlowComponent";
export default defineComponent({
  name: "QuizFlowView",
  components:{QuizFlowComponent}
});
</script>

<style scoped>

</style>