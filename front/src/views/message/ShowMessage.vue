<template>
  <v-row class="showMessage" justify="center">
    <v-container fluid>
      <v-list>
        <v-list-item class="messageTitle resetPaddingSide ">
          
          
          <v-list-item-title class="text-h6 d-flex  align-center text-center">
            <v-btn
              variant="flat"
              @click="$router.push({name:'message'})" alt="previous page"
            >
              <font-awesome-icon class="text-h6" :icon="['fas', 'arrow-left']" />
            </v-btn>

            <v-avatar>
              <v-img
              cover
              :src="otherDetail.userImg"
              :alt="`${otherDetail.userName} image`"
              ></v-img>
            </v-avatar>
            <span class="ml-6">{{otherDetail.userName}}</span>
          </v-list-item-title>

        </v-list-item>
        
        <div v-if="loading">
          <v-container class="mt-15">
            <v-row>
              <v-col cols="12" class="d-flex flex-wrap">
                <v-skeleton-loader
                  type="list-item-two-line"
                  width="100%"
                ></v-skeleton-loader>
                
              </v-col>
              
            </v-row>
          </v-container>
        </div>
        <div v-else class="msgWrap" ref="msgWrap">
          <v-list-item 
          :class="msg.type"
          v-for="(msg, i) in messages"
          :key="i">
            
            
            <div>
              <div class="textWrap">
                <p class="text d-flex justify-space-between">
                  {{ msg.message }}
                  <InfoMessageButton v-if="isAdmin" :data="msg"></InfoMessageButton>
                </p>
              </div>
              <v-list-item-subtitle class="datetime">{{msg.datetime}}</v-list-item-subtitle>
            </div>
            
          </v-list-item>
        </div>
        
      </v-list>
      
      
      <div class="messageInputWrap">
        <v-divider></v-divider>
        <br />
        <v-form ref="messageForm" lazy-validation>
          <v-textarea
          v-model="enteredMsg"
          :counter="!isAdmin"
          no-resize
          color="brendColor"
          label="Type a message to email your friend"
          variant="outlined"
          :rules="messageRules.textareaRules"
          rows="3"
          :readonly="isAdmin"
          ></v-textarea>

          <v-btn rounded="xl" 
          block
          color="brendColor" 
          variant="flat" 
          @click="sendMsg"
          :disabled="isAdmin"
          >
            Send
          </v-btn>
      </v-form>
      </div>
    </v-container>
  </v-row>
</template>

<script>

import InfoMessageButton from '@common/button/InfoMessageButton.vue'
import '~components/message.less'
import  dayjs from 'dayjs'

export default {
  name: 'showMessage',
  components: {
    InfoMessageButton
  },
  props: {
  },
  data(){
    return{
      
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      

      loading: true,

      enteredMsg:'',


      // 다이얼로그 내용
      dialogueKey: '',
      isNotice: false,
      messages: [],
      userKeys: [],

      // 상대방 디테일
      otherDetail: {},

      isAdmin: false,

      values: '',
      
      autoUpdate: true,

      // admin msg btn
      buttonText: ''

    }
  },
  mounted(){
    this.getMessageDetail()
  },

  computed: {
    userKey () {
      return this.$store.getters.userKey
    }
  },
  methods: {
    
    scroll_bottom() {
      const el = this.$refs.msgWrap;
      if (el) {
        el.scrollIntoView({block: "end", behavior: 'auto'});
      }
    },

    async getUserData(otherKey){
      // get other user detail
      try {
        const res = await this.axios.post('/api/user/detail', { 'userKey': otherKey })
        if (res.status === 200) {
          this.otherDetail = res.data.user
          this.loading = false
        }
      }
      catch(error) {
      }
    },
    async getMessageDetail(){
      // get message detail
      try {
        const dialogueKey = this.$route.params.id
        const userKey = this.$store.state.userKey
        if(userKey.length == 0){
          this.loading = true
          return
        }

        const param = {
          'dialogueKey':dialogueKey
        }
        const res = await this.axios.post('/api/dialogue/detail', param)
        if (res.status === 200) {
          const {dialogueKey,isNotice,messages,userKeys} = res.data.dialogue

          if(userKeys.length < 2){
            this.isAdmin = true
            this.otherDetail = this.adminInfo
          }
          
          
          messages.map( msg =>{
            msg.datetime = dayjs(msg.datetime).format("YYYY-MM-DD HH:mm:ss")
            if (msg.userKey === userKey){
              // message key === userKey = send
              msg.type = 'send'
            }else{
              // message key !== userKey = receive
              msg.type = 'receive'
            }
          })

          if(isNotice === true){
            this.isNotice = true
            
            this.loading = false
          }

          Object.assign(this, {dialogueKey,messages,userKeys})

          if(this.isNotice === false){
            // get user detail
            this.getUserData(userKeys.find((user) => user !== userKey))
          }

          
        }
      }
      catch(error) {
      }

    },
    async sendMsg(){
      // check message rule varidation
      
      if(!this.$refs.joinForm.isValid){
        this.$refs.joinForm.validate()
        return
      }
      
      try {
        const dialogueKey = this.$route.params.id
        const userKey = this.$store.state.userKey
        const param = {
          'to_userKey':this.userKeys,
          'message': this.enteredMsg
        }
        const res = await this.axios.post('/api/dialogue/send', param)
        if (res.status === 200) {
          this.getMessageDetail()
        }
      }
      catch(error) {
        alert('Message usage is limited.')
      }
    }, 
    remove (item) {
      const index = this.friends.indexOf(item.name)
      if (index >= 0) this.friends.splice(index, 1)
    },
  },
  watch: {
    messages: function (val, oldVal) {
      this.$nextTick(function () {
          this.scroll_bottom();
      });
    },
    userKey(val){
      this.getMessageDetail()
      return val
    }
  }
}
</script>

