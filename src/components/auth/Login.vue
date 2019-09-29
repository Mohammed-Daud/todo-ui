<template>
  <div class="mt-5 mb-5 col-md-6 offset-md-3">
    <h4>Login Here</h4>

    <form @submit.prevent="login">
      <p v-if="this.error" class="text-danger">
        Error in submitting the form. Please retry.
      </p>
      <div class="form-group">
        <label for="">Email address</label>
        <input type="email" class="form-control"
         v-model="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="">Password</label>
        <input type="password" class="form-control" v-model="password" placeholder="Password">
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  axios.defaults.headers.get['Content-Type'] = 'application/json' 
  axios.defaults.headers.post['Content-Type'] = 'application/json' 
  axios.defaults.headers.post['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
        error:false

      }
    },
    methods: {
      setAuthUser(){
        axios.get('http://localhost:8000/api/user',{
          headers:{
            Authorization: 'Bearer ' + localStorage.getItem('token')
          } 
        }).then(response => {
          this.$auth.setAuthUser(response.data);
          console.log(this.$auth.getAuthUser());
        }).catch(err => {
          console.log(err);
        });
      },
      login() {
        this.error = false;
        axios.post('http://localhost:8000/api/login',{
            email:this.email,
            password:this.password,
        }).then(response => {
            this.$auth.setToken(response.data.access_token, response.data.expires_at);
            console.log(response);
            console.log(response.data.expires_at);
            this.setAuthUser();
        }).then(()=>{
            this.$router.push('/');
            //this.$router.push('/my-todos');
        }).catch(e => {
            this.error = true;
            console.log(e);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
