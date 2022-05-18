<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
      <th scope="col">{{ t('topicName') }}</th>
      <th scope="col">{{ t('description') }}</th>
      <th scope="col">{{ t('action') }}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(topic) in this.topics" :key="topic.id" v-bind:value="topic.id">
      <th scope="row">{{ topic.id }}</th>
      <td>{{ topic.name }}</td>
      <td>{{ topic.description }}</td>
      <td>
        <button type="button" class="btn btn-danger" v-on:click="deleteTopic(topic.id)">{{ t('delete') }}</button>

        <div class="accordion accordion-flush" :id="`accordionFlushExample${topic.id}`">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapseOne${topic.id}`" aria-expanded="false" aria-controls="flush-collapseOne">
                {{ t('updateOn') }}
              </button>
            </h2>
            <div :id="`flush-collapseOne${topic.id}`" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" :data-bs-parent="`#accordionFlushExample${topic.id}`">
              <div class="accordion-body">
                <h1>{{ t('updateOnEst') }}</h1>
                <form v-on:submit.prevent="updateTopicOnEstonian(topic.id)">
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
                <form v-on:submit.prevent="updateTopicOnRussian(topic.id)">
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
import {Topic} from "@/types/Topic";
import axios from "axios";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "TopicListAdminComponent",
  components:{},
  data(){
    const { t } = useI18n()
    return{
      t,
      errorArray: [] as string[],
      success: false as boolean,
      topics: [] as Topic[],
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
    async deleteTopic(id: string){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.delete('Topic/DeleteTopic/'+id, conf).then((res) => {
        console.log(res)
      })
      await this.getTopics();
    },
    async updateTopicOnEstonian(id: string){
      if(this.formET.name == '' || this.formET.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formET.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Topic/PutTopic/'+id+'?culture=et-EE', this.formET, conf)
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
    async updateTopicOnRussian(id: string){
      if(this.formRU.name == '' || this.formRU.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      this.formRU.id = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('Topic/PutTopic/'+id+'?culture=ru-RU', this.formRU, conf)
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
    async getTopics(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('Topic/GetTopics', conf).then((res) => {
        this.topics = res.data as Topic[]
        console.log(this.topics)
      })
    }
  },
  async mounted(){
    await this.getTopics()
  }
})
</script>

<style scoped>

</style>