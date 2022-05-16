<template>
  <h1>{{ t('add-topic') }}</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="mb-3">
      <label for="name" class="form-label text-right">{{ t('name') }}</label>
      <input type="text" v-model="form.name" class="form-control" id="name">
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">{{ t('description') }}</label>
      <input type="text" v-model="form.description" class="form-control" id="description">
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
  <TopicListAdminComponent ref="reloadData"></TopicListAdminComponent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import TopicListAdminComponent from "@/components/admin/TopicListAdminComponent.vue";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "AddTopicComponent",
  components:{TopicListAdminComponent},
  data(){
    const { t } = useI18n()
    return{
      t,
      errorArray: [] as string[],
      success: false as boolean,
      form:{
        name : '' as string,
        description : '' as string
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
      axios.post('/Topic/PostTopic', this.form, conf)
          .then((res) =>{
            this.errorArray = []
            this.success = true
            let call = (this.$refs.reloadData as InstanceType<typeof TopicListAdminComponent>).getTopics()
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.success = false;
            console.warn(error.data)
          })
    },
  }
})
</script>

<style scoped>

</style>