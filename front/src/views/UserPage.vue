
<template >
  <div id="">
    <div class="user">
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn 
          @click="clickShare()" 
          class="text-brendColor" 
          density="comfortable" 
          icon="mdi-share-variant">
          </v-btn>
        </v-col>
      </v-row>
      <UserInfo :data="userData" >
        <template v-slot:btn v-if="!isMy">
          <FriendsButton v-if="$store.state.isLogin === true" :isMyFriend="this.$checkFriendsBoth(this.$store.state.myDetail.friends, userData?.userKey)" :targetUser="userData?.userKey"></FriendsButton>
        </template>
        <template v-slot:snsListSlot>
            <UserSnsList :openIdList="userData?.openIdList" :userLinkList="userData?.userLinkList"></UserSnsList>
        </template>
      </UserInfo>
    </div>
  </div>
</template>
<script>
import FriendsButton from '@common/button/FriendsButton.vue'

import UserInfo from '@components/UserInfo.vue'
import UserSnsList from '@components/UserSnsList.vue'

export default {
  name: 'Userpage',
  components: {
    UserInfo,
    UserSnsList,
    FriendsButton
  },
  data(){
    return{
      userData: {},
      isMy: false, 
    }
  },
  computed: {
    snsList() {
      return this.$store.state.snsList
    },
    myDetail() {
      return this.$store.state.myDetail.user;
    }
  },
  mounted(){
    this.checkMy()
    
  },
  methods: {
    clickShare(){
      let data = {
        url:''
      }
      window.navigator.share(data);
    },
    async getUserDataPublic(){

      try {
        const userKey = this.$route.params.id
        const res = await this.axios.post('/api/user/detail-public', { 'userKey': userKey })
        if (res.status === 200) {
          this.userData = res.data.user
        }
      }
      catch(error) {
      }

    },
    async getUserData(){

      try {
        const userKey = this.$route.params.id
        const res = await this.axios.post('/api/user/detail', { 'userKey': userKey })
        if (res.status === 200) {
          this.userData = res.data.user
        }
      }
      catch(error) {
      }
      
    },
    checkMy(){
      if(this.$store.state.isLogin === false){
        this.getUserDataPublic()
        return;
      }
      if(this.$route.params.id === this.$store.state.userKey){
        this.userData = this.myDetail
        this.isMy = true
      }else{
        this.getUserData()
      }
    }
  },
  watch:{
    myDetail(val){
      this.checkMy()
    }
  }
}
</script>