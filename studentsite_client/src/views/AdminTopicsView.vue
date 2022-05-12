<template>
  <div class="container">
    <div class="row">
  <AddTopicComponent></AddTopicComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddTopicComponent from "@/components/AddTopicComponent.vue";
export default defineComponent({
  name: "AdminTopicsView",
  components: {AddTopicComponent},
})
</script>

<style scoped>

</style>