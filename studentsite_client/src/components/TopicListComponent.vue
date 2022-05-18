<template>
  <div class="col-sm-6 col-md-4" v-for="(topic) in this.topics" :key="topic.id" v-bind:value="topic.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ topic.name }}</h5>
        <p class="card-text">{{ topic.description }}</p>
        <router-link class="btn btn-primary" :to="`/topic/${topic.id}`">{{ t('posts') }}</router-link>
      </div>
    </div>
  </div>
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
    async getTopics(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      let lang = UserServices.GetCulture()
      await axios.get('Topic/GetTopics' + lang, conf).then((res) => {
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