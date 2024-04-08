
<template lang="" class="nav">
  <nav :class="scrollDown === true?'down': ''">
    <RouterLink v-for="(nav, key) in navList"
    :key="key"
    :to="nav[0]">
      <font-awesome-icon :icon="['fas', nav[1]]" />
      <p v-if="$store.state.isMobile === false">{{key}}</p>
    </RouterLink>
  </nav>
    
</template>

<script>
export default {
  data(){
    return{
      timeout: null,
      scrollDown: false,
      lastScrollTop: window.pageYOffset || document.documentElement.scrollTop,
    }
  },
  mounted(){
    // scrollDown
    window.addEventListener('scroll',(e) => this.handleScroll(e))
  },
  beforeDestroy(){
    window.removeEventListener('scroll', (e) => this.handleScroll(e))

  },
  methods: {
    handleScroll( e){

      
      setTimeout(() => {

        const scrollTopPosition =
        window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTopPosition > this.lastScrollTop) {
          this.scrollDown = true
        } else if (scrollTopPosition < this.lastScrollTop) {
          this.scrollDown = false
        }
        this.lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;

      }, 300);

    }

  },
}
</script>