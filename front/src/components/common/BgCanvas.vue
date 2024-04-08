
<template >


<div class="canvasContents" ref="canvasContentsBox"  :style="typeof color === 'undefined'?'background: #000':`background: ${color}`">
  <div class="canvasContentsBox">
    <slot></slot>
  </div>
  <div class="el" :style="`height: ${height}px; width: ${width}px; `" >
  </div>
  
</div>

</template>
<script>
export default {
  name: 'bgCanvas',
  data(){
    return{
      height: 300,
      width: 300,
    }
  },
  
  props:{
    color:String
  },
  mutations: {
    isMobile(){
      return this.$store.state.isMobile
    }
  },

  mounted(){
        
    this.changeBoxSize()
    window.addEventListener('resize', this.handleResize)

  },
  beforeDestroy(){
    window.removeEventListener('resize', this.handleResize)

  },
  methods: {
    changeBoxSize(){
      this.$nextTick(function () {
        this.width = this.$refs.canvasContentsBox.clientWidth
        this.height = this.$refs.canvasContentsBox.clientHeight
      })

    },
    handleResize(){
        this.changeBoxSize()
    },
  },
  watch: {
  }
};
</script>

<style>
  
  :root {
  --size: 20px;
  }

</style>

<style lang="less" scoped>

.canvasContents{
  background-color: transparent;
}
.canvasContentsBox{
  position: relative;
  z-index: 1;
}
.el {
  position: absolute;
  top: 0;


  background: conic-gradient(from 180deg at 50% 70%,hsla(0,0%,98%,1) 0deg,#eec32d 72.0000010728836deg,#ec4b4b 144.0000021457672deg,#709ab9 216.00000858306885deg,#4dffbf 288.0000042915344deg,hsla(0,0%,98%,1) 1turn);
  width: 100%;
  height: 100%;
  mask:
    radial-gradient(circle at 50% 50%, white 2px, transparent 2.5px) 50% 50% / var(--size) var(--size),
    url("https://assets.codepen.io/605876/noise-mask.png") 256px 50% / 256px 256px;
  mask-composite: intersect;
  animation: flicker 20s infinite linear;
}
@keyframes flicker {
  to {
    mask-position: 50% 50%, 0 50%;
  }
}

</style>