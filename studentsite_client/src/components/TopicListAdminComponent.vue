<template>
  <table class="table">
    <thead>
    <tr>
      <th scope="col">id#</th>
      <th scope="col">Topic name</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(topic) in this.topics" :key="topic.id" v-bind:value="topic.id">
      <th scope="row">{{ topic.id }}</th>
      <td>{{ topic.name }}</td>
      <td>{{ topic.description }}</td>
      <td><button type="button" class="btn btn-danger" v-on:click="deleteTodo(topic.id)">Delete</button></td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Topic} from "../types/Topic";
import axios from "axios";

export default defineComponent({
  name: "TopicListAdminComponent",
  components:{},
  data(){
    return{
      topics: [] as Topic[]
    }
  },
  methods:{
    async deleteTodo(id: string){
      await axios.delete('Topic/DeleteTopic/'+id).then((res) => {
        console.log(res)
      })
      await this.getTodos();
    },
    async getTodos(){
      await axios.get('Topic/GetTopics').then((res) => {
        this.topics = res.data as Topic[]
        console.log(this.topics)
      })
    }
  },
  async mounted(){
    await this.getTodos()
  }
})
</script>

<style scoped>

</style>