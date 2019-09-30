<template>
    <div>
        <h4>Add Task</h4>
        <hr>
        <input type="text" name="" class="form-control" id="" v-model="newToDo" @keyup.enter="addNewToDo">
        
        <hr>

        <ul class="todo-list">
            <li v-for="(toDo) in pendingTasks" v-bind:key="toDo.id">
                <span v-if="toDo.action == 'none'">
                    {{ toDo.description }}
                </span>
                
                <input v-if="toDo.action == 'edit'" type="text" @keyup.enter="updateToDo(toDo)" class="form-control" id="" v-model="toDo.description">
                <div>
                    <strong>
                        <a @click="markCompleted(toDo)" href="Javascript:;">Completed</a>
                    </strong>
                    |
                    <strong>
                        <a v-if="toDo.action == 'none'" @click="editToDo(toDo)" href="Javascript:;">Edit</a>
                        <a v-else @click="cancelToDo(toDo)" href="Javascript:;">Cancel</a>
                    </strong>
                    |
                    <strong>
                        <a @click="removeToDo(toDo)" href="Javascript:;">Remove</a>
                    </strong>
                </div>
            </li>
        </ul>
        <h4>Competed Task</h4>
        <hr>
        <ul class="todo-list">
            <li v-for="completedTask in completedTasks" v-bind:key="completedTask.id">
                {{ completedTask.description }}
                <div>
                    <a @click="markNotCompleted(completedTask)" href="Javascript:;">Mark Not Completed</a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Axios from 'axios';
Axios.defaults.headers.get['Content-Type'] = 'application/json' 
Axios.defaults.headers.put['Content-Type'] = 'application/json' 
Axios.defaults.headers.post['Content-Type'] = 'application/json' 
Axios.defaults.headers.delete['Content-Type'] = 'application/json' 

Axios.defaults.headers.get['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
Axios.defaults.headers.post['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
Axios.defaults.headers.put['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
Axios.defaults.headers.delete['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
export default {
    name: 'to-do-list',
    data(){
        return {
            newToDo:'',
            idForInput:4,
            oldDescription:'',
            token:this.$auth.getToken(),
            allToDos:[],
        }
    },
    computed:{
        completedTasks(){
            return this.allToDos.filter(function(toDo){
                return toDo.status == 'done';
            });
        },
        pendingTasks(){
            return this.allToDos.filter(function(toDo){
                return toDo.status == 'pending';
            });
        }
    },
    methods:{
        getToDos(){
            Axios.get(process.env.VUE_APP_ROOT_API+'/api/todos?user_id='+this.$auth.getAuthUser().id).then(response => {
                console.log(response.data);
                this.allToDos = response.data
            }).catch(err => {
                console.log(process.env.VUE_APP_ROOT_API+'/api/todos?user_id='+this.$auth.getAuthUser().id);
                console.log(err);
            });
        },
        addNewToDo(){
            if(this.newToDo.trim().length == 0){
                this.newToDo = '';
                return;
            }
            Axios.post(process.env.VUE_APP_ROOT_API+'/api/todos',{

                description:this.newToDo,
                user_id:this.$auth.getAuthUser().id


            }).then(response => {
                
                console.log(response);
                // this.allToDos.push({
                //     id:this.idForInput,
                //     description:this.newToDo,
                //     status:'pending',
                //     action:'none',
                // });
                this.newToDo = '';
                // this.idForInput++;
                this.getToDos();

            }).catch(err => {

                console.log(err);

            });
        },
        markCompleted(toDo){
            Axios.put(process.env.VUE_APP_ROOT_API+'/api/todos/'+toDo.id,{
                status:'done'
            }).then(response=>{
                console.log(response);
                toDo.status = 'done';
            }).catch(err=>{
                console.log(err);
            });
        },
        markNotCompleted(toDo){
            Axios.put(process.env.VUE_APP_ROOT_API+'/api/todos/'+toDo.id,{
                status:'pending'
            }).then(response=>{
                console.log(response);
                toDo.status = 'pending';
            }).catch(err=>{
                console.log(err);
            });
        },
        removeToDo(toDo){
            this.allToDos.forEach(function(element, index, object) {
                console.log('index' + index);
                console.log(element.id);
                console.log('sdfsdfsdf' + toDo.id);
                if(element.id == toDo.id){
                    console.log('MATCH');
                    Axios.delete(process.env.VUE_APP_ROOT_API+'/api/todos/' + toDo.id).then(response=>{
                        console.log(response);
                        object.splice(index, 1);
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            });
        },
        editToDo(toDo){
            this.oldDescription = toDo.description;
            toDo.action = 'edit';
        },
        cancelToDo(toDo){
            toDo.description = this.oldDescription;
            toDo.action = 'none';
        },
        updateToDo(toDo){
            //check empty string
            if(toDo.description.trim().length == 0){
                toDo.description = this.oldDescription;
                return;
            }
            Axios.put(process.env.VUE_APP_ROOT_API+'/api/todos/'+toDo.id,{
                description:toDo.description
            }).then(response=>{
                console.log(response);
                toDo.action = 'none';
            }).catch(err=>{
                console.log(err);
            });
        }
    },
    created: function () {
        this.getToDos();
        
    },
    

    
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-control{
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
}
ul.todo-list{
    list-style: none;
    padding: 0;
}
ul.todo-list li{
    text-align: left;
}
</style>
