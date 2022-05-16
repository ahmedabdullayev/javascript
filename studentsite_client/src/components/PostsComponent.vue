<template>
  <div class="col-sm-6 col-md-4" v-for="(post) in this.topic.userPosts" :key="post.id" v-bind:value="post.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.text }}</p>
        <router-link class="btn btn-primary" :to="`/post/${post.id}`">{{ t('watch') }}</router-link>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent} from "vue";
import {Topic} from "@/types/Topic";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "PostsComponent",
  components: {},
  data(){
    const { t } = useI18n()
    return{
      t,
      topic: {} as Topic,
    }
  },
  methods:{

  },
  async mounted(){
    let userPromise = await UserServices.RefreshToken();
    let conf = UserServices.AxiosJwt(userPromise.token)
    await axios.get('Topic/GetTopic/' + this.$route.params.topicId, conf)
        .then((res) => {
          this.topic = res.data as Topic
        })
  }
});
</script>

<style scoped>

</style>