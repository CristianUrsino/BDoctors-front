<template>
    <div class="bg-white mt-5 hover-effect">
        <div class="roundup">
            <img :src="image" :alt="name + ' ' + surname" class="w-100">
        </div>
        <div class="my-card-adjust">
            
            <div class="d-flex align-items-center justify-content-center align-items-center mb-1">
                <h5 class="fs-6">Dr. {{name}} {{surname}}</h5>
                <i class="fa-solid fa-circle-check ms-2"></i>
            </div>
            <p class="text-gray text-center text-uppercase">{{specialty}}</p>
            <div class="text-center mt-1">
                <span class="text-center">{{address}}</span>
            </div>
            
        </div>
        <div class="d-flex justify-content-center">
            <router-link class="btn detail-btn text-uppercase text-center"
                :to="{ name: 'DoctorDetail', params: { slug: slg } }"> Mostra dettagli
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:'DoctorCards',
        props:[
            "name",
            "surname",
            "specialty",
            "image",
            "address",
            "slg",
        ],
        data(){
            return{
               
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";
h5{
    margin:0
}
.detail-btn {
    color: $honolulu-blue;
    font-weight: 500;
    font-size: 0.9em;
    padding-top: 7px;
}
.detail-btn:hover {
    background-color: rgb(245, 255, 249);
    border: 1px solid white
}
.fa-solid.fa-circle-check{
            color:$honolulu-blue
        }
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