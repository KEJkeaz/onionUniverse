
<template >
  <div >

    <v-list class="text-left" v-for="guide in guideText">
      <v-list-item-title class="text-h6 text-brendColor">
        {{ guide.title }}
      </v-list-item-title>
      <v-list-item class="text-subtitle-1" v-for="item in guide.text">
        {{ `- ${item}` }}
      </v-list-item>
    </v-list>

  </div>
</template>
<script>
export default {
  name: 'Guide',
  components: {
  },
  data(){
    return{
      guideText: [
        {
          title: "add SNS more",
          text: [
            "We support multiple SNSs, that helps to find you.",
            "Go to menu 'Setting > Manage My SNS' and login other SNSs.",
          ],
        },
        {
          title: "add any user custom url",
          text: [
            "you can add any url with title freely",
            "Go to menu 'Setting > Manage My URLs' and write what you want",
          ],
        },
        {
          title: "search",
          text: [
            "The platform, the user's nickname must match exactly to find a friend.",
            "Search logs are deleted from old records after 100."
          ],
        },
        
        {
          title: "friends",
          text: [
            "If you set the protected option, you cannot view the other person's sns information until you become friends with each other.",
            "The more platforms you add, the easier it will be for your friends to find you."
          ],
        },
        
        {
          title: "message",
          text: [
            "New messages can be sent even in one-sided follow states.",
            "New messages can only be sent to people I follow.",
            "100 messages can be sent per month.",
            "Messages that have passed month will be deleted."
          ],
        }
      ]
    }
  },
  mounted(){
  },
  methods: {
    
  }
   
}
</script>