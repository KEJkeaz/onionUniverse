
<template >
  <div class="text-center errorWrap">
      <h1 class="text-center ">
        An error occured. <br />
        <span class=" text-brendColor">Please try again later.</span>
      </h1>
      
      <v-img
      class="errorImg"
      cover
      :src="adminInfo?.userImgError"
      :alt="adminInfo?.imgAlt"
      ></v-img>
  
      <v-btn
        class="errorButton mt-15 text-h5"
        rounded="xl"
        x-large
        color="brendColor" 
        variant="flat"
        to='/' 
      >
        <font-awesome-icon class="mr-3" :icon="['fa', 'arrow-left']" />
        <span class="">Go To Main</span>
      </v-btn>
  </div>
</template>
<script>
export default {
  name: 'ErrorPage',
  data(){
    return{
    }
  },
  mounted(){
    this.$store.dispatch('logReset');
  },
  methods: {
  },
}
</script>