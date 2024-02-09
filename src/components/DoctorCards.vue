<template>
    <div class="bg-white mt-5 hover-effect">
        <div class="roundup">
            <img src="https://picsum.photos/id/237/200/300" alt="" class="w-100">
        </div>
        <div class="my-card-adjust">
            
            <h5 class="fs-6 text-center">D. Canem Canus</h5>
            <p class="text-gray text-center ">GINECOLOGO PROFESSIONALE</p>
            <div class="text-center">
                <span class="text-center">Quando lo chiami ti da la zampa</span>
            </div>
            
        </div>
            <div class="pt-3 pb-3 text-center">
                <i class="fa-solid fa-plus fs-1 text-center" style="color: #74C0FC;"></i>
            </div>
    </div>
</template>

<script>
    export default {
        name:'DoctorCards',
        data(){
            return{
                
            }
        }
    }
</script>

<style lang="scss" scoped>
.bg-white{
    
    position: relative;
    border-radius: 20px;
    transition: transform 0.3s;
}
.hover-effect:hover {
  transform: scale(1.1); 
}
.roundup{
    border-radius: 50%;
    overflow: hidden;
    width: 120px;
    height: 120px;
    border: 5px solid white;
    position: absolute; 
    top: 0; 
    left: 50%; 
    transform: translate(-50%, -50%);
}
.my-card-adjust{
    padding-top: 60px;
}
.roundup:hover img {
  filter: brightness(0.8); 
}
</style>