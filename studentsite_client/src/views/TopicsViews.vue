<template>
  <div class="container">
    <div class="row">
  <TopicListComponent></TopicListComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TopicListComponent from "@/components/TopicListComponent.vue";
export default defineComponent({
  name: "TopicsViews",
  components: {TopicListComponent}
})
</script>

<style scoped>

</style>