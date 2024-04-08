
<template >
  <v-app data-app>
    <div class="containerWrap" :class="this.$store.state.isMobile === true ? 'MOBILE': '' ">
      <component 
      :is="$route.meta.layout?.() || 'div'"
      >
        <RouterView />
      </component>
    </div>
  </v-app>
</template>
<script>
import '~css/index.less'
import BeforeLoginMain from '@views/BeforeLoginMain.vue'
import { jwtDecode } from "jwt-decode";

import  MobileDetect  from 'mobile-detect';

const SECOND = 1000 
const ONE_MIN = 60 * SECOND
export default {
  name: 'App',
  components: {
    BeforeLoginMain,
},
  data(){
    return{
      checkMobileStat: false
    }
  },
  mounted(){
    
    this.dropExpiredJwt();
      
    // global token check
    setInterval( this.jwtKeepAlive, ONE_MIN);

    // mobile check
    const md = new MobileDetect(window.navigator.userAgent);
    if( md.mobile() != null){
      this.checkMobileStat = true
    }
    this.$store.commit('checkMobile', this.checkMobileStat)

    // device resize
    window.addEventListener('resize', this.handleResize)

    this.checkLogin()
  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize)

  },
  methods: {
    async getMastodonData(){
      try {
        const res = await this.axios.get('/api/oauth-support')
        if (res.status === 200) {
          
        }
      }
      catch(error) {
      }
    },
    dropExpiredJwt () {
      const token = localStorage.getItem("compassJwt");
      if(token == null){
        return;
      } 
      let auth = jwtDecode(token) 
      let expired = new Date(auth.exp * SECOND - 3 * ONE_MIN)

      let now = new Date()
      if(expired > now){
        console.log('maintain jwt on App ready. will expired', {expired})
      }
      else {
        console.log('drop expired jwt on App ready', {expired})
        localStorage.removeItem("compassJwt")
      }
    },
    jwtKeepAlive(){       
      const token = localStorage.getItem("compassJwt");
      if(token == null){
        return;
      } 
      let auth = jwtDecode(token) 
      let expired = new Date(auth.exp * SECOND - 3 * ONE_MIN)

      let now = new Date()
      if(expired > now){
        return
      }

      this.$store.dispatch('refreshJwt');
    },
    async checkLogin(){
      if(localStorage.getItem('compassJwt') !== null){
        
        await this.$store.dispatch('getMyDetail');
        return this.$store.state.isLogin = true

      }else{
        this.$store.state.isLogin = false
        this.$store.dispatch('logReset');
        return
      }
    },
    handleResize(){

      setTimeout(() => {
        this.$store.commit('checkMobile', this.checkMobileStat)
      }, 500);
    }
  },
}
</script>