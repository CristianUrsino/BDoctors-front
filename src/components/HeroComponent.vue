<template>
    <div class="myhero-bg pt-5">
        <div class="container my-margin">
            <h1 class="text-white">Prenota la tua visita online</h1>
            <div class="d-flex flex-wrap justify-content-between align-items-center">
                <div class="w-50">
                    <select v-model="selectedProfession" @change="fetchProfessions" class="form-select mb-4" aria-label="Profession Select">
                        <option disabled value="">Cosa Cerchi?</option>
                        <option v-for="profession in professions" :key="profession.id" :value="profession.id">{{ profession.name }}</option>
                    </select>
                    <select v-model="selectedCity" class="form-select mb-4" aria-label="City Select">
                        <option value="Lombardia" selected>Lombardia</option>
                    </select>
                    <button @click="redirectToLink(selectedProfession)" class="btn btn-light">Cerca</button>
                </div>
                <div class="w-50">
                    <v-carousel cycle hide-delimiters :show-arrows="false" interval="4000">
                        <v-carousel-item v-for="(item, index) in carouselItems" :key="index" :src="item.src"></v-carousel-item>
                    </v-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'HeroComponent',
    data() {
        return {
            selectedProfession: '', 
            selectedCity: 'Lombardia',
            carouselItems: [
                { src: '/images/dottore1.png' },
                { src: '/images/dottore2.png' },
                { src: '/images/dottore3.png' }
            ],
            professions: [],
            
        };
    },
    methods: {
        redirectToLink() {
            this.$router.push({ name: 'DoctorSearch', query: { profession: this.selectedProfession,} });
        },
        fetchProfessions() {
            axios.get(`${this.store.apiBaseUrl}/specialties`)
                .then(response => {
                    this.professions = response.data.results;
                })
                .catch(error => {
                    console.error('Error fetching professions:', error);
                });
        },
        
    },
    created() {
        this.fetchProfessions();
    },
    computed: {
        store() {
            return store;
        }
    }
};
</script>

<style lang="scss" scoped>
.myhero-bg {
    background-color: #0077b6ff;
}
.my-margin {
    margin-top: 80px;
}
</style>