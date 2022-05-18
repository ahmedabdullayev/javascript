<template>
  <div class="col-sm-6 col-md-4" v-for="(quiz) in this.subjects.quizzes" :key="quiz.id" v-bind:value="quiz.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ quiz.name }}</h5>
        <p class="card-text">{{ quiz.description }}</p>
        <button class="btn btn-primary" v-on:click="startQuiz(quiz.id)">{{ t('startQuiz') }} </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import {defineComponent} from "vue";
import Subject from "@/types/Subject";
import UserQuiz from "@/types/UserQuiz";
import router from "@/router";
import UserServices from "@/services/UserServices";
import {useI18n} from "vue-i18n";
export default defineComponent({
  name: "QuizzesListComponent",
  components: {},
  data(){
    const { t } = useI18n()
    return{
      t,
      subjects: [] as Subject[],
      userQuiz: {} as UserQuiz,
      form:{
        quizId: '' as string
        // appUserId: userId
      }
    }
  },
  methods:{
    async startQuiz(id: string){
      this.form.quizId = id;
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('UserQuiz/PostUserQuiz', this.form, conf).then((res) => {
          this.userQuiz = res.data as UserQuiz
          console.log(this.userQuiz)
      })
      await router.push(`/quiz/${this.form.quizId}/userQuiz/${this.userQuiz.id}`)
    },
  },
  async mounted(){
    let userPromise = await UserServices.RefreshToken();
    let conf = UserServices.AxiosJwt(userPromise.token)
    let lang = UserServices.GetCulture()
    await axios.get('Subjects/GetSubject/' + this.$route.params.id + lang, conf)
        .then((res) => {
          this.subjects = res.data as Subject[]
        })
  }
});
</script>

<style scoped>

</style>