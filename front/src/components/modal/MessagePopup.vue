<template>
  <div justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn 
        icon="mdi-plus"
        class="newMessageSendBtn text-white"
        v-bind="props"
        color="brendColor"
        >
        <v-icon>mdi-plus</v-icon>
        <v-tooltip
        v-if="$store.state.isMobile !== true"
        activator="parent"
        location="top"
        :open-delay="700"
        >
          New Message
        </v-tooltip>

        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="brendColor"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>new Message</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container fluid>
          
          <v-form ref="messageForm" lazy-validation>

            <v-autocomplete
              class="selectStyle mt-2"
              v-model="selectedFriends"
              :items="friendsList"
              color="brendColor"
              variant="outlined"
              item-title="userName"
              item-value="userKey"
              label="Select Your Follower"
              :rules="messageRules.userSelectRules"
              clearable
            >
              <template v-slot:chip="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item?.raw?.userImg"
                  :title="item?.raw?.userName"
                ></v-list-item>
              </template>

              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :prepend-avatar="item?.raw?.userImg"
                  :title="item?.raw?.userName"
                  :subtitle="item?.raw?.memo"
                ></v-list-item>
              </template>
            </v-autocomplete>
          
            <v-textarea
              class="mt-4"
              v-model="insertedMessage"
              counter
              no-resize
              color="brendColor"
              label="Type a message to email your friend"
              variant="outlined"
              rows="7"
              :rules="messageRules.textareaRules"
            ></v-textarea>
            <v-btn 
            block
            rounded="xl" 
            color="brendColor" 
            variant="flat"
            @click="emitMsg()"
            >
              Send
            </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import '~components/modal/modal.less'

export default {
  name: 'MessageModal',
  components: {
  },
  props: {
  },
  data(){
    return{

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      autoUpdate: true,

      selectedFriends: '',
      insertedMessage: '',

    }
  },
  
  computed: {
    friendsList() {
        return this.$store.state.myDetail.friends;
      }
  },
  methods: {
    emitMsg() {
      
      if(!this.$refs.messageForm.isValid){
        this.$refs.messageForm.validate()
        return
      }else{
      
        this.dialog = false
        
        const value =  {
          'toUserKey': this.selectedFriends,
          'message': this.insertedMessage
        }
        this.$emit('newMessage', value)
      }
    }
  }

}
</script>

