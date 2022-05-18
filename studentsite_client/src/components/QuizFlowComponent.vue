<template>
<div>
  <h1>{{this.question.questionText}}</h1>
    <div v-for="(answer) in this.question.answers" :key="answer.id" >
      <input type="radio" id="one" v-bind:value="answer.id" v-model="form.answerId">
      <label for="one">{{ answer.answerText }}</label>
    </div>
  <button type="submit" class="btn btn-primary" v-on:click="addUserChoice()">{{ t('submit') }}</button>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import UserChoice from "@/types/UserChoice";
import Question from "@/types/Question";
import router from "@/router";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "QuizFlowComponent",
  components:{},
  data(){
    const { t } = useI18n()
    const user_QuizId = this.$route.params.userQuizId;
    const quiz_id = this.$route.params.quizId;
    return{
      t,
      userChoice: {} as UserChoice,
      question: [] as Question[],
      form:{
        quizId: quiz_id,
        questionId: '' as string,
        answerId: '' as string,
        userQuizId: user_QuizId
        // appUserId: userId
      },
      formGetUserChoices:{
        userQuizId: user_QuizId
        // appUserId: userId
      }

    }
  },
  methods:{
    async getPostUserChoice(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('UserChoice/PostGetUserChoice', this.formGetUserChoices, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.userChoice = data as UserChoice
            this.form.questionId = this.userChoice.questionId;
            console.log(this.userChoice)
          }).catch(err => {
            console.log(err)
          })
    },

    async getQuestionWithAnswers(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      let lang = UserServices.GetCulture();
        await axios.get('Question/GetQuestion/' + this.userChoice.questionId + lang, conf)
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
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('UserChoice/PostUserChoice', this.form, conf).then((res) => {
        this.userChoice = res.data as UserChoice
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