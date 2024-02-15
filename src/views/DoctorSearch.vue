<template>
    <div class="container">
        <div class="d-flex mediaq">
            <div class="gap-2 mt-4 col-12 col-sm-6">
                <label for="professionSelect">Selezione Professione:</label>
                <select id="professionSelect" v-model="selectedProfession">
                    <option value="">Tutte le professioni</option>
                    <option v-for="profession in professions" :key="profession.id" :value="profession.id">{{ profession.name }}</option>
                </select>
            </div>
            <div class="gap-2 mt-4 col-12 col-sm-6">
                <label for="ratingSelect">Seleziona voto:</label>
                <select id="ratingSelect" v-model="selectedRating">
                    <option value="">Tutti i voti</option>
                    <option v-for="rating in ratings" :key="rating" :value="rating">{{ rating}}</option>
                </select>
            </div>
            <button class="gap-2 align-self-center" @click="searchDoctor">Cerca</button>
        </div>
        <div class="row">
            <div class="col-md-4 col-12  mb-5 mt-5" v-for="doctor in doctors" :key="doctor.id">
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
            
            ratings: [1, 2, 3, 4, 5],
            professions: [],
            
        }
    },
    methods: {
        formatSpecialties(specialties) {
        return specialties.map(specialty => specialty.name).join(', ');
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
        fetchDoctors() {

        axios.get(`${this.store.apiBaseUrl}/doctors`)
            .then(response => {
                this.doctors = response.data.results;
                
               
                
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
        searchDoctor() {
            console.log(this.selectedProfession);
            console.log(this.selectedRating);
            axios.get(`${this.store.apiBaseUrl}/doctors`, {
                params: {
                    specialty: this.selectedProfession,
                    rating: this.selectedRating
                }
            })
            .then(response => {
                this.doctors = response.data.results;
                console.log(this.doctors);
                
            })
            .catch(error => {
                console.error('Error searching doctors:', error);
            });
        }
    },
    created() {
        const params = new URLSearchParams(window.location.search);
        this.selectedProfession = params.get('profession') || '';
        this.selectedCity = params.get('city') || 'Lombardia';
        this.fetchDoctors();
        this.fetchProfessions();
        this.searchDoctor();
        
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
@media screen and (max-width: 768px) {
  .container {
    padding-top: 180px; 
  }
  .mediaq {
    display: block !important;
  }
}
</style>