<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
      <th scope="col">{{ t('subj-name') }}</th>
      <th scope="col">{{ t('description') }}</th>
      <th scope="col">{{ t('action') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(subj) in this.subjects" :key="subj.id" v-bind:value="subj.id">
      <th scope="row">{{ subj.id }}</th>
      <td>{{ subj.name }}</td>
      <td>{{ subj.description }}</td>
      <td>
        <button type="button" class="btn btn-danger" v-on:click="deleteSubject(subj.id)">{{ t('delete') }}</button>

        <div class="accordion accordion-flush" :id="`accordionFlushExample${subj.id}`">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapseOne${subj.id}`" aria-expanded="false" aria-controls="flush-collapseOne">
                {{ t('updateOn') }}
              </button>
            </h2>
            <div :id="`flush-collapseOne${subj.id}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" :data-bs-parent="`#accordionFlushExample${subj.id}`">
              <div class="accordion-body">
                <h1>{{ t('updateOnEst') }}</h1>
                <form v-on:submit.prevent="updateSubjectOnEstonian(subj.id)">
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
                <form v-on:submit.prevent="updateSubjectOnRussian(subj.id)">
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
        <br>
      </td>
    </tr>
    </tbody>
  </table>



</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Subject from "@/types/Subject";
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
      subjects: [] as Subject[],
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
    async deleteSubject(id: string){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.delete('Subjects/DeleteSubject/'+id, conf).then((res) => {
        console.log(res)
      })
      await this.getSubjects();
    },
    async updateSubjectOnEstonian(id: string){
      if(this.formET.name == '' || this.formET.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formET.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Subjects/PutSubject/'+id+'?culture=et-EE', this.formET, conf)
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
    async updateSubjectOnRussian(id: string){
      if(this.formRU.name == '' || this.formRU.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formRU.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Subjects/PutSubject/'+id+'?culture=ru-RU', this.formRU, conf)
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
    async getSubjects(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('Subjects/GetSubjects', conf).then((res) => {
        this.subjects = res.data as Subject[]
        console.log(this.subjects)
      })
    }
  },
  async mounted(){
    await this.getSubjects()
  }
})
</script>

<style scoped>

</style>