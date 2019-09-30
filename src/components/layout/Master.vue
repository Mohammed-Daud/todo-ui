<template>
  <div id="app" class="container">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">ToDo <sup>101</sup></h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#/">Home</a>
        <a v-if="this.$auth.isAuthenticated()" class="p-2 text-dark" href="#/my-todos">My Todos</a>
        <a v-if="!this.$auth.isAuthenticated()" class="p-2 text-dark" href="#/login">Login</a>
        <a v-if="this.$auth.isAuthenticated()" @click="logout" class="p-2 text-dark" href="javascript:;">Logout</a>
      </nav>
      <a v-if="!this.$auth.isAuthenticated()" class="btn btn-outline-primary" href="#/register">Register</a>
    </div>


    

    <div class="row">
        <div class="col-lg-12">
            <flash-message class="flash-msg"></flash-message>
            <router-view />
        </div>
    </div>

    <hr>

    <footer class="footer">
      <p>&copy; 2019 Company, Inc.</p>
    </footer>

  </div>
</template>

<script>
import Axios from 'axios';
  Axios.defaults.headers.get['Content-Type'] = 'application/json' 
  Axios.defaults.headers.get['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
  export default {
    created(){

      console.log(process.env.VUE_APP_ROOT_API)
       
      //this.setAuthUser();
    },
    methods:{
      // setAuthUser(){
      //   Axios.get(process.env.VUE_APP_ROOT_API+'/api/user').then(response => {
      //     this.$auth.setAuthUser(response.data);
      //     console.log(this.$auth.getAuthUser());
      //   }).catch(err => {
      //     console.log(err);
      //   });
      // },
      logout(){
        this.$auth.destroyToken();
        this.$auth.setAuthUser({});
        
        //this.$router.push('/');

        window.location.href = '#/';
      }
    }
  }

</script>

<style scoped>
  
  /* Customize container */
  @media (min-width: 768px) {
    .container {
      max-width: 730px;
    }
  }



</style>
