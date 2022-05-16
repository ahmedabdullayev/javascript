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
      <td><button type="button" class="btn btn-danger" v-on:click="deleteTopic(topic.id)">{{ t('delete') }}</button></td>
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
      topics: [] as Topic[]
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