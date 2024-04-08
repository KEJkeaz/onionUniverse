<template >
<v-container>
    <div v-if="joinRender">
      <JoinSetting @user-info="getUserInfo" :auth="auth"></JoinSetting>
    </div>
    <div v-else>
      Try Login
    </div>
  </v-container>
</template>
<script>


import JoinSetting from '@components/JoinSetting.vue'
import { jwtDecode } from "jwt-decode";

export default {
  name: 'UserJoin',
  components: {
    JoinSetting,
  },
  data(){
    return{
      authority_token: '',
      result: '',
      joinRender: false,
    }
  },
  created() {
    
  },
  mounted() {
    this.authority_token = this.$route.query.authority_token
    this.auth = jwtDecode(this.authority_token) 

    // this.auth.hasMembership === true -> 이미 가입된 회원임
    // this.auth.hasMembership === false -> 아직 가입 안함  
    if(this.auth.hasMembership === true) {  
      this.getAccessTokenExample()
    }else{
      this.joinRender = true
      
    }
  },
  methods: {
    async getAccessTokenExample(){
      const res = await this.axios.post('/api/get-access-token',{ authority_token: this.authority_token})
      if (res.status === 200) {
        localStorage.setItem('compassJwt', res.data.jwt);
        localStorage.setItem('compassRT', res.data.rt);
        await this.$store.dispatch('getMyDetail');
        this.$store.state.isLogin = true
        
        if(this.$store.state.isLogin){
          this.$router.replace({name:'main'})
        } 
      }  
    },

    getUserInfo( data ){
      //  join
      this.userCreate(data)
    },
    async userCreate(data) {
      //  join
      try {
        const res = await this.axios.post('/api/me/join', {
            authority_token: this.authority_token,
            props: data
        })
        if (res.status === 200) {
          this.result = res.data
          
          if (window.confirm("You are now registered. Would you like to log in now?")) {
            this.getAccessTokenExample()
          }
        }
      }
      catch(error) {
        console.log('error', error)
      }    
    }

  },
}
</script>
