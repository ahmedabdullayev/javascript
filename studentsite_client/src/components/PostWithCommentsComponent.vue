<template>
  <main class="ms-sm-auto  px-md-4">
    <div class="border-bottom">
<!--      <h2 class="pb-2 text-center">Post: {{this.userPost.title}}</h2>-->
    </div>

    <div class="row d-flex justify-content-center mt-100 mb-100">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-body border-bottom">
            <h4 class="card-title text-center">{{this.userPost.title}}</h4>
            <p>{{this.userPost.text}}</p>
<!--            <p class="text-left">Author: </p>-->
          </div>
          <div class="comment-widgets">
            <!-- Comment Row -->
            <div class="d-flex flex-row comment-row m-t-0" v-for="(comment) in this.userPost.userComments" :key="comment.id" v-bind:value="comment.id">
              <div class="p-2"><img src="../assets/pngegg.png" alt="user" width="50" class="rounded-circle"></div>
              <div class="comment-text w-100">
                <h6 class="font-medium">User</h6> <span class="m-b-15 d-block">{{ comment.commentText }}</span>
              </div>
            </div> <!-- Comment Row -->

            <div class="form-floating border-top">
              <textarea class="form-control y-4" v-model="form.commentText" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
              <label for="floatingTextarea2">Write your comment</label>
              <button type="submit" class="btn btn-primary" v-on:click="submitForm">Submit</button>
            </div>
          </div>

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
        </div>

      </div>
    </div>
  </main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Subject from "@/types/Subject";
import {UserPost} from "@/types/UserPost";
import UserChoice from "@/types/UserChoice";
import UserServices from "@/services/UserServices";

export default defineComponent({
  name: "PostWithCommentsComponent",
  components: {},
  data(){
    const userId = 'bac4c5ba-91c5-4c9c-b0a8-023cf0728561';
    const postId = this.$route.params.id;
    return{
      userPost: {} as UserPost,
      errorArray: [] as string[],
      success: false as boolean,
      form:{
        commentText : '' as string,
        userPostId: postId,
        appUserId: userId
      }
    }
  },
  methods:{
    async submitForm(){
      if(this.form?.commentText == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('UserComment/PostUserComment', this.form, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
            this.getData();
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
    },
    async getData(){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('UserPost/GetUserPost/' + this.$route.params.id, conf)
          .then((res) => {
            this.userPost = res.data as UserPost
          })
    }
  },
  async mounted(){
    await this.getData();
  }
});
</script>

<style scoped>

</style>