
<template >
  <v-form ref="form" lazy-validation>
    <div class="setting"> 
      <v-text-field
        class="pb-6"
        v-model="myDetail.userName"
        label="NickName"
        :rules="validateRules.nicknameRules"
        hide-details="auto"
        clearable
        variant="outlined"
        maxlength="50" 
        counter="50"
      ></v-text-field>


      <v-text-field
        class="pb-10"
        v-model="myDetail.userImg"
        label="Thumbnail image url"
        :rules="validateRules.thumbnailRules"
        hide-details="auto"
        clearable
        variant="outlined"
        hint="Please enter web url for thumbnail images."
        @click:clear="myDetail.userImg = ''"
      >
        <v-avatar class="mr-3" v-if="myDetail.userImg.length > 1" >
          <v-img cover :src="myDetail.userImg"></v-img>
        </v-avatar>
      </v-text-field>

      <v-textarea
        class="pb-6"
        v-model="myDetail.text"
        no-resize
        label="Info message"
        color="brendColor"
        variant="outlined"
        rows="3"
        :rules="validateRules.Inforules"
        maxlength="200" 
        counter="200"
      >
      </v-textarea>
      <v-combobox
        class="tagBox pb-6"
        v-model="myDetail.tagList"
        :items="myDetail.tagList"
        chips
        closable-chips
        color="brendColor"
        variant="outlined"
        label="Enter a tag that tell about you"
        multiple
        hide-selected
        hide-spin-buttons
      >
      </v-combobox>

      <v-select 
      class="pb-3"
      label="Language" 
      v-model="langSelect"
      :items="lang" 
      :item-props="itemProps"
      :suffix="langSelect?.langEn"
      return-object
      variant="outlined"
      :rules="validateRules.langRules"
      ></v-select>
      
      
      <p class=" text-caption text-warningColor">
        * When you turn on this switch, Only followed each other can see your SNS information.
      </p>
      <v-switch 
      v-model="myDetail.privateOption"
      label="Private Option"
      color="brendColor"
      ></v-switch>
      

      <v-btn 
      block
      rounded="xl" 
      color="brendColor" 
      variant="flat"
      @click="changeMyData()"
      >
        Change
      </v-btn>

    
    </div>
  </v-form>
</template>
<script>

import supportLanguage from '@/utills/language/supportLanguage.js'
export default {
  name: 'ManageInfo',
  components: {
  },
  data(){
    return{
      langSelect: '',
      lang: supportLanguage.lang,
    }
  },
  computed:{
    
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
  },
  methods: {
    
    itemProps (lang) {
      return {
        title: lang.langRead,
        subtitle: lang.langEn,
      }
    },
    async changeMyData(){
      if(!this.$refs.form.isValid){
        this.$refs.form.validate()
        return
      }


      let {friends,userKey, openIdList, ...myData} = this.myDetail
      myData.lang = this.langSelect.lang

      try {
        const userKey = this.$store.state.userKey
        const params = {
          userKey: userKey,
          props: myData
        }
        const res = await this.axios.post('/api/me/change', params )
        if (res.status === 200) {
          
          await this.$store.dispatch('getMyDetail');
          alert('My information has been edited.')
        }
      }
      catch(error) {
      }
    }, 


    setData(){
      if(typeof this.myDetail !== 'undefined'){
        this.langSelect = this.lang.find(val=> val.lang === this.myDetail.lang)
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