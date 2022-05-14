<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/subjects">Subjects</router-link> |
  <router-link to="/topics">Topics</router-link> |
  <router-link to="/todos">Todos</router-link> |
  <router-link to="/post-add">Add post</router-link> |

</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "userRoutes"
})
</script>

<style scoped>

</style>