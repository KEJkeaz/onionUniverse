
<template>
  
  <Header class="header"></Header>
  <div class="contentsWrap">
    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Header from '@components/layout/Header.vue'

export default {
  name: 'NoNavLayout',
  components: {
    Header,
  },

  data(){
    return{
    }
  },
  methods: {
    
  },
}
</script>