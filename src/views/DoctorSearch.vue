<template>
    <div class="container">
        <h1 class="my-4">Cerca il tuo specialista</h1>
        <div class="d-flex flex-wrap align-items-end gap-2 mediaq mb-4">
            <div class=" mt-4 col-12 col-md-6 col-lg-4">
                <label for="professionSelect">Selezione Professione:</label>
                <select class="form-select " id="professionSelect" v-model="selectedProfession">
                    <option value="">Tutte le professioni</option>
                    <option v-for="profession in professions" :key="profession.id" :value="profession.id">{{ profession.name
                    }}</option>
                </select>
            </div>
            <div class="mt-4 col-12 col-md-6 col-lg-4">
                <label for="ratingSelect">Seleziona voto:</label>
                <select class="form-select" id="ratingSelect" v-model="selectedRating">
                    <option value="">Tutti i voti</option>
                    <option v-for="rating in ratings" :key="rating" :value="rating">{{ rating }}</option>
                </select>
            </div>
            <div>
                <input type="text" v-model="searchName" placeholder="Cerca per nome">
                <button class="btn btn-search" @click="searchDoctor">Cerca</button>
            </div>


        </div>
        <div class="row mb-5">
            <div class="col-md-4 col-12  mb-5 mt-5" v-for="doctor in doctors" :key="doctor.id">
                <v-card class="mx-auto" max-width="344" :title="doctor.user.name + ' ' + doctor.user.last_name"
                    :subtitle="formatSpecialties(doctor.specialties)" hover link>
                    <v-avatar size="70" class="ms-5">
                        <img :src="doctor.image ? store.imagesBaseUrl + doctor.image : '/images/avatar_doctor.jpg'"
                            alt="Avatar">
                    </v-avatar>
                    <v-card-text>{{ doctor.address }} <br> Voto Medio: {{ calculateRating(doctor) }}</v-card-text>

                    <v-card-actions>
                        <v-btn variant="text" color="teal-accent-4" @click="revealDoctor(doctor)">
                            Contatti
                        </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                        <v-card v-if="doctor.reveal" class="v-card--reveal" style="height: 100%;">
                            <v-card-text class="pb-0">
                                <p class="text-h4 text--primary">
                                    Contattami
                                </p>
                                <div>{{ doctor.user.email }}</div><br>
                                <span>{{ doctor.tel }}</span>
                            </v-card-text>
                            <v-card-actions class="pt-0">
                                <router-link class="btn detail-btn text-uppercase pt-2"
                                :to="{ name: 'DoctorDetail', params: {slug: doctor.slug} }"> Mostra dettagli
                                </router-link>
                                <v-btn variant="text" color="teal-accent-4" @click="hideReveal(doctor)">
                                    Chiudi
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
                    let namesArray = [];
                    const specialties = this.doctors.reduce((acc, doctor) => {
                        //console.log(acc);

                        doctor.specialties.forEach(specialty => {
                            console.log(specialty);
                            if (!namesArray.includes(specialty.name)) {
                                namesArray.push(specialty.name);
                                acc.push(specialty);
                            }
                        });
                        //console.log(namesArray);
                        return acc;
                    }, []);
                    this.professions = specialties;



                })
                .catch(error => {
                    console.error('Error fetching doctors:', error);
                });
        },
        calculateRating(doctor) {
            
            if (doctor.votes.length === 0) {
                return 'N/A'; 
            }

           
            let total = 0;
            doctor.votes.forEach(vote => {
                total += vote.value;
            });
            const average = total / doctor.votes.length;

            return average.toFixed(1); 
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
                    min_vote_average: this.selectedRating,
                    name: this.searchName
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
        // this.fetchProfessions();
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
.detail-btn{
    color:#00bfa5;
    font-weight: 500;
    font-size: 0.9em;
}
.detail-btn:hover{
    background-color:rgb(245, 255, 249);
    border:1px solid white
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