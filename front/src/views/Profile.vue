
<template >
  <div v-if="loading">
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex flex-wrap" v-for="val in 4">
          <v-skeleton-loader
            type="list-item-two-line"
            width="80%"
          ></v-skeleton-loader>
          
          <v-skeleton-loader
            width="20%"
            type="button"
          ></v-skeleton-loader>
          
          <v-divider v-if="val !== 3"></v-divider>
        </v-col>
        
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-list>
      <UserInfo :data="userData" >
        
        <template v-slot:snsListSlot>
          <UserSnsList :openIdList="userData?.openIdList" :userLinkList="userData?.userLinkList"></UserSnsList>
        </template>
      </UserInfo>

    </v-list>
    
  </div>
</template>
<script>

import MessageUser from '@components/MessageUser.vue'
import UserInfo from '@components/UserInfo.vue'
import UserSnsList from '@components/UserSnsList.vue'
export default {
  name: 'profile',
  components: {
    UserInfo,
    MessageUser,
    UserSnsList
  },
  data(){
    return{
      loading: true,
    }
  },
  
  computed: {
    snsList() {
      return this.$store.state.snsList
    },
    userData() {
      
      if(typeof this.$store.getters.myDetail.user !== 'undefined'){
        this.loading = false
      }
      let userData = this.$store.getters.myDetail
      return userData.user
    }
  },

  mounted(){
  },
  methods: {

    setData(val){
      if(typeof this.userData !== 'undefined'){
        this.loading = false
      }
    },
    
  },
  watch:{
    userData(val){
      this.setData(val)
    }
  }
}
</script>