<template>
  <form v-on:submit.prevent="register">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else(maybe).</div>
    </div>
    <div class="mb-3">
      <label for="Firstname" class="form-label">Firstname</label>
      <input type="text" v-model="form.firstname" class="form-control" id="Firstname">
    </div>
    <div class="mb-3">
      <label for="Lastname" class="form-label">Lastname</label>
      <input type="text" v-model="form.lastname" class="form-control" id="Lastname">
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
  name: "RegisterComponent",
  components:{},
  data() : {
    form:{
      email: string,
      firstname: string,
      lastname: string,
      password: string,
    }
  }{
    return{
      form:{
        email: 'test@itcollege.ee',
        firstname: 'Ahmed',
        lastname: 'Abdullajev',
        password: '123456'
      }
    }
  },

  methods:{
    async register(){
      await axios.post('identity/account/register', this.form)
          .then(res => {
            return res.data
          }).then(data =>{
            UserServices.SaveUserData(data)
            router.push(`/`)
            console.warn(UserServices.GetUserData())
          }).catch(err => {
            console.warn(err)
          })
    }
  }
});
</script>

<style scoped>

</style>