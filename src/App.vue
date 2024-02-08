<template>
  <div>prova app</div>
  <div class="red">style scoper</div>
  <AppProva/>
  
  <div>
    <router-view></router-view>
  </div>
  <AppFooter />
</template>

<script>
import AppProva from './components/AppProva.vue';
import AppFooter from './components/AppFooter.vue';
export default{
        name:'App',
        data() {
            return {
              
            }
        },
        components:{
          AppProva,
          AppFooter,
        }
    }
</script>

<style lang="scss" scoped>
.red{
  color:red;
}
</style>
