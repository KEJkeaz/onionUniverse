
<template >
  <v-btn 
  rounded="xl" 
  color="brendColor" 
  variant="flat" 
  @click="clickAdminBtn()"
  >
  {{ adminMsgType[data.messageType]?.buttonText }}
  </v-btn>
</template>
<script>
export default {
  name: 'infoMessageButton',
  props:{
    data: {
      type: Object, 
      
    },
  },
  data(){
    return{
      
    }
  },
  mounted(){
  },
  methods: {
    clickAdminBtn(){

      let msgData = this.adminMsgType[this.data.messageType]
      
      if(this.data.messageType === 'join'){
        this.$router.push({ name: msgData.buttonTargetName})
      }else{
      this.$router.push({ name: msgData.buttonTargetName, params: { id: this.data?.targetUserKey }})

      }
    },
  }
}
</script>