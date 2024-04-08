
<template >
  <div id="friends" class="list">
    <div v-if="friendsList?.length > 0">
      <UserInfo 
      :data="friends" 
      v-for=" friends in friendsList" 
      :key="friends.userKey">  
        
        <template v-slot:btn>
          <FriendsButton :targetUser="friends.userKey"></FriendsButton>
        </template>

        <template v-slot:memo>
          <UserMemo :targetUser="friends.userKey" :memoData="(typeof friends.memo === 'undefined'?'':friends?.memo)"></UserMemo>
        </template>
      </UserInfo>
    </div>
    <div v-else>

      <v-row>
        <v-col class="text-center">
          <h3 class="mt-6 mb-2 text-h5">Your follower is not added.</h3>

          <span class="text-grey-lighten-1">Try searching for follower!</span>
        </v-col>
      </v-row>
    </div>

  </div>
</template>
<script>

import FriendsButton from '@common/button/FriendsButton.vue'
import UserInfo from '@components/UserInfo.vue'
import UserMemo from '@common/UserMemo.vue'

export default {
  name: 'follower',
  components: {
    UserInfo,
    FriendsButton,
    UserMemo
  },
  data(){
    return{
    }
  },
  
  computed: {
    friendsList() {
        return this.$store.state.myDetail.friends;
      }
  },

  mounted(){
    // this.getFriendsData()
  },
  methods: {
  },
}
</script>