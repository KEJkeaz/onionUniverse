
<template >
  <div class="snsList">
    <div v-if="(typeof openIdList !== 'undefined')">
      <v-slide-group v-model="model" 
      class="pa-4" 
      center-active 
      show-arrows>
        <v-slide-group-item
          v-for="(sns,key) in openIdList"
          :key="sns.snsPlatform"
          v-slot="{ isSelected, toggle }"
        >
          <v-card
            :border="isSelected ? 'primary' : 'grey-lighten-1'"
            class="ma-4 text-right"
            height="100"
            width="100"
            color="brendColor"
            variant="outlined"
            @click="goPlatform(sns)"
          >
            <v-icon v-if="sns.snsPlatform === 'google'" class="snsListCardIcon" color="brendColor" icon="mdi-content-copy" size="x-small"></v-icon>            
            <v-icon v-else class="snsListCardIcon" color="brendColor" icon="mdi-open-in-new" size="x-small"></v-icon>
            <div class="d-flex fill-height align-center justify-center text-center">
              <v-scale-transition>
                <div class="text-center">
                  <font-awesome-icon :icon="['fab', this.snsList[sns.snsPlatform]?.iconName]" />
                <p>
                  {{ this.snsList[sns.snsPlatform]?.title }}
                  <span v-if="sns.snsPlatform === 'mastodon'">
                    <br />
                    ({{ sns.instance }})
                  </span>
                </p>
                </div>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-list lines="one">
        <v-list-subheader>User inserted URL</v-list-subheader>
        <v-list-item v-for="userSite in userLinkList">
          <v-list-item-title class="cursorPointer" @click="clickUserUrl(userSite)"> 
            
            {{ userSite.label }}
            <v-icon color="brendColor" icon="mdi-open-in-new" size="x-small"></v-icon>
          </v-list-item-title>

          <v-list-item-subtitle>
            {{userSite.url}}
          </v-list-item-subtitle>
        </v-list-item>

      </v-list>


    </div>
    <v-row v-else>
      <v-col class="text-left">
        <h6 class="text-subtitle-1 text-brendColor" >* This user only allows SNS information to users who follow each other.</h6>
      </v-col>
    </v-row>

  </div>
</template>
<script>
export default {
  name: 'UserSnsListComponents',
  props:{
    openIdList: Object,
    userLinkList: Object,
  },
  data(){
    return{
      model: null,
    }
  },
  computed: {
    snsList() {
      return this.$store.state.snsList
    }
  },
  methods: {
    clickUserUrl(userSns){
      window.open(userSns.url, '_blank');
    },
    goPlatform(sns){
      if(sns.snsPlatform === 'google'){
        window.navigator.clipboard.writeText(sns.userId).then(()=>{
          
          alert(`Google mail [ ${sns.userId} ] has been copied.`)
        })
        return;
      }
      window.open(sns.snsUrl, '_blank');
    }
  },
}
</script>
<style scoped>
.snsListCardIcon{
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
}
</style>