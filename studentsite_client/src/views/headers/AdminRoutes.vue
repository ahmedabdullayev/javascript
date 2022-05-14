<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/subjects">Subjects</router-link> |
  <router-link to="/topics">Topics</router-link> |
  <router-link to="/post-add">Add Post</router-link> |
  <router-link to="/todos">Todos</router-link> |
  <router-link to="/admin/add-subject">Add subject</router-link> |
  <router-link to="/admin/add-quiz">Add quiz</router-link> |
  <router-link to="/admin/add-question">Add question</router-link> |
  <router-link to="/admin/add-answer">Add answer</router-link> |
  <router-link to="/admin/add-topic">Add Topic</router-link> |


</template>

<script lang="ts">
 import {defineComponent} from "vue";
 export default defineComponent({

   name: "AdminRoutes"
})
</script>

<style scoped>

</style>