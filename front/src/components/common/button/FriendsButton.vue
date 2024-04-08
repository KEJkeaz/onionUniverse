
<template >
  <v-btn 
  rounded="xl" 
  color="brendColor" 
  variant="flat" 
  v-for="(friendsType, key) in friendsTypeList.filter((friends) => friends.type === type)"
  v-if="!checkMy"
  :key="key"
  @click="friendsDivider(friendsType.type)">
    {{friendsType.text}}
  </v-btn>

</template>
<script>
export default {
  name: 'FriendsButton',
  props:{
    isMyFriend: {
      type: String,  
      default: 'goFriends'
      
    },
    targetUser:{
      type: String,  
      default: 'none'
    }
  },
  data(){
    return{
      type: this.isMyFriend,
      checkMy: false,
      friendsTypeList: [
      {
        'text': "go",
        'type': "goFriends"
      },
      {
        'text': "add",
        'type': 'addFriends'
      },
      {
        'text': "remove",
        'type': 'unFriends'
      },
      ]
    }
  },
  mounted(){
    this.checkProfile()
  },
  methods: {
    checkProfile(){
      if(this.$route.params.id === undefined){
        return;
      }
      if(this.$route.params.id === this.$store.state.userKey){
        this.checkMy = true
      }
    },
    friendsDivider(type){
      switch (type) {
        case 'goFriends':
        this.$router.push({name: 'userpage' , params: {id: this.targetUser} })
        break;
        case 'addFriends':
        this.addFriends()
        break;
        case 'unFriends':
        this.unFriends()
        break;
      }
    },
    async addFriends(){

      try {
        const userKey = this.$store.state.userKey
        const params = {
          userKey: userKey,
          friendKey: this.targetUser
        }
        const res = await this.axios.post('/api/me/add-friend', params )
        if (res.status === 200) {
          alert('Additional followers completed')
          
          await this.$store.dispatch('getMyDetail');
          this.type = 'unFriends'
        }
      }
      catch(error) {
      }
    },
    async unFriends(){
      try {
        const userKey = this.$store.state.userKey
        const params = {
          userKey: userKey,
          friend_userKey: this.targetUser
        }
        const res = await this.axios.post('/api/me/del-friend', params )
        if (res.status === 200) {
          alert('Delete Followers Completed')          
          await this.$store.dispatch('getMyDetail');
          this.type = 'addFriends'
        }
      }
      catch(error) {
      }

    },
  },
  watch: {
    isMyFriend(){
      this.type = this.isMyFriend
    }
  }
}
</script>