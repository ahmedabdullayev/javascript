<template>
  <h1>Add Question</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="mb-3">
      <label for="name" class="form-label text-right">Question Text</label>
      <input type="text" v-model="form.questionText" class="form-control" id="name">
    </div>
    <select class="form-select" v-model="form.quizId" id="listOfCategories">
      <option value=""> Choose Quiz of that question</option>
      <option v-for="(quiz) in this.quizzes" :key="quiz.id" v-bind:value="quiz.id" >{{quiz.name}}</option>
    </select>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <div v-if="success">
    <div class="success-msg">
      <i class="fa fa-check"></i>
      Success!
    </div>
  </div>
  <div v-if="errorArray.length">
    <div class="error-msg">
      <i class="fa fa-times-circle"></i>
      Errors!
    </div>
  </div>
  <QuestionListAdminComponent ref="reloadData"></QuestionListAdminComponent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Quiz from "@/types/Quiz";
import QuestionListAdminComponent from "@/components/QuestionListAdminComponent.vue";
export default defineComponent({
  name: "AddQuestionComponent",
  components: {QuestionListAdminComponent},

  data(){
    return{
      errorArray: [] as string[],
      success: false as boolean,
      quizzes: [] as Quiz[],
      form:{
        questionText : '' as string,
        quizId : '' as string,
      }
    }
  },
  methods:{
    async submitForm(){
      if(this.form?.questionText == '' || this.form?.quizId == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      await axios.post('/Question/PostQuestion', this.form)
          .then((res) =>{
            this.errorArray = []
            this.success = true
            let call = (this.$refs.reloadData as InstanceType<typeof QuestionListAdminComponent>).getQuestions()
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.success = false;
            console.warn(error.data)
          })
    },
  },
  async mounted(){
    await axios.get('Quiz/GetQuizzes')
        .then((res) => {
          this.quizzes = res.data as Quiz[]
        })
  }
})
</script>


<style scoped>

</style>