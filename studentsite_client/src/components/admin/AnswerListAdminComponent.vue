<template>
  <h1>Hii</h1>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
      <th scope="col">{{ t('answer-text') }}</th>
      <th scope="col">{{ t('answer') }} id</th>
      <th scope="col">{{ t('action') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(answer) in this.answers" :key="answer.id" v-bind:value="answer.id">
      <th scope="row">{{ answer.id }}</th>
      <td>{{ answer.answerText }}</td>
      <td>{{ answer.questionId }}</td>
      <td>
        <button type="button" class="btn btn-danger" v-on:click="deleteAnswer(answer.id)">{{ t('delete') }}</button>

      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Answer from "@/types/Answer";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "AnswerListAdminComponent",
  components:{},
  data(){
    const { t } = useI18n()
    return{
      t,
      errorArray: [] as string[],
      success: false as boolean,
      answers: [] as Answer[],
    }
  },
  methods:{
    async deleteAnswer(id: string){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.delete('Answer/DeleteAnswer/'+id, conf).then((res) => {
        console.log(res)
      })
      await this.getAnswers();
    },

    async getAnswers(){
      // let userPromise = await UserServices.RefreshToken();
      let userPromise = UserServices.GetUserData();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('Answer/GetAnswers', conf).then((res) => {
        this.answers = res.data as Answer[]
        console.log(this.answers)
      })
    }
  },
  async mounted(){
    await this.getAnswers()
  }
})
</script>

<style scoped>

</style>