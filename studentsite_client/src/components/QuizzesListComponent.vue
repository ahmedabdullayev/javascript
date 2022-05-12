<template>
  <div class="col-sm-6 col-md-4" v-for="(quiz) in this.subjects.quizzes" :key="quiz.id" v-bind:value="quiz.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ quiz.name }}</h5>
        <p class="card-text">{{ quiz.description }}</p>
        <button class="btn btn-primary" v-on:click="startQuiz(quiz.id)">Start the quiz </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent} from "vue";
import Subject from "@/types/Subject";
import UserQuiz from "@/types/UserQuiz";
import router from "@/router";
export default defineComponent({
  name: "QuizzesListComponent",
  components: {},
  data(){
    const userId = 'bae60579-9abb-47ec-b100-39fc44694c6e';
    return{
      subjects: [] as Subject[],
      userQuiz: [] as UserQuiz[],
      form:{
        quizId: '' as string,
        appUserId: userId
      }
    }
  },
  methods:{
    async startQuiz(id: string){
      this.form.quizId = id;
      await axios.post('UserQuiz/PostUserQuiz', this.form).then((res) => {
          this.userQuiz = res.data as UserQuiz[]
          console.log(this.userQuiz)
      })
      await router.push(`/quiz/${this.form.quizId}/userQuiz/${this.userQuiz.id}`)
    },
  },
  async mounted(){
    await axios.get('Subjects/GetSubject/' + this.$route.params.id)
        .then((res) => {
          this.subjects = res.data as Subject[]
        })
  }
});
</script>

<style scoped>

</style>