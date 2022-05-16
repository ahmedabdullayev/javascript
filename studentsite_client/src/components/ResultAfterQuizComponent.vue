<template>
  <table class="table table-dark table-striped">
  <thead>
  <tr>
    <th scope="col">#</th>
    <th scope="col">{{ t('question-text') }}</th>
    <th scope="col">{{ t('yourAns') }}</th>
    <th scope="col">{{ t('isCorrect') }}</th>
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
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "ResultAfterQuizComponent",
  components: {},
  data(){
    const { t } = useI18n()
    return{
      t,
      userQuiz: [] as UserQuiz[],
    }
  },
  methods:{
    async getResults(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('UserQuiz/GetUserQuiz/' + this.$route.params.userQuizId, conf)
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