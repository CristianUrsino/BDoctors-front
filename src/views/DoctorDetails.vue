<template>
    <div class="single-doctor-section py-5">
        <!-- Drawer -->
        <v-card>
            <v-layout>
                <v-navigation-drawer v-model="drawer" location="right" width="600" temporary>
                    <div class="d-flex align-items-center drawer-header">
                        <h4 class="py-3 ps-2">
                            Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}
                        </h4>
                        <i class="fa-solid fa-xmark" @click="drawer = false"></i>
                    </div>
                    <form @submit.prevent="submitForm">
                        <textarea class="mt-3 ms-1 px-2 py-1" name="message" id="message" cols="75" rows="10" placeholder="Invia il tuo messaggio..." v-model="message"></textarea>
                        <div class="d-flex gap-2 ms-2 mt-3">
                            <button class="btn btn-light send-message  px-5" type="submit">Invia</button>
                            <button class="btn btn-warning px-5" type="reset">Resetta</button>
                        </div>
                    </form>
                </v-navigation-drawer>
            </v-layout>
        </v-card>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="single-doctor-card bg-white p-4 d-flex">
                        <div class="doctor-img">
                            <img :src="doctor.image ? store.imagesBaseUrl + doctor.image : '/images/avatar_doctor.jpg'" :alt="doctor.user.last_name"/>
                        </div>
                        <div class="doctor-info px-4">
                            <div class="d-flex align-items-center">
                                <h2>Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}</h2>
                                <i class="fa-solid fa-circle-check ms-2"></i>
                            </div>
                            <span class="speciaties">{{ doctor.address }}</span>
                            <div class="doctor-rating d-flex mt-2">
                                <div>
                                    <!-- <i class="fa-solid fa-star" v-for="n in 5"></i> -->
                                    <i v-for="n in 5" :key="n" class="fa-star" :class="n <= calculateRating(doctor) ? 'fa-solid' : 'fa-regular'
                                        "></i>
                                </div>
                                <span class="doctor-votes ms-2">
                                    <u>{{ doctor.votes.length }} voti</u>
                                </span>
                            </div>
                            <button type="button" class="btn btn-light send-message mt-5 me-3">
                                <i class="fa-regular fa-comment-dots"></i>
                                <span class="ms-2" @click="drawer = !drawer">Invia un messaggio</span>
                            </button>
                            <button type="button" class="btn btn-light send-message mt-5">
                                <i class="fa-solid fa-pen-to-square"></i>
                                <span class="ms-2">Lascia una recensione</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { store } from "../store";
import axios from "axios";
export default {
    name: "DoctorDetails",
    data() {
        return {
            doctor: {},
            store,
            drawer: null,
            message:'',
        };
    },
    methods: {
        getDoctorData() {
            console.log(this.$route.params);
            axios
                .get(`${this.store.apiBaseUrl}/doctors/${this.$route.params.slug}`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        this.doctor = res.data.result;
                        console.log(this.doctor);
                    } else {
                        console.error("Failed to fetch doctor data:", res.data.error);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching doctor data:", error);
                });
        },
        calculateRating(doctor) {
            if (doctor.votes.length === 0) {
                return "N/A";
            }

            let total = 0;
            doctor.votes.forEach((vote) => {
                total += vote.value;
            });
            const average = total / doctor.votes.length;

            return average.toFixed(1);
        },
        submitForm(){
        const formData = {
            message: this.message
        }
        axios.post(this.store.apiBaseUrl+'/doctors',formData).then((response)=>{
            console.log(response.data)
            this.message=''
        }).catch((error)=>{
            console.log(error)
        })
        }
    },
    created() {
        this.getDoctorData();
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";

.btn.btn-warning:hover{
    background-color: #ffca2c !important;
    border: 1px solid rgb(214, 214, 214)
}
.drawer-header{
    border-bottom:1px solid rgb(0, 0, 0, 0.2);
    .fa-solid.fa-xmark{
        position: absolute;
        padding: 7px 9px;
        right: 15px;
        top: 13px;
        border-radius: 50% 50%;
        font-size:1.1em;
        background-color: rgba(165, 165, 165, 0.2);
        transition: 0.3s;
    }
    .fa-solid.fa-xmark:hover{
        background-color: rgb(255, 15, 15);
        cursor:pointer;
        color:white;
        transition: 0.2s;
    }
}
.send-message {
    border: 1px solid rgb(238, 238, 238);
    padding: 10px 10px;
}

.single-doctor-section {
    background-color: white;
}

h4 {
    margin: 0;
}

.single-doctor-card {
    border-radius: 5px;
    border: 1px solid rgb(202, 202, 202);

    .doctor-img {
        width: 160px;
        height: 160px;
        overflow: hidden;
        transition: 0.5s;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        img:hover {
            cursor: pointer;
        }
    }

    .doctor-img:hover {
        transform: scale(1.05);
        transition: 0.3s;
    }

    .doctor-info {
        h2 {
            font-size: 1.8em;
            display: inline-block;
            margin: 0;
        }

        .fa-solid.fa-circle-check {
            color: $honolulu-blue;
        }

        .speciaties {
            font-size: 1.1em;
        }

        .fa-solid.fa-star {
            color: $honolulu-blue;
        }

        .fa-star {
            font-size: 1.4em;
        }

        .fa-star.fa-regular {
            color: $honolulu-blue;
        }

        .doctor-votes:hover {
            cursor: pointer;
            color: rgb(80, 78, 78);
        }
    }
}
</style>
