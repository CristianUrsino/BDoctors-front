<template>
  <AppNav/>
  
  
  <div>
    <router-view></router-view>
  </div>
  <!-- <AppFooter /> -->
</template>

<script>
import AppProva from './components/AppProva.vue';
import AppFooter from './components/AppFooter.vue';
import Home from './views/Home.vue';
import AppNav from './components/AppNav.vue'
export default{
        name:'App',
        data() {
            return {
              
            }
        },
        components:{
          AppProva,
          AppFooter,
          Home,
          AppNav,
        }
    }
</script>

<style lang="scss" scoped>
  
.red{
  color:red;
}
</style>
