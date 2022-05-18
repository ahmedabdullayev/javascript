<template>
  <nav>
    <div v-if="isGuest == false">
    <AdminRoutes v-if="isUser == false"></AdminRoutes>
    <UserRoutes v-if="isUser == true"></UserRoutes>
      <router-link to="/logout">{{ t('logout') }}</router-link>
    </div>
    <div v-else>
      <router-link to="/">{{ t('home') }}</router-link>
    | <router-link to="/login">{{ t('login') }}</router-link>
    | <router-link to="/register">{{ t('register') }}</router-link>
    </div>
    <LangSwitcher></LangSwitcher>
  </nav>
  <router-view/>
</template>


<script lang="ts">
import {defineComponent} from "vue";
import UserServices from "@/services/UserServices";
import AdminRoutes from "@/views/headers/AdminRoutes.vue";
import UserRoutes from "@/views/headers/UserRoutes.vue";
import LangSwitcher from "@/components/LangSwitcher.vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
  components:{UserRoutes, AdminRoutes, LangSwitcher},
  data(){
    const { t } = useI18n()
    return{
      t,
      isUser: true as boolean,
      isGuest: true as boolean
    }
  },
  methods:{
      async checkUser(){
          return UserServices.GetUserData()
      },
      checkLang(){
        if(!localStorage.getItem("lang")){
          localStorage.setItem("lang", "en-GB")
        }
        this.$i18n!.locale = localStorage.getItem("lang") || "en-GB";
      }
  },
  watch:{
    $route: async function () {
      this.checkLang()
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
