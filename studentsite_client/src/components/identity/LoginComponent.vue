<template>
  <form v-on:submit.prevent="login">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else(maybe).</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import UserServices from "@/services/UserServices";
import router from "@/router";
export default defineComponent({
  name: "LoginComponent",
  components:{},
  data() : {
    form: {
      email: string,
      password: string,
    }
  }{
    return{
      form:{
        email: 'admin@itcollege.ee',
        password: '123456'
      }
    }
  },

  methods:{
    async login(){
      await axios.post('identity/account/login', this.form)
          .then(res => {
            return res.data
          }).then(data =>{
            UserServices.SaveUserData(data)
            router.push(`/`)
            // console.warn(UserServices.GetUserData())
          }).catch(err => {
            console.log(err)
          })
    }
  }
});
</script>

<style scoped>

</style>