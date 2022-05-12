<template>
  <div class="container">
    <div class="row">
      <h1>Comments</h1>
    <AddUserCommentComponent></AddUserCommentComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddUserCommentComponent from "../components/AddUserCommentComponent.vue";
export default defineComponent({
  name: "CommentsView",
  components:{AddUserCommentComponent},

});
</script>

<style scoped>

</style>