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
      <td>
        <button type="button" class="btn btn-danger" v-on:click="deleteQuestion(ques.id)">{{ t('delete') }}</button>

        <div class="accordion accordion-flush" :id="`accordionFlushExample${ques.id}`">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapseOne${ques.id}`" aria-expanded="false" aria-controls="flush-collapseOne">
                {{ t('updateOn') }}
              </button>
            </h2>
            <div :id="`flush-collapseOne${ques.id}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" :data-bs-parent="`#accordionFlushExample${ques.id}`">
              <div class="accordion-body">
                <h1>{{ t('updateOnEst') }}</h1>
                <form v-on:submit.prevent="updateQuestionOnEstonian(ques.id)">
                  <div class="mb-3">
                    <label for="nameET" class="form-label text-right">{{ t('name') }}</label>
                    <input type="text" v-model="formET.questionText" class="form-control" id="nameET">
                  </div>
                  <button type="submit" class="btn btn-primary">{{ t('submit') }}</button>
                </form>

                <h1>{{ t('updateOnRus') }}</h1>
                <form v-on:submit.prevent="updateQuestionOnRussian(ques.id)">
                  <div class="mb-3">
                    <label for="nameRU" class="form-label text-right">{{ t('name') }}</label>
                    <input type="text" v-model="formRU.questionText" class="form-control" id="nameRU">
                  </div>
                  <button type="submit" class="btn btn-primary">{{ t('submit') }}</button>
                </form>

                <div v-if="success">
                  <div class="success-msg">
                    <i class="fa fa-check"></i>
                    {{ t('success') }}!
                  </div>
                </div>
                <div v-if="errorArray.length">
                  <div class="error-msg">
                    <i class="fa fa-times-circle"></i>
                    {{ t('errors') }}!
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>


      </td>
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
      errorArray: [] as string[],
      success: false as boolean,
      questions: [] as Question[],
      formET:{
        id: '' as string,
        questionText: '' as string,
      },
      formRU:{
        id: '' as string,
        questionText: '' as string,
      },
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
    async updateQuestionOnEstonian(id: string){
      if(this.formET.questionText == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formET.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Question/PutQuestion/'+id+'?culture=et-EE', this.formET, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
    },
    async updateQuestionOnRussian(id: string){
      if(this.formRU.questionText == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formRU.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Question/PutQuestion/'+id+'?culture=ru-RU', this.formRU, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
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