
<template >
  <slot name="setting" v-if="(typeof this.$slots.setting !== 'undefined')"></slot>
  <v-container class=" mt-3 userInfo">

    <v-row>
      <v-col :cols="Boolean(data?.text) === false? 6 :5" class="text-center">
        <v-avatar size="x-large">

          <v-img
          cover
          :src="data?.userImg"
          :alt="data?.userName"
          ></v-img>
        </v-avatar>

        <v-list-item>
          <v-icon v-if="data.privateOption">mdi-lock</v-icon>
          <button @click="this.$router.push({ name: 'userpage', params: { id: data?.userKey }}) ">       
            {{ data?.userName }}
          </button>
          
        </v-list-item>
      </v-col>
      <v-col class="d-flex align-center">
        <p v-if="Boolean(data?.text)">
          {{ data?.text }}
        </p>
        
      </v-col>
      
      <v-col 
      v-if="!!!(typeof this.$slots.btn === 'undefined')"

      :cols="Boolean(data?.text) === false? 5 :3" 
      class="d-flex align-center ">
         
        <slot name="btn"></slot>
      </v-col>
      <v-col cols="12" class="memo" v-if="(typeof this.$slots.memo !== 'undefined')">
        <slot name="memo"></slot>
      </v-col>  
      <v-col cols="12" v-if="(typeof this.$slots.snsListSlot !== 'undefined')" >
        <slot name="snsListSlot"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  name: 'UserInfoComponents',
  components: {
  },
  props:{
    data: {
      type: Object,

    },
  },
  data(){
    return{
      
    }
  },
  methods: {
  },
}
</script>