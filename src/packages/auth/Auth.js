export default function(Vue){

    let authUser = {};

    Vue.auth = {

        setToken : (token, expiration) => {
            localStorage.setItem('token', token);
            localStorage.setItem('expiration', expiration);
        },

        getToken() {
            let token = localStorage.getItem('token');
            let expiration = localStorage.getItem('expiration');
            if(!token || !expiration){
                return null;
            }

            // if(Date.now() > expiration){
            //     return null;
            // }

            return token;
        },

        destroyToken : () => {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
        },

        isAuthenticated() {
            
            if(this.getToken()){
                return true;
            }
            return false;

        },

        setAuthUser(data) {
            
            authUser = data;

        },

        getAuthUser() {
            
            
            return authUser;

        },

    }

    Object.defineProperties(Vue.prototype, {
        $auth : {
            get: () => {
                return Vue.auth;
            }
        }
    });

}