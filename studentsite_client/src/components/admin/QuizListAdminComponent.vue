<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
        <th scope="col">Quiz</th>
        <th scope="col">Description</th>
        <th scope="col">Is Ready?</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(quiz) in this.quizzes" :key="quiz.id" v-bind:value="quiz.id">
      <th scope="row">{{ quiz.id }}</th>
      <td>{{ quiz.name }}</td>
      <td>{{ quiz.description }}</td>
      <td>
        MAGMAS
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="flexCheckDefault" v-on:change="updateIt(quiz.id, quiz.isReady, quiz.name, quiz.description)" v-bind:checked="quiz.isReady">
          <label class="form-check-label" for="flexCheckDefault">{{quiz.isReady}}</label>
        </div>
      </td>
      <td><button type="button" class="btn btn-danger" v-on:click="deleteQuiz(quiz.id)">Delete</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Quiz from "@/types/Quiz";
import UserServices from "@/services/UserServices";
export default defineComponent({
  name: "SubjectListAdminComponent",
  components:{},
  data(){
    return{
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
    async updateIt(id: string, ready: boolean, name: string, description: string){
      let isDone = {
        id: id,
        name: name,
        description: description,
        isReady: ready =! ready
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