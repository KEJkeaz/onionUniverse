
<template >

<div class="gradationWrapper">
  
  <slot></slot>
</div>
</template>
<script>

export default {
  name: 'textGradtion',
  data(){
    return{
      CONFIG:{
        gradient: true,
        animated: true,
        highlight: 2,
        spread: 1,
        primary: '#ffffff',
        secondary: '#606060',
      }

      
  
    }
  },
  mounted(){
    this.UPDATE()
  },
  methods: {
    UPDATE() {
          
      for (const key of Object.keys(this.CONFIG)) {
        document.documentElement.style.setProperty(`--${key}`, this.CONFIG[key])
      }
      document.documentElement.setAttribute('data-gradient', this.CONFIG.gradient)
      document.documentElement.setAttribute('data-animate', this.CONFIG.animated)
    },
  },
};
</script>

<style>

:root {
  --bg: hsl(0 0% 2%)
}

:root {
  --primary-bg: linear-gradient(var(--primary), var(--primary));
}

[data-gradient=true] {
  --primary-bg: conic-gradient(from var(--angle, 180deg) at 50% 70%,hsla(0,0%,98%,1) 0deg,#eec32d 72.0000010728836deg,#ec4b4b 144.0000021457672deg,#709ab9 216.00000858306885deg,#4dffbf 288.0000042915344deg,hsla(0,0%,98%,1) 1turn);
}

.gradationWrapper h1 {
  background:
    var(--primary-bg),
    linear-gradient(var(--secondary), var(--secondary)),
    linear-gradient(var(--secondary) 0 calc((var(--highlight) + var(--spread)) * 1lh), transparent);
  background-repeat: no-repeat;
  /* background-size: 
    100% calc(var(--highlight) * 1lh),
    100% calc((var(--highlight) + var(--spread)) * 1lh),
    100% 100%; */
  background-clip: text;
  color: transparent;
  /* text-wrap: balance; */
  font-size: clamp(2rem, 1rem + 4vw, 12rem);
  display: inline-block;
  margin: 0;
}

.gradationWrapper {
  position: relative;
}

@media(prefers-reduced-motion: no-preference) {
  @property --angle {
    inherits: true;
    initial-value: 180deg;
    syntax: '<angle>';
  }
  @keyframes rotate {
    to { --angle: 540deg; }
  }
  [data-gradient=true][data-animate=true] {
    animation: rotate 6s infinite linear;
  }
}
</style>
