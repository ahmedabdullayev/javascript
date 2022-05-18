<template>
  <div class="col-sm-6 col-md-4" v-for="(subj) in this.subjects" :key="subj.id" v-bind:value="subj.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ subj.name }}</h5>
        <p class="card-text">{{ subj.description }}</p>
        <router-link class="btn btn-primary" :to="`/subject/${subj.name}/quizzes/${subj.id}`">{{ t('check-quizzes') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Subject from "@/types/Subject";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";

export default defineComponent({
  name: "SubjectListComponent",
  components: {},
  data(){
    const { t } = useI18n()
    return{
      t,
      subjects: [] as Subject[],
    }
  },

  async mounted(){
    let userPromise = await UserServices.RefreshToken();
    let conf = UserServices.AxiosJwt(userPromise.token)
    let lang = UserServices.GetCulture()
    await axios.get('Subjects/GetSubjects'+lang, conf)
        .then((res) => {
          this.subjects = res.data as Subject[]
        })
  }
})
</script>

<style scoped>

</style>