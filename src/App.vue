<template>
  
  <AppProva/>
  
  <div>
    <router-view ></router-view>
  </div>
</template>

<script>
import AppProva from './components/AppProva.vue';
import Home from './views/Home.vue';
export default{
        name:'App',
        data() {
            return {
              
            }
        },
        components:{
          AppProva,
          Home,
        }
    }
</script>

<style lang="scss" scoped>
  
.red{
  color:red;
}
</style>
