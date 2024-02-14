HeroComponent
<template>
    <div class="myhero-bg  pt-5">
        <div class="container my-margin">
            <h1 class="text-white">Prenota la tua visita online</h1>
            <div class="d-flex flex-wrap justify-content-between align-items-center">
                <div class="w-50">
                    <v-autocomplete
                        v-model="selectedProfession"
                        :items="options"
                        label="Cosa Cerchi?"
                        placeholder="Seleziona o inserisci una professione"
                        
                        bg-color="#FAFAFA"
                        base-color="#FAFAFA"
                    ></v-autocomplete> 
                    <v-autocomplete
                        v-model="selectedCity"
                        :items="cityoption"
                        label="Città"
                        placeholder="Inserisci la città"
                        
                        bg-color="#FAFAFA"
                    ></v-autocomplete>
                    
                    <v-btn icon="mdi-search" size="x-large"><i class="fa-solid fa-magnifying-glass" @click="redirectToLink"></i ></v-btn>
                    
                </div>
                <div class="w-50">
                    <v-carousel cycle hide-delimiters :show-arrows="false" interval="4000">
                        <v-carousel-item
                            v-for="(item, index) in carouselItems"
                            :key="index"
                            :src="item.src"
                        ></v-carousel-item>
                    </v-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
    export default {
        name: 'HeroComponent',
        data() {
            return{
                carouselItems: [
                    { src: '/public/images/dottore1.png' },
                    { src: '/public/images/dottore2.png' },
                    { src: '/public/images/dottore3.png' }
                ]
            }
        },
        setup() {
            const selectedProfession = ref(null);
            const options = ['Psicologo', 'Lezzologo']; 
            const selectedCity = ref(null);
            const cityoption = ['Roma','Milano']

            return {
                selectedProfession,
                options,
                selectedCity,
                cityoption,
            };
        },
        methods:{
            redirectToLink() {
        
                this.$router.push({ name: 'DoctorSearch' });

    }
        }
    }
</script>

<style lang="scss" scoped>
.myhero-bg{
    background-color:#0077b6ff;
}
.my-margin{
    margin-top: 80px;
}
</style>