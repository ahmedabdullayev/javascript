<template>
  <div class="container">
    <div class="row">
      <AddTodoComponent></AddTodoComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddTodoComponent from "@/components/Todos/AddTodoComponent.vue";
export default defineComponent({
  name: "TodosView",
  components: {AddTodoComponent},
});
</script>

<style scoped>

</style>