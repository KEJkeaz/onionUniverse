
<template>
  <div :class="$store.state.isLogin === true?'':'notLog'">
    <div class="left">
    </div>
    <div class="center">
      <button class="d-flex align-center text-brendColor homeBtn" @click="$router.push({name: 'main' })">        
        <v-avatar size="small">
          <v-img
          cover
          :src="adminInfo?.userImg"
          :alt="adminInfo?.imgAlt"
          ></v-img>
        </v-avatar>
        <span class="header-site-name">Onion-Universe.com</span>
      </button>
      <small class="text-center">   
        Improved telephone book of SNS era
      </small>


    </div>
    <div class="right" v-if="$store.state.isLogin === true" >

      <button class="pa-2 text-brendColor" @click="this.$store.dispatch('logout');">
        <font-awesome-icon :icon="['fas', 'arrow-right-from-bracket']" size="xl" />
        <span class="pa-2" v-if="$store.state.isMobile === false">Logout</span>
      </button>

      <button class="pa-2 text-brendColor" @click="$router.push({name: 'setting' })">
        <font-awesome-icon :icon="['fas', 'gear']" size="xl" />
        <span class="pa-2" v-if="$store.state.isMobile === false">Setting</span>
      </button>
    </div>
  </div>
</template>

<script>
 import '~components/header.less'
export default {
  name: 'Header',
  components: {
  },

  data(){
    return{
    }
  },
  methods: {
    
  },
}
</script>