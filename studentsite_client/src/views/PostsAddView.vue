<template>
  <div class="container">
    <div class="row">
      <h1>{{ t('posts') }}</h1>

      <AddUserPostComponent></AddUserPostComponent>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AddUserPostComponent from "@/components/AddUserPostComponent.vue";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "PostsAddView",
  components:{AddUserPostComponent},
  data(){
    const { t } = useI18n()
    return{
      t,
    }
  }
});
</script>

<style scoped>

</style>