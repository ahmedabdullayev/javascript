<template>
  {{this.isGuest}}
  <nav>
    <div v-if="isGuest == false">
    <AdminRoutes v-if="isUser == false"></AdminRoutes>
    <UserRoutes v-if="isUser == true"></UserRoutes>
      <router-link to="/logout">Logout</router-link>
    </div>
    <div v-else>
      <router-link to="/">Home</router-link>
    | <router-link to="/login">Login</router-link>
    | <router-link to="/register">Register</router-link>
    </div>
  </nav>
  <router-view/>
</template>


<script lang="ts">
import {defineComponent} from "vue";
import UserServices from "@/services/UserServices";
import {User} from "@/types/identity/User";
import AdminRoutes from "@/views/headers/AdminRoutes.vue";
import UserRoutes from "@/views/headers/UserRoutes.vue";
import axios from "axios";
import router from "@/router";
export default defineComponent({
  components:{UserRoutes, AdminRoutes},
  data(){
    return{
      isUser: true as boolean,
      isGuest: true as boolean
    }
  },
  methods:{
      async checkUser(){
          return UserServices.GetUserData()

      }
  },
  watch:{
    $route: async function () {
      let data = await this.checkUser()
      if (localStorage.getItem("user") == null) {
        this.isGuest = true;
        return
      }
        if (data!.roles.includes('admin')) {
          this.isUser = false;
          this.isGuest = false;
        } else if (data!.roles.includes('user')) {
          this.isGuest = false;
          this.isUser = true;
        } else {
          this.isGuest = true;
        }
    }
  },

})
</script>

<style lang="less">
nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
