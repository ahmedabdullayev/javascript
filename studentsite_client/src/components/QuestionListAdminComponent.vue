<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
      <th scope="col">Question text</th>
      <th scope="col">Quiz id</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(ques) in this.questions" :key="ques.id" v-bind:value="ques.id">
      <th scope="row">{{ ques.id }}</th>
      <td>{{ ques.questionText }}</td>
      <td>{{ ques.quizId }}</td>
      <td><button type="button" class="btn btn-danger" v-on:click="deleteQuestion(ques.id)">Delete</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Question from "@/types/Question";

export default defineComponent({
  name: "QuestionListAdminComponent",
  components:{},
  data(){
    return{
      questions: [] as Question[]
    }
  },
  methods:{
    async deleteQuestion(id: string){
      await axios.delete('Question/DeleteQuestion/'+id).then((res) => {
        console.log(res)
      })
     await this.getQuestions();
    },
    async getQuestions(){
      await axios.get('Question/GetQuestions').then((res) => {
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