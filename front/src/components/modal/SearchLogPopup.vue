<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="mt-6 mb-2"
          v-bind="props"
          rounded="xl" 
          color="brendColor" 
          variant="flat" 
          @click="getSearchLog()"
        >
          Open Search History
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="brendColor"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Manage Search History</v-toolbar-title>
        </v-toolbar>
        <v-container fluid>
          <p class="d-flex flex-row-reverse">total count: {{ searchLogData?.length }}</p>
          <v-list lines="one" v-for="logData in searchLogData" v-if="searchLogData?.length> 0">
            
            <!-- <v-icon icon="mdi-twitter"></v-icon> -->

            <v-list-item>
              <template v-slot:prepend>
                <v-icon :icon="`mdi-${logData?.snsPlatform}`"></v-icon>
              </template>
              <v-list-item-title>{{ logData?.userId }}</v-list-item-title>
              <v-list-item-subtitle>{{ logData?.searchDatetime }}</v-list-item-subtitle>

              <template v-slot:append>
                <v-btn
                  color="grey-lighten-1"
                  icon="mdi-close"
                  variant="flat" 
                  @click="deleteSearchLog(logData.searchLogKey)"
                ></v-btn>
              </template>
            </v-list-item>
            
            <v-divider></v-divider>
          </v-list>
          <div v-else>
            <v-row>
              <v-col class="text-center">
                <h3 class="mt-6 mb-2 text-h">search history is not exist.</h3>
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import '~components/modal/modal.less'
import  dayjs from 'dayjs'

export default {
  name: 'SearchLogPopup',
  components: {
  },
  props: {
  },
  data(){
    return{

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,

      searchLogData: []

    }
  },
  mounted(){
  },
  methods: {
    async getSearchLog(){
      try {
        const res = await this.axios.get('/api/me/search-log')
        if (res.status === 200) {
          if(typeof res.data.searchLog == 'undefined'){
            return;
          }
          res.data.searchLog.map( searchLog => {
            searchLog.searchDatetime = dayjs(searchLog.searchDatetime).format("YYYY-MM-DD HH:mm:ss")
          })

          this.searchLogData = res.data.searchLog
        }
      }
      catch(error) {
      }
    },
    async deleteSearchLog(key){
      if (window.confirm(`Are you sure you want to delete this search history?`)) {
        try {
          const userKey = this.$store.state.userKey
          const params = {
            searchLogKey: key,
          }
          const res = await this.axios.post('/api/me/del-search-log', params )
          if (res.status === 200) {
            this.getSearchLog()
          }
        }
        catch(error) {
        }
      }
    },
  }

}
</script>

