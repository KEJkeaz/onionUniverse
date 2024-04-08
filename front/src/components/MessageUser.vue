
<template >

  
<v-list class="msgWrap">
      <v-list-item 
      class="resetPaddingSide"
      v-for=" msg in msgData" 
      :key="msg.userCode">
        <v-avatar>
          <v-img
          cover
          src="https://cdn.vuetifyjs.com/images/john.jpg"
          alt="John"
          ></v-img>
        </v-avatar>

        <router-link 
        class="text-h6"
        :to="{name: 'userpage', params: { id: data.msg.userCode} }">
          {{ data.msg.userName }}
        </router-link >
      
        <v-btn 
        rounded="xl" 
        color="brendColor" 
        variant="flat" 
        @click="showMessage(data.msg.userCode)">
          show Msg
        </v-btn>
      
      </v-list-item>
    
  </v-list>
  <slot></slot>
</template>
<script>
export default {
  name: 'MsgUserComponents',
  props:{
    data:Object
  },
  methods: {
  },
}
</script>