<template >
  <div id="mainPage">
    <div v-if="this.$store.state.isLogin">
        
      <h1 class="text-center">Welcome to <br /><span class=" text-brendColor">ONION UNIVERSE!</span></h1>

      <h2 class="text-h5">* Announcement</h2>
      <p class="text-subtitle-1">- 2024.02 Onion Universe is created</p>

      
      <v-divider class="mt-6 mb-6"></v-divider>

      <h2 class="text-h5">* Guide</h2>
      <Guide></Guide>

      <v-divider class="mt-6 mb-6"></v-divider>

      <h2 class="text-h5">* Contribution & Contact</h2>
      <p class="text-subtitle-1">
        We welcome all type of contribution. <br/>
        This site is created by only 2 developers in South Korea.<br/>
        Therefore, we may have many area to improve.<br/>
        For instance, it’s a pity that creating website without a web designer.  Or you may think new SNS platform should be supported. <br/>
        If you find a bug or have some request, Please mail to <a href="mailto:team.onionuniverse@gmail.com" class="text-brendColor">team.onionuniverse@gmail.com</a><br/>
        At the same time, financial support is welcomed. As you know, web server is not free.<br/>
      </p>
      
      <a class="d-inline-block mt-5" target="_blank" href="https://www.buymeacoffee.com/team.onionuniverse">
        <v-img
        :width="150"
        cover
        src="/bmc-button-150.png"
        ></v-img>
      </a> 
      <br />
      <v-img
        :width="150"
        cover
        src="/bmc-qr-150.png"
      ></v-img>

    </div>
    <div v-else>
      <BeforeLoginMain></BeforeLoginMain>
    </div>
  </div>
</template>
<script>

import BeforeLoginMain from '@views/BeforeLoginMain.vue'

import MessageUser from '@components/MessageUser.vue'
import UserInfo from '@components/UserInfo.vue'
import Guide from '@views/Guide.vue'
export default {
  name: 'mainPage',
  components: {
    UserInfo,
    MessageUser,
    BeforeLoginMain,
    Guide
  },
  data(){
    return{
      userData: {},
    }
  },
  
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  mounted() {
    // route redirect check
    if(this.$route.query.redirect !== undefined){
      sessionStorage.setItem('compassRedirect', this.$route.query.redirect);
    }

    // session exist check 
    if(sessionStorage.getItem('compassRedirect') !== null){
      this.routeRedirect()
    }
    
  },
  methods: {
    routeRedirect(){
      let isLogin = this.$store.state.isLogin
      if(isLogin === true){
        this.$router.push(sessionStorage.getItem('compassRedirect'))
        sessionStorage.removeItem('compassRedirect');
      }
    },
    remove(){
      localStorage.removeItem('compassJwt');
      this.$store.state.isLogin = false
      this.$router.push({name:'main'})
    },
  },
  watch:{
    isLogin(val){
      return val
    }
  }
}
</script>
