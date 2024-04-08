<template >

    <v-text-field
    type="text" 
    clearable
    label="MEMO"
    color="brendColor" 
    variant="underlined"
    :loading="loading"
    @blur="changeMemo"
    v-model="insertedMemo"
    hide-details
    density="comfortable"
    maxlength="100" 
    counter="100"
      >
    </v-text-field>
</template>
<script>
export default {
  name: 'userMemoComponents',
  
  props:{
    targetUser: {
      type: String,
      required: true,

    },
    memoData: {
      type: String,
      default: ''

    },
  },
  
  data(){
    return{
      loading: false,
      insertedMemo: this.memoData
    }
  },
  

  methods: {
    
    async changeMemo(){
      if(this.memoData === this.insertedMemo){
        
        this.loading = false
        return
      }
      try {
        this.loading = true
        const params = {
          friend_userKey: this.targetUser,
          props:{
            memo: this.insertedMemo
          }
        }

        const res = await this.axios.post('/api/me/change-friend', params )
        if (res.status === 200) {
          this.userData = res.data.user
          this.$store.dispatch('changeFriendMemo', params);
          this.loading = false

        }
      }
      catch(error) {
      }

      
    },
  },
}
</script>