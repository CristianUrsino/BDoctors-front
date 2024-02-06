<template>
  <div>prova app</div>
  <div class="red">style scoper</div>
  <AppProva/>
  
  <div>
    <router-view ></router-view>
  </div>
</template>

<script>
import AppProva from './components/AppProva.vue';
export default{
        name:'App',
        data() {
            return {
              
            }
        },
        components:{
          AppProva,
        }
    }
</script>

<style lang="scss" scoped>
.red{
  color:red;
}
</style>
