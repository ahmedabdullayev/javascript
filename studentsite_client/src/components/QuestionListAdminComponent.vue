<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
      <th scope="col">{{ t('question-text') }}</th>
      <th scope="col">{{ t('quiz') }} id</th>
      <th scope="col">{{ t('action') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(ques) in this.questions" :key="ques.id" v-bind:value="ques.id">
      <th scope="row">{{ ques.id }}</th>
      <td>{{ ques.questionText }}</td>
      <td>{{ ques.quizId }}</td>
      <td><button type="button" class="btn btn-danger" v-on:click="deleteQuestion(ques.id)">{{ t('delete') }}</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Question from "@/types/Question";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "QuestionListAdminComponent",
  components:{},
  data(){
    const { t } = useI18n()
    return{
      t,
      questions: [] as Question[]
    }
  },
  methods:{
    async deleteQuestion(id: string){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.delete('Question/DeleteQuestion/'+id, conf).then((res) => {
        console.log(res)
      })
     await this.getQuestions();
    },
    async getQuestions(){
      // let userPromise = await UserServices.RefreshToken();
      let userPromise = UserServices.GetUserData();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('Question/GetQuestions', conf).then((res) => {
        this.questions = res.data as Question[]
        console.log(this.questions)
      })
    }
  },
  async mounted(){
    await this.getQuestions()
  }
})
</script>

<style scoped>

</style>