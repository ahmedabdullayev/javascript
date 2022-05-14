<template>
  <h1>Add Todo</h1>
  <form v-on:submit.prevent="submitForm">
    <div class="form-floating border-top mb-3">
        <textarea class="form-control y-4" v-model="form.todoText" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Write your todo</label>
    </div>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Todo</th>
        <th scope="col">Is Done?</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in this.todos" :key="item.id" v-bind:value="item.id">
        <td>{{ item.todoText }}</td>
        <td>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="flexCheckDefault" v-on:change="update(item.id, item.isDone, item.todoText)" v-bind:checked="item.isDone">
          </div></td>
        <td><button type="button" class="btn btn-danger" v-on:click="deleteData(item.id)">Delete</button></td>
      </tr>
      </tbody>
    </table>
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
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";
import {UserPost} from "@/types/UserPost";
import UserServices from "@/services/UserServices";
import {Todo} from "@/types/Todo";

export default defineComponent({
  name: "AddTodoComponent",
  components: {},
  data(){
    return{
      errorArray: [] as string[],
      success: false as boolean,
      todos: [] as Todo[],
      form:{
        todoText : '' as string,
        isDone : false as boolean
      }
    }
  },
  methods:{
   async submitForm(){
      if(this.form?.todoText == ''){
        this.errorArray.push("error");
        return //to prevent sending request to api
      }
     let userPromise = await UserServices.RefreshToken();
     let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.post('/Todo/PostTodo', this.form, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
            this.getData();
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
    },
    async update(id: string, done: boolean, text: string){
      let isDone = {
        id: id,
        todoText:text,
        isDone: done =! done,
      }
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.put('/Todo/PutTodo/'+id, isDone, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
            this.getData();
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
    },
   async getData(){
     let userPromise = await UserServices.RefreshToken();
     let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.get('Todo/GetTodos/', conf)
          .then((res) => {
            this.todos = res.data as Todo[]
          })
    },
    async deleteData(id: string){
      let userPromise = await UserServices.RefreshToken();
      let conf = UserServices.AxiosJwt(userPromise.token)
      await axios.delete('/Todo/DeleteTodo/'+id, conf)
          .then(res => {
            return res.data
          }).then(data =>{
            this.errorArray = []
            this.success = true
            this.getData();
          }).catch(err => {
            this.errorArray.push(err);
            this.success = false;
            console.warn(err.data)
          })
    }
  },
  async mounted(){
    await this.getData()
  }
})
</script>

<style scoped>

</style>