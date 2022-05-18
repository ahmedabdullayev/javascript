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
      <td>
        <button type="button" class="btn btn-danger" v-on:click="deleteQuiz(quiz.id)">{{ t('delete') }}</button>



        <div class="accordion accordion-flush" :id="`accordionFlushExample${quiz.id}`">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapseOne${quiz.id}`" aria-expanded="false" aria-controls="flush-collapseOne">
                {{ t('updateOn') }}
              </button>
            </h2>
            <div :id="`flush-collapseOne${quiz.id}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" :data-bs-parent="`#accordionFlushExample${quiz.id}`">
              <div class="accordion-body">
                <h1>{{ t('updateOnEst') }}</h1>
                <form v-on:submit.prevent="updateQuizOnEstonian(quiz.id)">
                  <div class="mb-3">
                    <label for="nameET" class="form-label text-right">{{ t('name') }}</label>
                    <input type="text" v-model="formET.name" class="form-control" id="nameET">
                  </div>
                  <div class="mb-3">
                    <label for="descriptionET" class="form-label">{{ t('description') }}</label>
                    <input type="text" v-model="formET.description" class="form-control" id="descriptionET">
                  </div>
                  <button type="submit" class="btn btn-primary">{{ t('submit') }}</button>
                </form>

                <h1>{{ t('updateOnRus') }}</h1>
                <form v-on:submit.prevent="updateQuizOnRussian(quiz.id)">
                  <div class="mb-3">
                    <label for="nameRU" class="form-label text-right">{{ t('name') }}</label>
                    <input type="text" v-model="formRU.name" class="form-control" id="nameRU">
                  </div>
                  <div class="mb-3">
                    <label for="descriptionRU" class="form-label">{{ t('description') }}</label>
                    <input type="text" v-model="formRU.description" class="form-control" id="descriptionRU">
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
      quizzes: [] as Quiz[],
      formET:{
        id: '' as string,
        name: '' as string,
        description: '' as string,
      },
      formRU:{
        id: '' as string,
        name: '' as string,
        description: '' as string,
      },
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

    async updateQuizOnEstonian(id: string){
      if(this.formET.name == '' || this.formET.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formET.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Quiz/PutQuiz/'+id+'?culture=et-EE', this.formET, conf)
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
    async updateQuizOnRussian(id: string){
      if(this.formRU.name == '' || this.formRU.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formRU.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Quiz/PutQuiz/'+id+'?culture=ru-RU', this.formRU, conf)
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

    async getQuizzes(){
      // let userPromise = await UserServices.RefreshToken();
      let userPromise = await UserServices.GetUserData();
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