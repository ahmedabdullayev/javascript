<template>
  <router-link to="/">{{ t('home') }}</router-link> |
  <router-link to="/subjects">{{ t('subjects') }}</router-link> |
  <router-link to="/topics">{{ t('topics') }}</router-link> |
  <router-link to="/todos">{{ t('todos') }}</router-link> |
  <router-link to="/post-add">{{ t('add-post') }}</router-link> |

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "userRoutes",
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