
<template >
  <v-row class="mt-1" align="center" justify="center">
    <v-col clas="12">
      <p>Select SNS to remove (click to select) </p>
    
      <p class="text-warningColor">
        When you change handle or identifier of each SNS, we not automatically update. Therefore, you should update manually. <br/>
        Remove old SNS handle first, add new account by "Select SNS to add".
      </p>
      <v-row class="justify-center mt-3">
        <v-col  cols="auto"
        v-for="openId in myDetail.openIdList"
        :key="openId"
        >
          <v-card
            color="grey-lighten-1"
            class="d-inline-block bg-brendColor"
            min-height="200"
            min-width="210"
            link
            @click="removeOpenId(openId)"
          >
            <div class="text-right">
              <v-icon>mdi-close</v-icon>
            </div>
            <div class="d-flex align-center justify-center text-center">
              <div class="height4">
                <font-awesome-icon :icon="['fab', snsList[openId.snsPlatform].iconName]" />
                <p >
                  {{ openId.snsPlatform }} 
                  <span v-if="openId.snsPlatform === 'mastodon'">
                    <br />
                    ({{ openId.instance }})
                  </span>
                </p>
              </div>
            </div>
            <div class="mt-3 pa-3">
              <div class="d-flex align-ceneter justify-center text-center">
                <v-avatar size="small" class="mr-2">
                  <v-img
                    cover
                    :src="openId?.userImg"
                    :alt="`${openId?.snsPlatform} ${openId?.userName}'s image`"
                  ></v-img>
                </v-avatar>
                <p>{{openId.userName}}</p>
              </div>
              <p class="mt-1">{{ openId.userId }}</p>
            </div>
          </v-card>

        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <p>Select SNS to add  </p>
      <v-card
          class="mx-auto elevation-0"
          max-width="200"
        >
          <div class="text-right">
            <v-icon v-if="Object.keys(selectedSns).length > 0" @click="resetSelectedSns()">mdi-close</v-icon>
          </div>
          <div class="d-flex align-center justify-center ">
            <font-awesome-icon v-if="selectedSns !== ''" :icon="['fab', selectedSns.iconName]" />
            <v-card-title>
              {{ selectedSns !== ''?selectedSns.title:'select Your SNS' }}
            </v-card-title>
          </div>
          <v-expand-x-transition>
            <v-select
              v-show=" selectedSns.title === 'mastodon'"
              label="Select Instance"
              color="brendColor" 
              variant="outlined" 
              density="comfortable"
              v-model="mastodonInstance"
              rounded
              :error-messages="mastodonInstanceError"
              :rules="snsRule.mastodonRule"
              :items="Object.keys(snsList.mastodon.instance)"
            ></v-select>
          </v-expand-x-transition>
          
          <v-card-actions class="justify-center" v-if="selectedSns !== ''">
            <v-btn color="brendColor" @click="addOpenId(Object.keys(snsList).indexOf(selectedSns.title) , selectedSns)">
              Add
            </v-btn>
          </v-card-actions>
        </v-card>

      <v-slide-group v-model="model" 
      class="pa-4" 
      center-active 
      show-arrows>
        <v-slide-group-item
          v-for="(sns,key) in snsList"
          :key="sns.title"
          v-slot="{ isSelected, toggle }"
        >
          <v-card
            v-if="typeof myDetail.openIdList.find((elem)=> elem.snsPlatform === sns.title) !== 'object'"
            :border="isSelected ? 'primary' : 'grey-lighten-1'"
            class="ma-4 text-right"
            height="100"
            width="100"
            color="brendColor"
            variant="outlined"
            
            @click="selectedSns = sns"

          >
            <div class="text-right">
              <v-icon>mdi-plus</v-icon>
            </div>
            <div class="d-flex align-center justify-center text-center">
              <v-scale-transition>
                <div class="text-center">
                <font-awesome-icon :icon="['fab', sns.iconName]" />

                <p>{{ sns.title }}</p>
                </div>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

    </v-col>
  </v-row>
</template>
<script>

export default {
  name: 'ManageSNS',
  components: {
  },
  data(){
    return{
      model: null,
      selectedSns: '',
      mastodonInstanceError: '',
      mastodonInstance: '',
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
    
    resetSelectedSns(){
      this.mastodonInstance = ''
      this.selectedSns = ''
    },
    async removeOpenId(sns){

      if( this.myDetail.openIdList.length == 1){
        const text = "You cannot LOGOUT because you have logged one sns."
        alert(text);
        return;
      }
      if (window.confirm(`Do you really want to remove ${sns.snsPlatform}?`)) {

        try {
          const userKey = this.$store.state.userKey
          const params = {
            openIdStr: sns.openIdStr,
          }
          const res = await this.axios.post('/api/me/del-open-id', params )
          if (res.status === 200) {
            
            await this.$store.dispatch('getMyDetail');
            alert('Delete SNS completed.')
          }
        }
        catch(error) {
        }

      }
    },
    
    async addOpenId(nth, sns){
      if(sns.title === 'mastodon'){
        if(this.mastodonInstance.length === 0){
          this.mastodonInstanceError= 'Required.'
          return;
        }
      }
        
      this.model = nth;
      
      let url = this.baseUrl + sns.add;
      let confirmText = `Do you really want to add ${sns.title}?`

      if(sns.title === 'mastodon'){
          confirmText = `Do you really want to add ${sns.title}(${this.mastodonInstance})?`
          url = this.baseUrl + sns.instance[this.mastodonInstance].add;
      }
      if (window.confirm(confirmText)) {
        window.location.href = url;
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