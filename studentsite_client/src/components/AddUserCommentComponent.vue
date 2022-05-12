<template>
  <h1>Add User Comment</h1>
  <form v-on:submit.prevent="submitForm">

    <div class="mb-3">
      <label for="text" class="form-label">Comment</label>
      <input type="text" v-model="form.commentText" class="form-control" id="text">
    </div>

    <select class="form-select" v-model="form.userPostId" id="listOfCategories">
      <option value=""> Choose Post of that comment</option>
      <option v-for="(post) in this.userPosts" :key="post.id" v-bind:value="post.id" >{{post.title}}</option>
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
import {UserPost} from "@/types/UserPost";
export default defineComponent({
  name: "AddUserCommentComponent",
  components: {},
  data(){
    const userId = 'bae60579-9abb-47ec-b100-39fc44694c6e';
    return{
      errorArray: [] as string[],
      success: false as boolean,
      userPosts: [] as UserPost[],
      form:{
        commentText : '' as string,
        userPostId: '' as string,
        appUserId: userId
      }
    }
  },
  methods:{
    submitForm(){
      if(this.form?.commentText == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      axios.post('UserComment/PostUserComment', this.form)
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
    await axios.get('UserPost/GetUserPosts')
        .then((res) => {
          this.userPosts = res.data as UserPost[]
        })
  }
})
</script>
<style scoped>

</style>