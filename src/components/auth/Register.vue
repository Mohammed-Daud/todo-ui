<template>
  <div class="mt-5 mb-5 col-md-6 offset-md-3">
    <h4>Register Here</h4>
    <form @submit.prevent="register">
      <p v-if="this.error" class="text-danger">
        Error in submitting the form. Please retry.
      </p>
      <div class="form-group">
        <label for="">Name</label>
        <input type="text" class="form-control" required
          placeholder="Your Name"
          v-model="name">
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" required
          placeholder="Enter email"
          v-model="email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" v-model="password" class="form-control" required placeholder="Password">
      </div>
      
      
      <button type="submit" class="btn btn-primary btn-block">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      name:'',
      email:'',
      password:'',
      error:false
    }
  },
  methods:{
    register(){
      axios.post('http://localhost:8000/api/register',{
            name:this.name,
            email:this.email,
            password:this.password,
        }).then(response => {
            this.flash('Thanks. Please Login Here', 'success');
            this.$router.push('/login');
        }).catch(e => {
            console.log(e);
            this.error = true;
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
