<template>
  <AppNav/>
  
  
  <div>
    <router-view></router-view>
  </div>
  <AppFooter /> 
</template>

<script>
import AppProva from './components/AppProva.vue';
import AppFooter from './components/AppFooter.vue';
import Home from './views/Home.vue';
import AppNav from './components/AppNav.vue';
import DoctorDetails from './views/DoctorDetails.vue';

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
          DoctorDetails
        }
    }
</script>

<style lang="scss" scoped>
  
.red{
  color:red;
}
</style>
