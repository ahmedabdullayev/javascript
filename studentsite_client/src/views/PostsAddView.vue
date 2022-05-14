<template>
  <div class="container">
    <div class="row">
      <h1>Posts</h1>

      <AddUserPostComponent></AddUserPostComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddUserPostComponent from "@/components/AddUserPostComponent.vue";
export default defineComponent({
  name: "PostsAddView",
  components:{AddUserPostComponent},
});
</script>

<style scoped>

</style>