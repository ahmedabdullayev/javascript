<template>
<div>
  <h1>{{this.question.questionText}}</h1>
    <div v-for="(answer) in this.question.answers" :key="answer.id" >
      <input type="radio" id="one" v-bind:value="answer.id" v-model="form.answerId">
      <label for="one">{{ answer.answerText }}</label>
    </div>
  <button type="submit" class="btn btn-primary" v-on:click="addUserChoice()">Submit</button>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import UserChoice from "@/types/UserChoice";
import Question from "@/types/Question";
import router from "@/router";
export default defineComponent({
  name: "QuizFlowComponent",
  components:{},
  data(){
    const userId = 'bae60579-9abb-47ec-b100-39fc44694c6e';
    const user_QuizId = this.$route.params.userQuizId;
    const quiz_id = this.$route.params.quizId;
    return{
      userChoice: [] as UserChoice[],
      question: [] as Question[],
      form:{
        quizId: quiz_id,
        questionId: '' as string,
        answerId: '' as string,
        userQuizId: user_QuizId,
        appUserId: userId
      },
      formGetUserChoices:{
        userQuizId: user_QuizId,
        appUserId: userId
      }

    }
  },
  methods:{
    async getPostUserChoice(){
      await axios.post('UserChoice/PostGetUserChoice', this.formGetUserChoices)
          .then(res => {
            return res.data
          }).then(data =>{
            this.userChoice = data as UserChoice[]
            this.form.questionId = this.userChoice.questionId;
            console.log(this.userChoice)
          }).catch(err => {
            console.log(err)
          })
    },

    async getQuestionWithAnswers(){
        await axios.get('Question/GetQuestion/' + this.userChoice.questionId)
            .then(res => {
              return res.data
            }).then(data =>{
              this.question = data as Question[]
              console.log(this.question)
            }).catch(err => {
               router.push(`/results/${this.form.userQuizId}`)
              console.warn(err)
            })
    },
    async addUserChoice(){
      await axios.post('UserChoice/PostUserChoice', this.form).then((res) => {
        this.userChoice = res.data as UserChoice[]
        this.form.questionId = this.userChoice.questionId;
        console.log(this.userChoice)
      })
      await this.getAllData();
    },
    async getAllData(){
      await this.getPostUserChoice();
      await this.getQuestionWithAnswers();
    }

  },
  async mounted(){
      await this.getPostUserChoice()
      await this.getQuestionWithAnswers()
  }
});
</script>

<style scoped>

</style>