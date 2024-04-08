
<template >

  
  <div class="text-center errorWrap">
    <h1 class="text-center ">
      <span class=" text-brendColor">
        404 Error
      </span>
      <br />
      Page Not Found

    </h1>
    
    <v-img
    class="errorImg404"
    cover
    :src="adminInfo?.userImg404"
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
  name: 'Error404',
  data(){
    return{
    }
  },
  mounted(){
  },
  methods: {
  },
}
</script>