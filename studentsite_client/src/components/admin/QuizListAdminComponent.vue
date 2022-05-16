<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
        <th scope="col">{{ t('quiz') }}</th>
        <th scope="col">{{ t('description') }}</th>
      <th scope="col">{{ t('action') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(quiz) in this.quizzes" :key="quiz.id" v-bind:value="quiz.id">
      <th scope="row">{{ quiz.id }}</th>
      <td>{{ quiz.name }}</td>
      <td>{{ quiz.description }}</td>
      <td><button type="button" class="btn btn-danger" v-on:click="deleteQuiz(quiz.id)">{{ t('delete') }}</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Quiz from "@/types/Quiz";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "SubjectListAdminComponent",
  components:{},
  data(){
    const { t } = useI18n()
    return{
      t,
      errorArray: [] as string[],
      success: false as boolean,
      quizzes: [] as Quiz[]
    }
  },
  methods:{
    async deleteQuiz(id: string){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.delete('Quiz/DeleteQuiz/'+id, conf).then((res) => {
        console.log(res)
      })
      await this.getQuizzes();
    },
    async getQuizzes(){
      // let userPromise = await UserServices.RefreshToken();
      let userPromise = UserServices.GetUserData();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('Quiz/GetQuizzes', conf).then((res) => {
        this.quizzes = res.data as Quiz[]
        console.log(this.quizzes)
      })
    },
    //if need
    async updateIt(id: string, name: string, description: string){
      let isDone = {
        id: id,
        name: name,
        description: description,
      }
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('/Quiz/PutQuiz/'+id, isDone, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
            this.getQuizzes();
            console.log(data)
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
    },
  },
  async mounted(){
    await this.getQuizzes()
  }
})
</script>

<style scoped>

</style>