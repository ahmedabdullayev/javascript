<template>
  <div class="container">
    <div class="row">
  <PostWithCommentsComponent></PostWithCommentsComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PostWithCommentsComponent from "@/components/PostWithCommentsComponent.vue";
export default defineComponent({
  name: "PostView",
  components: {PostWithCommentsComponent}
});
</script>

<style scoped>

</style>