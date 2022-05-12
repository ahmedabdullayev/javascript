<template>
  <div class="col-sm-6 col-md-4" v-for="(subj) in this.subjects" :key="subj.id" v-bind:value="subj.id">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{ subj.name }}</h5>
        <p class="card-text">{{ subj.description }}</p>
        <router-link class="btn btn-primary" :to="`/subject/${subj.name}/quizzes/${subj.id}`">Check quizzes</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import Subject from "@/types/Subject";

export default defineComponent({
  name: "SubjectListComponent",
  components: {},
  data(){
    return{
      subjects: [] as Subject[],
    }
  },

  async mounted(){
    await axios.get('Subjects/GetSubjects')
        .then((res) => {
          this.subjects = res.data as Subject[]
        })
  }
})
</script>

<style scoped>

</style>