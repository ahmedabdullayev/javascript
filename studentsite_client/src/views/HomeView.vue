<template>
  <div class="d-flex w-100 h-100 text-center text-white bg-dark">
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main class="px-3">
      <h1>COMFORTABLE STUDENT SITE FOR STUDYING</h1>
      <p class="lead">List of what we can offer for you:</p>
      <ul class="list-group lead">
        <li class="list-group-item">You can ask questions & add posts on each suitable Topic and get answers/comments for them from other users.</li>
        <li class="list-group-item">Learn&Study by doing our Quizzes on any Subject(Math, Programming, Languages, IT)</li>
        <li class="list-group-item">You can add your Todos </li>
      </ul>
      <p class="lead">"To have everything in one place, without need of using other apps"</p>
      <p class="lead">
        <router-link to="/login" class="btn btn-lg btn-secondary fw-bold border-white bg-white text-dark">Learn more</router-link>
      </p>
    </main>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
  },
});
</script>
