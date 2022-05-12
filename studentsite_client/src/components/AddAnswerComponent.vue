<template>
  <h1>Add Answer</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="mb-3">
      <label for="name" class="form-label text-right">Question Text</label>
      <input type="text" v-model="form.answerText" class="form-control" id="name">
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="flexCheckDefault" v-model="form.isCorrect">
      <label class="form-check-label" for="flexCheckDefault">
        is it correct? {{form.isCorrect}}
      </label>
    </div>
    <select class="form-select" v-model="form.questionId" id="listOfCategories">
      <option value=""> Choose Quiz of that question</option>
        <option v-for="(question) in this.questions" :key="question.id" v-bind:value="question.id" >{{question.questionText}}</option>
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
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Question from "@/types/Question";
export default defineComponent({
  name: "AddAnswerComponent",
  components: {},
  data(){
    return{
      errorArray: [] as string[],
      success: false as boolean,
      questions: [] as Question[],
      form:{
        answerText : '' as string,
        isCorrect: false as boolean,
        questionId : '' as string,
      }
    }
  },
  methods:{
    submitForm(){
      if(this.form?.answerText == '' || this.form?.questionId == ''){
        alert('dsd')
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      axios.post('/Answer/PostAnswer', this.form)
          .then((res) =>{
            this.errorArray = []
            this.success = true
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.success = false;
            console.warn(error.data)
          })
    },
  },
  async mounted(){
    await axios.get('Question/GetQuestions')
        .then((res) => {
          this.questions = res.data as Question[]
        })
  }
})
</script>


<style scoped>

</style>