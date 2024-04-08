
<template >
	<div class="slideEffectButton">
		<slot></slot>
	</div>
</template>
<script>
export default {
  name: 'slideEffectButton',
  props:{
    data: {
      text: String, 
      
    },
  },
  data(){
    return{
    }
  },
  mounted(){
  },
  methods: {
  }
}
</script>
<style lang="less" >
.router-link-active{
		color: @brendColorLight;
	}
.slideEffectButton{
  
	width: 100%;
	width: calc(100% - 1rem);
}
.slideEffectButton a{
  border: 0;
  background: transparent;
  position: relative;
  padding: 1rem 2rem;
  cursor: pointer;
	background:transparent;
  color: @brendColor;
	width: 100%;
	

}
.slideEffectButton a:is(:hover, :focus-visible) *{
	z-index: 1;
	position: relative;
	color: #fff;
}

.slideEffectButton a::after {
  content: "";
  background: @brendColor;
  position: absolute;
  inset: 0;
  // mix-blend-mode: difference;
  scale: 0 1;
  transform-origin: 100% 50%;
  transition: scale 0.2s ease-in-out;
  pointer-events: none;
}

.slideEffectButton a:is(:hover, :focus-visible)::after {
  color: #fff;
  scale: 1 1;
  transform-origin: 0 50%;
}

</style>