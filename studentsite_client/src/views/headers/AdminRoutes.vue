<template>
  <router-link to="/">{{ t('home') }}</router-link> |
  <router-link to="/subjects">{{ t('subjects') }}</router-link> |
  <router-link to="/topics">{{ t('topics') }}</router-link> |
  <router-link to="/post-add">{{ t('add-post') }}</router-link> |
  <router-link to="/todos">{{ t('todos') }}</router-link> |
  <router-link to="/admin/add-subject">{{ t('add-subject') }}</router-link> |
  <router-link to="/admin/add-quiz">{{ t('add-quiz') }}</router-link> |
  <router-link to="/admin/add-question">{{ t('add-question') }}</router-link> |
  <router-link to="/admin/add-answer">{{ t('add-answer') }}</router-link> |
  <router-link to="/admin/add-topic">{{ t('add-topic') }}</router-link> |


</template>

<script lang="ts">
 import {defineComponent} from "vue";
 import {useI18n} from "vue-i18n";
 export default defineComponent({
   name: "AdminRoutes",
   data(){
     const { t } = useI18n()
     return{
       t,
     }
   }
})
</script>

<style scoped>

</style>