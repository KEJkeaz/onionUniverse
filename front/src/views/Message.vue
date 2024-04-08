
<template >
  <div class="message list">
    <p class="text-caption text-brendColor text-right">Message limit:  {{ myQuota?.used }}/{{ myQuota?.limit }}</p>
    <v-list >
      <UserInfo 
      v-for="(msg, i) in msgData" 
      :data="msg.otherUser === null? msg : msg.otherUser" 
      :key="i">
        
        <template v-slot:btn >
          <v-btn 
          rounded="xl" 
          color="brendColor" 
          variant="flat" 
          @click="showMessage(msg)">
          show Msg
        </v-btn>
      </template>
    </UserInfo>
    
</v-list>
<MessagePopup @new-message="sendNewMessage">
</MessagePopup>


</div>
</template>
<script>

import '~components/message.less'
import UserInfo from '@components/UserInfo.vue'
import MessageUser from '@components/MessageUser.vue'
import MessagePopup from '@components/modal/MessagePopup.vue'
export default {
  name: 'message',
  components: {
    UserInfo,
    MessageUser,
    MessagePopup,
  },
  data(){
    return{
      msgData: {},
      pageType: 'list',
    }
  },
  
  computed: {
    friends() {
      return this.$store.state.myDetail.friends;
    },
    userKey(){
      return this.$store.state.userKey;
    },
    myQuota(){
      return this.$store.state.myDetail?.user?.quota;
    }
  },
  mounted(){
    this.getMsgList()
  },
  methods: {
    async sendNewMessage(msg){
      
      const params = {
        from_userKey: this.userKey,
        to_userKey: msg.toUserKey,
        message: msg.message
      }
      try {
        const res = await this.axios.post('/api/dialogue/send', params )
        if (res.status === 200) {

          this.getMsgList()
          alert('message has been sent.')

        }
      }
      catch(error) {
        alert('Message usage is limited.')
      }
      
    },
    openModal() {
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
    showMessage(key){
      // dialogue key, send user key, receive user key 
      this.$router.push({name:'showMessage', params: {id: key.dialogueKey} })
    },
    async getMsgList(){
      try {
        const userKey = this.$store.state.userKey
        const res = await this.axios.post('/api/dialogue/my-list', { 'userKey': userKey})
        if (res.status === 200) {
          res.data.list.map(list=>{
              if(list.otherUser === null){
                
              const admin = this.adminInfo
              
                return Object.assign(list, admin);
              }
              this.friends.map(friend => {
                return friend
              })
            

          })
          this.msgData = res.data.list
        }
      }
      catch(error) {
      }
    }
  },
}
</script>