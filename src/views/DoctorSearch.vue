<template>
    <div class="container">
        <h1 class="my-4">Cerca il tuo specialista</h1>
        <div class="d-flex flex-wrap align-items-end justify-content-between mediaq">
            <div class=" mt-4 col-12 col-md-6 col-lg-3">
                <label for="professionSelect">Selezione Professione:</label>
                <select class="form-select " id="professionSelect" v-model="selectedProfession">
                    <option value="">Tutte le professioni</option>
                    <option v-for="profession in store.specialties" :key="profession.id" :value="profession.id">{{
                        profession.name
                    }}</option>
                </select>
            </div>
            <div class="mt-4 col-12 col-md-6 col-lg-3">
                <label for="ratingSelect">Seleziona voto:</label>
                <select class="form-select" id="ratingSelect" v-model="selectedRating">
                    <option value="">Tutti i voti</option>
                    <option v-for="rating in ratings" :key="rating" :value="rating">{{ rating }}</option>
                </select>
            </div>
            <div class="d-flex mt-4 col-12 col-md-6 col-lg-3">
                <input type="text" class="form-control" v-model="searchName" placeholder="Cerca per nome">
                <button class="btn btn-search" @click="searchDoctor">Cerca</button>
            </div>

            <button class="btn btn-primary" @click="orderByVotes">Ordina per numero di voti</button>


            <div class="loader" v-if="loading"></div>
        </div>
        <span class="results-number mt-1 mb-4 d-block">Risultati({{ doctors.length }})</span>
        <div class="row mb-5">
            <div class="col-md-4 col-12  mb-5 mt-5" v-for="doctor in doctors" :key="doctor.id">
                <v-card class="mx-auto" max-width="344" :title="doctor.user.name + ' ' + doctor.user.last_name"
                    :subtitle="formatSpecialties(doctor.specialties)" hover link>
                    
                    <v-avatar size="70" class="ms-5">
                        <img :src="doctor.image ? store.imagesBaseUrl + doctor.image : '/images/avatar_doctor.jpg'"
                            alt="Avatar">
                    </v-avatar>
                    <v-card-text>{{ doctor.address }} <br> Voto Medio: {{ calculateRating(doctor) }}</v-card-text>
                    <div class="d-flex">
                    <v-card-text>Numero di Voti: {{ calculateVoteCount(doctor) }}</v-card-text>
                        <div v-if="doctor.sponsorships.length > 0" class="sponsorship-star">
                            <i class="fa fa-star"></i>
                        </div>
                    </div>
                    <v-card-actions>
                        <router-link class="btn detail-btn text-uppercase"
                            :to="{ name: 'DoctorDetail', params: { slug: doctor.slug } }"> Mostra dettagli
                        </router-link>
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
            loading: false,
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

            axios.get(`${this.store.apiBaseUrl}/doctors`, {
                params: {
                
                
                specialty: this.selectedProfession,
                min_vote_average: this.selectedRating,
                name: this.searchName
                 }
                })
                .then(response => {
                    const doctorsWithSponsorship = [];
            const doctorsWithoutSponsorship = [];

            response.data.results.forEach(doctor => {
            if (doctor.sponsorships.length > 0) {
                doctorsWithSponsorship.push(doctor);
            } else {
                doctorsWithoutSponsorship.push(doctor);
            }
        });
        console.log('Doctors with sponsorship:', doctorsWithSponsorship);
        console.log('Doctors without sponsorship:', doctorsWithoutSponsorship);
        // Unisci i due array, mettendo prima quelli con sponsorizzazione
        this.doctors = [...doctorsWithSponsorship, ...doctorsWithoutSponsorship];
        console.log('Final doctors list:', this.doctors);
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
            this.loading = true;
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
                    const doctorsWithSponsorship = [];
                    const doctorsWithoutSponsorship = [];

                    response.data.results.forEach(doctor => {
                        if (doctor.sponsorships.length > 0) {
                            doctorsWithSponsorship.push(doctor);
                        } else {
                            doctorsWithoutSponsorship.push(doctor);
                        }
        });

                    // Unisci i due array, mettendo prima quelli con sponsorizzazione
                    this.doctors = [...doctorsWithSponsorship, ...doctorsWithoutSponsorship];
        
                    this.loading = false;
                    console.log('Doctors after searching:', this.doctors);

                })
                .catch(error => {
                    this.loading = false;
                    console.error('Error searching doctors:', error);
                });
        },
        orderByVotes() {

            axios.get(`${this.store.apiBaseUrl}/doctors`, {
                params: {
                    order_by_votes: true,
                    specialty: this.selectedProfession,
                    min_vote_average: this.selectedRating,
                    name: this.searchName

                }
            })
                .then(response => {
                    this.doctors = response.data.results;
                })
                .catch(error => {
                    console.error('Error ordering doctors by votes:', error);
                });
        },
        calculateVoteCount(doctor) {
            return doctor.votes.length;
        },
    },
    created() {
        const params = new URLSearchParams(window.location.search);
        this.selectedProfession = params.get('profession') || '';
        this.selectedCity = params.get('city') || 'Lombardia';
        this.fetchDoctors();
        
    }
}
</script>

<style lang="scss" scoped>
.results-number{
    font-size: 0.9em;
}
img {
    width: 100%;
}

.v-card--reveal {
    bottom: 0;
    opacity: 1 !important;
    position: absolute;
    width: 100%;
}

.detail-btn {
    color: #00bfa5;
    font-weight: 500;
    font-size: 0.9em;
    padding-top: 7px;
}

.detail-btn:hover {
    background-color: rgb(245, 255, 249);
    border: 1px solid white
}
.sponsorship-star {
    
    z-index: 999; 
}

.fa-star {
    color: yellow; 
}
.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 2s linear infinite;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
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