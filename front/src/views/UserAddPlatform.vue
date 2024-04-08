<template >
<v-container>
  <div id="UserAddPlatform"> 

  </div>
  </v-container>
</template>
<script>


import JoinSetting from '@components/JoinSetting.vue'
import { jwtDecode } from "jwt-decode";

export default {
  name: 'UserAddPlatform',
  components: {
    JoinSetting,
  },
  data(){
    return{
      authority_token: '',
      result: ''
    }
  },
  created() {
    
  },
  mounted() {
    this.authority_token = this.$route.query.authority_token
    this.auth = jwtDecode(this.authority_token) 
    this.checkAlreadyUsedAccount(this.auth)

    this.addPlatform()
  },
  methods: {
    checkAlreadyUsedAccount(auth){
      const userKey = this.$store.state.userKey
      if(auth.hasMembership){
          if (window.confirm("Already Used SNS account.")) {
            this.$router.push({name: 'setting' })

          }
      }
    },
    async addPlatform() {
      try {
        const res = await this.axios.post('/api/me/add-open-id', {
          authority_token: this.authority_token
        })
        if (res.status === 200) {
          this.result = res.data
          
          await this.$store.dispatch('getMyDetail');
          this.$router.push({name: 'setting' })
        }
      }
      catch(error) {
        // console.log('error', error)
      }    
    }
  }
}
</script>
