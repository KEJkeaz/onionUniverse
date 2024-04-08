
<template >
<div v-if="loading">
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex flex-wrap" v-for="val in 3">
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
  <div class="profileOptionWrap mb-4">
    <div class="settingWrap text-right">
      <button class="text-brendColor" @click="$router.push({name: 'userpage' , params: {id: this.myDetail.userKey} })">
        <font-awesome-icon :icon="['fas', 'user']" />
        Preview Profile
      </button>
    </div>
  </div>
    
  <v-expansion-panels
  variant="accordion"
  v-model="panel">
    
    <v-expansion-panel 
    expand
    v-model="panel">
      <v-expansion-panel-title>
        {{ titles[0] }}
      </v-expansion-panel-title>
      
        
      <v-expansion-panel-text>

        <ManageSNS></ManageSNS>

      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ titles[1] }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <ManageURL></ManageURL>
      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
    
      <v-expansion-panel-title>
        {{ titles[2] }}
      </v-expansion-panel-title>
      <v-expansion-panel-text class="mt-6">
        
        <ManageInfo></ManageInfo>
      </v-expansion-panel-text>
      
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ titles[3] }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        
        <SearchLogPopup ></SearchLogPopup>

      </v-expansion-panel-text>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-title>
        {{ titles[4] }}
      </v-expansion-panel-title>
      <v-expansion-panel-text class="text-center">

        <v-btn
          class="mt-6 mb-2"
          rounded="xl" 
          color="brendColor" 
          variant="flat" 
          target="_blank"
          href="/privacy-policy.pdf"
        >
          Open Privacy Policy in New Tab
        </v-btn>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  

  <v-container>
    <p class="text-h6 mt-6 mb-2 text-brendColor">Notice!</p>

    <div
    v-for="(msg, key) in adminMsgList"
    :key="msg"
    >
      <v-row>
        <v-col>
          <p>{{ msg.message }}</p>
          <p class="mt-2 text-right text-caption text-brendColorGray">{{ msg.datetime }}</p>
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-end">
          <InfoMessageButton :data="msg"></InfoMessageButton>
        </v-col>
      </v-row>
      <v-divider v-if="key !== adminMsgList.length - 1 " class="mt-2 mb-2"></v-divider>
    </div>

    
  </v-container>
</div>

</template>
<script>

import SearchLogPopup from '@components/modal/SearchLogPopup.vue'
import InfoMessageButton from '@common/button/InfoMessageButton.vue'


import ManageSNS from '@components/setting/ManageSNS.vue'
import ManageURL from '@components/setting/ManageURL.vue'
import ManageInfo from '@components/setting/ManageInfo.vue'



import  dayjs from 'dayjs'

export default {
  name: 'Setting',
  components: {
    SearchLogPopup,
    InfoMessageButton,
    ManageSNS,
    ManageURL,
    ManageInfo
  },
  data(){
    return{
      panel: [0],
      
      imgPreview:'',

      // model: null,
      titles:[
        'Manage My SNS', 
        'Manage My URLs', 
        'Manage My Information',
        'Manage Search History',
        'Open Privacy Policy',
      ],
      

      loading: true,
      
      adminMsgList: []
    }
  },
  computed: {
    snsList() {
      return this.$store.state.snsList
    },
    myDetail () {
      let myDetail = this.$store.getters.myDetail
      return myDetail.user
    }
  },

  mounted(){
    this.setData()
    this.adminMsg()
  },
  methods: {
    
    async adminMsg(){
      try {

        const res = await this.axios.get('/api/dialogue/notice-latest-5')
        if (res.status === 200) {
          
          res.data.messages.map( msg => {
            msg.datetime = dayjs(msg.datetime).format("YYYY-MM-DD HH:mm:ss")
          })

          this.adminMsgList = res.data.messages
        }
      }
      catch(error) {
      }
    },
    setData(){
      if(typeof this.myDetail !== 'undefined'){
        this.loading = false
      }
    },
  },
  watch:{
    myDetail(val){
      this.setData()

    },
  }
}
</script>