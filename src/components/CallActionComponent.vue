<template>
    <div class="call-action">
      <div class="container">
        <div class="text-center text-white ms-5">
            <h1 class="ms-5">Sei un medico? Registrati!</h1>
        </div>
        <div class="d-flex">
            <div class="border-rounded">
                <img src="/images/bdoctors1.jpg" alt="">
            </div>
            
            <div class="mt-4 ms-5">
                <p class="fs-2 text-white">Iscriviti subito al nostro sito e inizia a lavorare come medico</p>
                <div class="text-center pt-5">
                    <button class="btn btn-primary fs-2">Iscriviti</button>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'CallActionComponent',
        data(){
            return{
                
            }
        },

    }
</script>

<style lang="scss" scoped>
.call-action{
    background-color: #74C0FC;
    padding-top: 100px;
    padding-bottom: 100px;
}
.border-rounded{
    border-radius: 50px;
    overflow: hidden;
}
img{
    width:100%;
    transition: transform 0.3s, filter 0.3s ease-in-out;
}
.border-rounded:hover img {
  transform: scale(1.1); 
  filter: brightness(1.2);
}
</style>