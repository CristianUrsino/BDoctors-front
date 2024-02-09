<template>
    <div class="myhero-bg pb-3 pt-5">
        <div class="container">
            <h1 class="text-white">Prenota la tua visita online</h1>
            <div class="w-25">
                <v-autocomplete
                    v-model="selectedProfession"
                    :items="options"
                    label="Cosa Cerchi?"
                    placeholder="Seleziona o inserisci una professione"
                ></v-autocomplete> 
            </div>
        </div>
       
    </div>
</template>

<script>
import { ref } from 'vue';
    export default {
        name: 'HeroComponent',
        data() {
            return {
              
            }
        },
        setup() {
        const selectedProfession = ref(null);
        const options = ['Psicologo', 'Lezzologo']; 

        return {
            selectedProfession,
            options
        };
    }

    }
</script>

<style lang="scss" scoped>
.myhero-bg{
    background-color:#0077b6ff;
}
</style>