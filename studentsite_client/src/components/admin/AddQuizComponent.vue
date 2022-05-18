<template>
  <h1>{{ t('add-quiz') }}</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="mb-3">
      <label for="name" class="form-label text-right">{{ t('name') }}</label>
      <input type="text" v-model="form.name" class="form-control" id="name">
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">{{ t('description') }}</label>
      <input type="text" v-model="form.description" class="form-control" id="description">
    </div>

    <select class="form-select" v-model="form.subjectId" id="listOfCategories">
      <option value=""> {{ t('chooseSubjOfQuiz') }}</option>
      <option v-for="(subj) in this.subjects" :key="subj.id" v-bind:value="subj.id" >{{subj.name}}</option>
    </select>
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
  <QuizListAdminComponent ref="reloadData"></QuizListAdminComponent>
<!--  <AsyncComponent ref="reloadData"></AsyncComponent>-->
</template>

<script lang="ts">
import {defineAsyncComponent, defineComponent} from "vue";
import axios from "axios";
import Subject from "@/types/Subject";
import UserServices from "@/services/UserServices";
import QuizListAdminComponent from "@/components/admin/QuizListAdminComponent.vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "AddQuizComponent",
  components: {QuizListAdminComponent},
  data(){
    const { t } = useI18n()
    return{
      t,
      errorArray: [] as string[],
      success: false as boolean,
      subjects: [] as Subject[],
      form:{
        name : '' as string,
        description : '' as string,
        subjectId: '' as string
      }
    }
  },
  methods:{
    async submitForm(){

      if(this.form?.name == '' || this.form?.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('/Quiz/PostQuiz', this.form, conf)
          .then((res) =>{
            this.errorArray = []
            this.success = true
            let call = (this.$refs.reloadData as InstanceType<typeof QuizListAdminComponent>).getQuizzes()
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.success = false;
            console.warn(error.data)
          })
    },
  },
  async mounted(){
    let userPromise = await UserServices.RefreshToken();
    let conf = UserServices.AxiosJwt(userPromise.token)
    await axios.get('Subjects/GetSubjects', conf)
    .then((res) => {
      this.subjects = res.data as Subject[]
    })
  },

})
</script>


<style scoped>

</style>