
<template >
    
  <div class="setting pb-contents" > 
    <BgCanvas  color="transparent">
      
      <v-list class="text-center bgTransparent">
        <v-list-item-title>
          <h1 class="text-h4 text-brendColor textBreak"> 
            
          <span class="d-inline-flex align-start">
            <v-avatar size="small">
              <v-img
              cover
              :src="adminInfo?.userImg"
              :alt="adminInfo?.imgAlt"
              ></v-img>
            </v-avatar>
          </span>
          {{ authData.title }}  
        </h1>
        </v-list-item-title>
        <v-list-item-subtitle>
          <h2 class="text-h6" v-html="authData.subTitle"> </h2>
        </v-list-item-subtitle>
        <v-list-item class="mt-2 text-left">
          <p class="text-brendColor text-subtitle-1">INFO!</p>
          <p v-for="list in authData.list" class="mt-1 font-weight-thin"> {{ `- ${list}` }}</p>
        </v-list-item>
      </v-list>

    </BgCanvas>

    <v-divider class="mt-5 mb-7"></v-divider>

    <v-form ref="joinForm" lazy-validation>
      <v-text-field
        class="pb-6"
        v-model="userInfo.userName"
        label="NickName"
        :rules="validateRules.nicknameRules"
        hide-details="auto"
        clearable
        variant="outlined"
        maxlength="50" 
        counter="50"
      ></v-text-field>

      <v-text-field
        class="pb-10 joinThumbnailInput"
        v-model="userInfo.userImg"
        label="Thumbnail image url"
        :rules="validateRules.thumbnailRules"
        hide-details="auto"
        clearable
        variant="outlined"
        hint="Please enter web url for thumbnail images."
        @click:clear="userInfo.userImg = ''"
      >
        <v-avatar class="mr-3" v-if="userInfo.userImg.length > 1" >
          <v-img cover :src="userInfo.userImg"></v-img>
        </v-avatar>
        <template v-slot:append class="g-1">
          
          <v-btn 
          v-if="showPullThumbnailBtn"
          @click="pullThumbnail()" 
          class="text-brendColor" 
          density="comfortable" 
          icon="mdi-file-image-plus-outline">
          </v-btn>
          <v-btn 
          @click="clickRnadomImage()" 
          class="text-brendColor" 
          density="comfortable" 
          icon="mdi-dice-multiple">
          </v-btn>
        </template>
      </v-text-field>


      <v-textarea
        class="pb-6"
        v-model="userInfo.text"
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
        v-model="tagList"
        :items="tagList"
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
      
      <p class="text-caption text-warningColor">
        * When you turn on this switch, Only followed each other can see your SNS information.
      </p>
      <v-switch 
      v-model="userInfo.privateOption"
      label="Private Option"
      color="brendColor"
      ></v-switch>
      

      <v-btn
        block
        rounded="xl" 
        color="brendColor" 
        variant="flat"
        @click="emitUserinfo()"
      >
        Join
      </v-btn>
    </v-form>
  </div>
</template>
<script>

import supportLanguage from '@/utills/language/supportLanguage.js'

import BgCanvas from '@common/BgCanvas.vue'
export default {
  name: 'JoinSettingComponents',
  components: {
    BgCanvas
  },
  data(){
    return{
      authData: {
        title:"Welcome to Onion Universe!",
        subTitle: `You are making account with <br /> [${this.$textCapitalize(this.auth.snsPlatform)}] [${ this.auth.userId }]`,
        list: [
          `Friens can find you by [${this.$textCapitalize(this.auth.snsPlatform)}] [${ this.auth.userId }] after join process.`,
          `You can freely add or delete SNS account after join process.`
        ]
      },
      langSelect: false,
      lang: supportLanguage.lang,
      userInfo: {
        userName: '',
        userImg: '',
        text: '',
        lang: '',
        privateOption: false,
      },
      
      tagList: [],
    }
  },
  props:{
    auth:Object
  },
  computed:{
    showPullThumbnailBtn(){
      // show pull thumbnail button
      let stat = false
      if(typeof this.auth.userImg === 'string' || this.auth.userImg.length > 0){
        stat = true
      }
      return stat
    }
  },
  mounted(){
  },
  methods: {
    pullThumbnail(){

      this.userInfo.userImg = this.auth.userImg
    
    },
    clickRnadomImage(){
      
    const rand_0_10 = Math.floor(Math.random() * 7);
      this.userInfo.userImg = this.userRandomImageList[rand_0_10]
    },
    emitUserinfo(){

      if(!this.$refs.joinForm.isValid){
        this.$refs.joinForm.validate()
        return
      }

      this.userInfo.lang = this.langSelect.lang
      this.userInfo.tagList = this.tagList
      this.$emit('userInfo', this.userInfo)
    },
    itemProps (lang) {
      return {
        title: lang.langRead,
        subtitle: lang.langEn,
      }
    },
  },
}
</script>
<style>
.joinThumbnailInput .v-input__append{
  gap: 0.5rem
}
</style>