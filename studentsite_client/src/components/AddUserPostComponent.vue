<template>
  <h1>Add User Post</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="mb-3">
      <label for="title" class="form-label text-right">Title</label>
      <input type="text" v-model="form.title" class="form-control" id="title">
    </div>
    <div class="mb-3">
      <label for="text" class="form-label">Text</label>
      <input type="text" v-model="form.text" class="form-control" id="text">
    </div>

    <select class="form-select" v-model="form.topicId" id="listOfCategories">
      <option value=""> Choose Topic of that post</option>
      <option v-for="(topic) in this.topics" :key="topic.id" v-bind:value="topic.id" >{{topic.name}}</option>
    </select>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <div v-if="success">
    <div class="success-msg">
      <i class="fa fa-check"></i>
      Success!
    </div>
  </div>
  <div v-if="errorArray.length">
    <div class="error-msg">
      <i class="fa fa-times-circle"></i>
      Errors!
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import {Topic} from "../types/Topic";
import UserServices from "@/services/UserServices";
export default defineComponent({
  name: "AddUserPostComponent",
  components: {},
  data(){
    return{
      errorArray: [] as string[],
      success: false as boolean,
      topics: [] as Topic[],
      form:{
        title : '' as string,
        text : '' as string,
        topicId: '' as string,
      }
    }
  },
  methods:{
    async submitForm(){
      if(this.form?.title == '' || this.form?.text == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('UserPost/PostUserPost', this.form, conf)
          .then((res) =>{
            this.errorArray = []
            this.success = true
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
    await axios.get('Topic/GetTopics', conf)
        .then((res) => {
          this.topics = res.data as Topic[]
        })
  }
})
</script>
<style scoped>

</style>