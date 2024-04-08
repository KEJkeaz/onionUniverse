
<template>
  
  <Header class="header"></Header>
  <div class="contentsWrap">
    <MobileNav class="nav" v-if="$store.state.isMobile === true"></MobileNav>
    <PcNav class="nav" v-else></PcNav>
    <div class="contents">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import PcNav from '@components/layout/PcNav.vue'
import MobileNav from '@components/layout/MobileNav.vue'
import Header from '@components/layout/Header.vue'

export default {
  name: 'NormalLayout',
  components: {
    Header,
    PcNav,
    MobileNav
  },

  data(){
    return{
    }
  },
  methods: {
    
  },
}
</script>