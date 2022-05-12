<template>
  <table class="table table-dark table-striped">
    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Question text</th>
      <th scope="col">Your answer</th>
      <th scope="col">Is it correct?</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in this.userQuiz.userChoices" :key="item.id" v-bind:value="item.id">
      <td>{{ index }}</td>
      <td>{{ item.question.questionText }}</td>
      <td>{{ item.answer.answerText }}</td>
      <td>{{ item.answer.isCorrect }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import UserQuiz from "../types/UserQuiz";
import axios from "axios";
export default defineComponent({
  name: "ResultAfterQuizComponent",
  components: {},
  data(){
    return{
      userQuiz: [] as UserQuiz[],
    }
  },
  methods:{
    async getResults(){
      await axios.get('UserQuiz/GetUserQuiz/' + this.$route.params.userQuizId)
          .then((res) => {
            this.userQuiz = res.data as UserQuiz[]
          })
    }
  },
  async mounted(){
    await this.getResults()
  }
});
</script>

<style scoped>

</style>