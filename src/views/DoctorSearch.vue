<template>
    <div class="container">
        <div class="d-flex">
            <v-select
                class="gap-2 mt-4"
                v-model="selectedProfession"
                :items="professions"
                label="Selezione Professione"
                outlined
            ></v-select>
            <v-select
                class=" gap-2 mt-4"
                v-model="selectedRating"
                :items="ratings"
                label="Seleziona voto"
                outlined
            ></v-select>
            <v-select
                class=" gap-2 mt-4"
                v-model="selectedCity"
                :items="cities"
                label="Seleziona Città"
                outlined
            ></v-select>
            
        </div>
        <div class="row">
            <div class="col-4 mb-5 mt-5" v-for="doctor in doctors" :key="doctor.id">
                <v-card
                    class="mx-auto"
                    max-width="344"
                    :title="doctor.user.name + ' ' + doctor.user.last_name "
                    :subtitle="formatSpecialties(doctor.specialties)"
                    hover
                    link
                >
                    <v-avatar size="70" class="ms-5"> 
                        <img :src="doctor.image ? store.imagesBaseUrl + doctor.image : '/images/avatar_doctor.jpg'" alt="Avatar">
                    </v-avatar>
                    <v-card-text>{{ doctor.address }}</v-card-text>
                    <v-card-actions>
                        <v-btn
                            variant="text"
                            color="teal-accent-4"
                            @click="revealDoctor(doctor)"
                        >
                            Contatti
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <v-card
                            v-if="doctor.reveal"
                            class="v-card--reveal"
                            style="height: 100%;"
                        >
                            <v-card-text class="pb-0">
                                <p class="text-h4 text--primary">
                                    Contattami
                                </p>
                                <div>{{ doctor.user.email }}</div><br>
                                <span>{{ doctor.tel }}</span>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                                <v-btn
                                    variant="text"
                                    color="teal-accent-4"
                                    @click="hideReveal(doctor)"
                                >
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-expand-transition>
                </v-card>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";

export default {
    name: 'DoctorSearch',
    
    data() {
        return {
            store,
            doctors: [],
            selectedProfession: '',
            selectedRating: '',
            selectedCity: '',
            ratings: [1, 2, 3, 4, 5],
            professions: [],
            cities: [], 
        }
    },
    methods: {
        formatSpecialties(specialties) {
        return specialties.map(specialty => specialty.name).join(', ');
        },
        fetchDoctors() {
        axios.get(`${this.store.apiBaseUrl}/doctors`)
            .then(response => {
                this.doctors = response.data.results;
                console.log(this.doctors);
                
            })
            .catch(error => {
                console.error('Error fetching doctors:', error);
            });
    },
        revealDoctor(doctor) {
            doctor.reveal = true;
        },
        hideReveal(doctor) {
            doctor.reveal = false;
        },
        
    },
    created() {
        this.fetchDoctors();

        
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 100%;
}
.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}
</style>