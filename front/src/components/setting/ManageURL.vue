
<template >
    <p class="mt-4 text-warningColor ">* After editing, you must click the Save button to save.</p>
    <ListDrag 
    :list=" this.myDetail.userLinkList" 
    @remove-my-url="removeMyUrl"
    @return-drag-res="draggedMyUrl"
    ></ListDrag>


    <p class="pt-4 mb-4">User URL add </p>
    <v-form ref="inputUrlForm" lazy-validation>
      <v-row>
        <v-col cols="8" sm="5" :class="$vuetify.display.xs === true?'pb-0':''">

          <v-text-field
            v-model="mySns.label"
            label="sns Title"
            :rules="userUrlRule.labelRule"
            hide-details="auto"
            clearable
            variant="outlined"
            maxlength="100" 
            counter="100"
          ></v-text-field>

        </v-col>
        <v-col cols="8" sm="5" :class="$vuetify.display.xs === true?'pt-1':''">

          <v-text-field
            :class="$vuetify.display.xs === true?'pb-6':''"
            v-model="mySns.url"
            label="sns URL"
            :rules="userUrlRule.urlRule"
            hide-details="auto"
            clearable
            variant="outlined"
          ></v-text-field>
          
        </v-col>
        
        <v-col cols="4" sm="2" :class="$vuetify.display.xs === true?'':'mt-2'">
          <v-btn 
            :class="$vuetify.display.xs === true?'addDragButton':''"
            rounded="xl" 
            color="brendColor" 
            variant="flat"
            @click="addMyUrl()"
            >
            Add Url
          </v-btn>

        </v-col>
      </v-row>

    </v-form>
</template>
<script>

import ListDrag from '@common/ListDrag.vue'
export default {
  name: 'ManageURL',
  components: {
    ListDrag,
  },
  data(){
    return{
      mySns: {
        label:'',
        url:''
      },
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
    draggedMyUrl(val){
      this.myDetail.userLinkList = val
      this.saveMyUrlList()
    },
    removeMyUrl(val){
      this.myDetail.userLinkList = this.myDetail.userLinkList.toSpliced(val.key, 1);
      this.saveMyUrlList()
    },

    addMyUrl(){
      
      if(!this.$refs.inputUrlForm.isValid){
        this.$refs.inputUrlForm.validate()
        return
      }

      let copyData = JSON.parse(JSON.stringify(this.myDetail.userLinkList))
      let sns = JSON.parse(JSON.stringify(this.mySns));
      Object.assign(sns, {'key': 'drag_' + copyData.length})
      copyData.push(sns)
      this.myDetail.userLinkList = copyData
      this.saveMyUrlList()
    },
    async saveMyUrlList(){

      try {
        const userKey = this.$store.state.userKey
        const params = {
          userLinkList: this.myDetail.userLinkList
        }
        const res = await this.axios.post('/api/me/change-user-links', params )
        if (res.status === 200) {
          this.myDetail.userLinkList = res.data.userLinkList
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