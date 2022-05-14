<template>
  <div class="container">
    <div class="row">
      <PostsComponent></PostsComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PostsComponent from "@/components/PostsComponent.vue";
export default defineComponent({
  name: "PostsView",
  components:{PostsComponent}
})
</script>

<style scoped>

</style>