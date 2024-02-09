<template>
    <div class="mybg py-5">
        <div class="container">
            <h1 class="text-center text-white py-5">Medici in evidenza</h1>
            <div class="row mt-5 pt-5">
                <div class="col-4">
                    <DoctorCards/>
                </div>
                <div class="col-4">
                    <DoctorCards/>
                </div>
                <div class="col-4">
                    <DoctorCards/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DoctorCards from './DoctorCards.vue';
    export default {
        name:'FeaturedDoctors',
        data(){
            return{
                
            }
        },
        components:{
            DoctorCards
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/assets/styles/partials/_variables.scss";
    .mybg{
        background-color:$blue-green;
        padding: 50px;
    }   
</style>