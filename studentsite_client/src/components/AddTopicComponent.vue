<template>
  <h1>Add Topic</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="mb-3">
      <label for="name" class="form-label text-right">Name</label>
      <input type="text" v-model="form.name" class="form-control" id="name">
    </div>
    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <input type="text" v-model="form.description" class="form-control" id="description">
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <div v-if="success">
    <div class="success-msg">
      <i class="fa fa-check"></i>
      Success!
    </div>
  </div>
  <div v-if="errorArray.length">
    <div class="error-msg">
      <i class="fa fa-times-circle"></i>
      Errors!
    </div>
  </div>
  <TopicListAdminComponent ref="reloadData"></TopicListAdminComponent>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import TopicListAdminComponent from "@/components/TopicListAdminComponent.vue";
export default defineComponent({
  name: "AddTopicComponent",
  components:{TopicListAdminComponent},
  data(){
    return{
      errorArray: [] as string[],
      success: false as boolean,
      form:{
        name : '' as string,
        description : '' as string
      }
    }
  },
  methods:{
    submitForm(){
      if(this.form?.name == '' || this.form?.description == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
      axios.post('/Topic/PostTopic', this.form)
          .then((res) =>{
            this.errorArray = []
            this.success = true
            let call = (this.$refs.reloadData as InstanceType<typeof TopicListAdminComponent>).getTodos()
          })
          .catch((error) =>{
            this.errorArray.push(error);
            this.success = false;
            console.warn(error.data)
          })
    },
  }
})
</script>

<style scoped>

</style>