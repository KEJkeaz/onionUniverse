
<template >
  <v-row align-self="center" class="search ga-2">
    <v-col :cols="this.$store.state.isMobile?3:4" >
      <v-select
        class="selectSns"
        v-model="selectSns"
        :model-value="selectSns"
        :items="Object.keys(snsList)"
        label="SNS"
        :hint="selectSns"
        color="brendColor" 
        variant="outlined" 
        density="comfortable"
        rounded
      >
        <template v-slot:item="{ props, item }">
          <v-list-item  v-bind="props" :value="item">
            <template v-slot:prepend v-if="item.value.length > 0">
              <v-avatar rounded="0" v-if="item.value.length > 0" class="">
                <font-awesome-icon :icon="['fab', item.value]" />
              </v-avatar>
            </template>
          </v-list-item >
        </template>

        <template v-slot:selection="data">
            <v-avatar rounded="0" v-if="data.item.value.length > 0">
              <v-icon :icon="`mdi-${data.item.value}`"></v-icon>
            </v-avatar>
            <p v-if="$store.state.isMobile === false">
              {{ data.item.title }}
            </p>
        </template>

      </v-select>
      
    </v-col>
    
    <v-col cols="" >
      <v-autocomplete
      class="searchInput"
      
      @keydown.enter="getFindUser"
      :items="searchLogData"
      
      :loading="isLoading"
      label="Search User ID"
      density="comfortable"
      v-model="searchText"
      item-title="userId"
      item-value="userId"
      hide-no-data
      hide-details
      menu-icon=""
      placeholder="Search Your Friends"
      color="brendColor" 
      rounded
      clearable
      variant="outlined" 
      persistent-counter
      @blur="checkUser"
      
      >

        <template v-slot:item="{ props, item }">
          <v-list-item
            @click="searchText = item.raw.userId, selectSns  = item.raw.snsPlatform"
            v-bind="props"
            :prepend-icon="`mdi-${item.raw.snsPlatform}`"
            :title="item.raw.userId"
          ></v-list-item>
        </template>    
      </v-autocomplete>
      <p class="text-caption text-warningColor" v-if="searchWarnInfo.length > 0"> {{ searchWarnInfo }} </p>
    </v-col>
    <v-col cols="auto">
      <v-btn v-if="$store.state.isMobile"
        icon
        color="brendColor"
        @click="getFindUser"
      >
        <v-icon>
          mdi-magnify
        </v-icon>
      </v-btn>
      
      <v-btn
        v-else
        rounded="xl" 
        color="brendColor" 
        variant="flat" 
        size="large"
        @click="getFindUser"
      >
        search
      </v-btn>
    </v-col>
  </v-row>

  <div v-if="this.$CheckObjEmpty(userData)">
    
    <v-row>
      <v-col class="text-center">
        <h3 class="mt-6 mb-2 text-h6 text-brendColor textBreak">{{ statText }}</h3>
      </v-col>
    </v-row>

    
  </div>
  <div v-else>
    <UserInfo :data="userData" >
      <template v-slot:btn>
        <FriendsButton :targetUser="userData?.userKey"></FriendsButton>

      </template>
    </UserInfo>
  </div>

</template>
<script>

import FriendsButton from '@common/button/FriendsButton.vue'

import UserInfo from '@components/UserInfo.vue'
export default {
  name: 'Search',
  components: {
    UserInfo,
    FriendsButton
},
  data(){
    return{

      selectSns: '',
      searchText:'',


      isLoading: false,
      userData: {},
      searchLogData: [],
      statText: "",
      searchInfo: "You must enter the correct SNS platform and user ID(or handle) to find your friends.",
      searchResText: "No matching search results found.",
      // search warning info text
      searchWarnInfo:'',
    }
  },
  computed: {
    snsList() {
      return this.$store.state.snsList
    }
  },
  mounted(){
    this.getSearchLog()
    this.statText = this.searchInfo
  },
  methods: {
    checkUser(e) {
      this.searchText = e.target.value
    },

    async getSearchLog(){
      try {
        const res = await this.axios.get('/api/me/search-log')
        if (res.status === 200) {

          let num = 5
          if(res.data.searchLog.length < 4){
            num = res.data.searchLog.length
          }
          this.searchLogData = res.data.searchLog.slice(Number(`- ${num}`)).reverse();
        }
      }
      catch(error) {
      }
    },

    async getFindUser(){
      try {
        const selectSns = this.selectSns
        let searchWord = this.searchText
        if(selectSns.length === 0 || searchWord.length === 0){
          alert('SNS platform and search word cannot be empty.')
          return;
        }
        // frontProps = Front usage Data
        const params = {'snsPlatform':selectSns, 'userId': searchWord}
        const res = await this.axios.post('/api/user/search-by-word', params )
        
        if (res.status === 200) {
          this.userData = res.data.user
          this.getSearchLog()
        }
      }
      catch(error) {
        this.userData = {}
        this.statText = this.searchResText
        this.getSearchLog()
      }
    },
    resetSearch(){
      this.userData = {}
    }

  },
  
  watch: {
    selectSns: function (val, oldVal) {
      let text = ''
      if(val === 'mastodon'){
        text = "please enter the handle and instance (@userHandle@instance.input) together."
      }else if(val === 'google'){
        text = "please enter the id and mail address (userId@gmail.com) together."
      }
      this.searchWarnInfo = text
    }
  }
  
}
</script>