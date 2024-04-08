
<template lang="" class="nav">
  <nav>
    
    <SlideEffectButton  v-for="(nav, key) in navList" :key="key">
      <RouterLink :to="nav[0]" >
      
        <span class="icon pr-3">
          <font-awesome-icon :icon="['fas', nav[1]]" />
        </span>
        
        <span class="label"> {{key}} </span> 
      </RouterLink>
    </SlideEffectButton>
    <v-spacer></v-spacer>
    <div class="copyright text-center pt-3 pb-3">
      Copyright 2023-2024. <br/> 
      "team.onionuniverse" <br/>
      All rights reserved.
    </div>
  </nav>
</template>

<script>
import SlideEffectButton from '@common/button/SlideEffectButton.vue'

export default {
  data(){
    return{
      
    }
  },
  components: {
    SlideEffectButton
  },
  methods: {
    
  },
}
</script>

<style>

button.test {
  border: 0;
  background: transparent;
  position: relative;
  color: var(--color);
  padding: 1rem 2rem;
  background: var(--bg);
  cursor: pointer;
  color: #fff;
}

button.test::after {
  content: "";
  background: white;
  position: absolute;
  inset: 0;
  mix-blend-mode: difference;
  scale: 0 1;
  transform-origin: 100% 50%;
  transition: scale 0.2s ease-in-out;
  pointer-events: none;
}

button.test:is(:hover, :focus-visible)::after {
  color: black;
  scale: 1 1;
  transform-origin: 0 50%;
}

</style>