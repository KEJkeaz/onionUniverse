<template >
  
  <div id="beforeLoginMain" class="text-center" >
        
    <v-parallax class="main1" :src="bg1">
      <div class="mainConBox d-flex flex-column fill-height justify-center align-center mainTextPosition">
      <TextGradtion>
        <h1 class="font-weight-black" 
        :class="this.$store.state.isMobile?'text-h3':'text-h1'" >Onion Universe</h1>
      </TextGradtion>
        <TextGradtion>
          
        <h1 class="mt-6 mb-10 font-weight-black " 
        :class="this.$store.state.isMobile?'text-h4':'text-h2'"
        >Make buoy to find you on SNS</h1>
      </TextGradtion>
    </div>
    </v-parallax>

    <v-parallax class="main2 childTextWhite text-center" :src="bg4">
      <div class="mainConBox d-flex flex-column align-center">
        <h2 class=" mb-10 mt-10 text-h4 font-weight-bold " >
          What is <em class="text-brendColorLight"> <br v-if="this.$store.state.isMobile" /> "Onion Universe"</em>?
        </h2>
        <p class="mt-5 text-left d-flex flex-column alien-center text-h6 mt-0"
        :class="this.$store.state.isMobile?'w-85':'w-50'"
        >
          <em class="text-brendColorLight d-content pr-1">"Onion Universe"</em> is NOT a SNS. <br/>
          It only work like an improved telephone book of SNS era. <br/>
          When you change mainly used SNS platform, "Onion Universe" works as trail to find you. <br/>
          It make simple the question "where to find you?". <br/>
          Just take a little time for keeping in touch with friend. <br/> 
        </p>
      </div>
    </v-parallax>

    <v-parallax class="main3" :src="bg5">
      <v-row align="center" justify="center" class="mainConBox ">
        <v-col cols="12" >
          <v-card
            class="mx-auto childTextWhite elevation-0 bgTransparent pt-10 d-flex flex-column align-center justify-center  "
            max-width="400"
          >
          <TextGradtion class="mb-10">
            <h1 class="text-h4 font-weight-medium">Join to start our service</h1>
          </TextGradtion>
            <div class="d-flex align-center justify-center ">
              <font-awesome-icon v-if="isSelected !== ''" :icon="['fab', isSelected.iconName]" />
              <v-card-title>
                {{ isSelected !== ''?isSelected.title:'select Your SNS' }}
              </v-card-title>
            </div>
            <v-expand-x-transition>
              <v-select
                v-if=" isSelected.title === 'mastodon'"
                label="Select Instance"
                color="brendColor" 
                variant="outlined" 
                density="comfortable"
                v-model="mastodonInstance"
                rounded
                hide-details
                hint="false"
                :items="Object.keys(snsList.mastodon.instance)"
                class="w-50"
              ></v-select>
            </v-expand-x-transition>
            
            <v-card-actions class="justify-center" v-if="isSelected !== ''">
              <SparkleButton @click="tryProcess(isSelected)">Go Onion!</SparkleButton>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
        v-for="(sns, key) in snsList"
        :key="sns"
        cols="auto">
      
          <v-card
            color="grey-lighten-1"
            :class="['ma-4', isSelected.title === sns.title?'bg-brendColor':'']"
            height="100"
            width="100"
            link
            v-model="isSelected"
            @click="changeSelectSns(sns, key)"
            
          >
            <div class="d-flex fill-height flex-column align-center justify-center text-center">
              <font-awesome-icon :icon="['fab', sns.iconName]" />
              <p>{{ this.$textCapitalize(sns.title) }}</p>
              

            </div>
          </v-card>
          
        </v-col>
      </v-row>
      <div class="privacy-policy text-center">
        <a class="" target="_blank" href="/privacy-policy.pdf"> Privacy Policy </a>
      </div>
    </v-parallax>
  </div>
</template>
<script>
import TextGradtion from '@common/TextGradtion.vue'
import BgCanvas from '@common/BgCanvas.vue'

import SparkleButton from '@common/button/SparkleButton.vue'
export default {
  name: 'BeforeLoginMain',
  components: {
    BgCanvas,
    TextGradtion,
    SparkleButton
  },
  data(){
    return{
      userData: {},
      selectedSns: null,

      reveal: false,
      mastodonInstance: '',
      on: false,
      isSelected: '',

      bg1: "https://github.com/onionuniverse/images/blob/main/img/ship.jpg?raw=true",
      bg2: "https://github.com/onionuniverse/images/blob/main/img/jeans.jpg?raw=true",
      bg3: "https://github.com/onionuniverse/images/blob/main/img/globe.jpg?raw=true",
      bg4: "https://github.com/onionuniverse/images/blob/main/img/europe.jpg?raw=true",
      bg5: "https://github.com/onionuniverse/images/blob/main/img/books.jpg?raw=true",
      bg6: "https://github.com/onionuniverse/images/blob/main/img/book-wall.jpg?raw=true",


    }
  },
  computed: {
    snsList() {
      return this.$store.state.snsList
    }
  },
  mounted(){
    this.checkLastLogData()
  },
  created() {
    
  },
  methods: {
    checkLastLogData(){
      const logType = localStorage.getItem('compassLastLogType');
      if(logType !== null){
        this.isSelected = this.snsList[logType]
      }
    },
    changeSelectSns(sns, key){
      this.on = !this.on
      this.isSelected = sns
      
      const logType = localStorage.getItem('compassLastLogType');
      if(logType !== sns.title){
        localStorage.removeItem('compassLastLogType')
        localStorage.setItem('compassLastLogType', key)
      }
    },
    tryProcess(target){
      let targetLink = target.process
      if(target.title === 'mastodon'){
        targetLink = target.instance[this.mastodonInstance].process
      }
      
      window.location.href = this.baseUrl + targetLink;
    },
  },
}
</script>


<style>

  .v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute !important;
    width: 100%;
  }
  .main2 .mainConBox *{
    margin: auto;
  }
  .MOBILE .main2 .mainConBox{
    min-height: 600px;
  }
  .main3 .mainConBox{
    min-height: 1000px;
  }
  
  .mainConBox{
    min-height: 800px;
    padding-top: 10rem; 
    padding-bottom: 10rem;
  }

  #beforeLoginMain  .mainTextPosition{
    margin-top: -15% !important;
  }
  .MOBILE #beforeLoginMain  .mainTextPosition{
    margin-top: -60% !important;
  }

  .main1,.main1 .v-responsive__content {
    background: linear-gradient(0deg, #433c4e  , transparent 10%);
  }

  .main2,.main2 .v-responsive__content {
  background: linear-gradient(180deg, rgb(67,60,78) , rgba(67,60,78, 0.8) , rgb(67,60,78) );
  }
  .main3,.main3 .v-responsive__content {
  background: linear-gradient(180deg, rgb(67,60,78) , rgba(67,60,78, 0.7) ,rgba(67,60,78, 0.6) );
  }

</style>