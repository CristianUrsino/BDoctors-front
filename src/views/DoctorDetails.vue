<template>
  <div class="single-doctor-section py-5">
    <!-- Drawer -->
    <v-card>
      <v-layout>
        <v-navigation-drawer
          v-model="drawer"
          location="right"
          width="600"
          temporary
        >
          <div class="d-flex align-items-center drawer-header">
            <h4 class="py-3 ps-2">
              Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}
            </h4>
            <i class="fa-solid fa-xmark" @click="drawer = false"></i>
          </div>
          <form @submit.prevent="submitForm" class="mt-2 ms-1">
            <input
              id="name"
              v-model="name"
              type="text"
              name="name"
              class="mb-3 form-control"
              placeholder="Nome"
              maxlength="255"
              required
            />
            <input
              id="surname"
              v-model="surname"
              type="text"
              name="surname"
              class="mb-3 form-control"
              placeholder="Cognome"
              maxlength="255"
              required
            />
            <input
              id="email"
              v-model="email"
              type="email"
              name="email"
              class="mb-3 form-control"
              placeholder="Email"
              maxlength="255"
              required
            />
            <input
              id="telephone"
              v-model="telephone"
              type="number"
              name="telephone"
              class="mb-3 form-control"
              placeholder="Tel."
              maxlength="13"
            />
            <textarea
              class="mt-3 px-2 py-1"
              name="message"
              id="message"
              cols="75"
              rows="10"
              placeholder="Invia il tuo messaggio..."
              v-model="message"
              required
            ></textarea>
            <div class="d-flex gap-2 ms-2 mt-3">
              <button class="btn btn-light send-message px-5" type="submit">
                Invia
              </button>
              <button class="btn btn-warning px-5" type="reset">Resetta</button>
            </div>
          </form>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
    <div class="container">
      <div class="row">
        <div v-if="this.feedback"
            class="alert alert-primary text-center" 
            role="alert"
        >
            <h4 class="alert-heading">Il tuo messaggio è stato inviato con successo!</h4>
            <i class="fa-solid fa-xmark" @click="this.feedback = false"></i>
        </div>
        <div v-if="this.success_vote_input"
            class="alert alert-primary text-center" 
            role="alert"
        >
            <h4 class="alert-heading">Il tuo voto è stato inviato con successo!</h4>
            <i class="fa-solid fa-xmark" @click="this.success_vote_input = false"></i>
        </div>
        
        <div class="col-12">
          <div class="single-doctor-card bg-white p-4 d-flex">
            <div class="doctor-img">
              <img
                :src="
                  doctor.image
                    ? store.imagesBaseUrl + doctor.image
                    : '/images/avatar_doctor.jpg'
                "
                :alt="doctor.user.last_name"
              />
            </div>
            <div class="doctor-info px-4">
              <div class="d-flex align-items-center">
                <h2>Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}</h2>
                <i class="fa-solid fa-circle-check ms-2"></i>
              </div>
              <span class="speciaties d-block mb-1">{{ doctor.specialties[0].name }}</span>
              <span class="address">{{ doctor.address}}</span>
              <div class="doctor-rating d-flex mt-2">
                <div>
                  <!-- <i class="fa-solid fa-star" v-for="n in 5"></i> -->
                  <i
                    v-for="n in 5"
                    :key="n"
                    class="fa-star"
                    :class="
                      n <= calculateRating(doctor) ? 'fa-solid' : 'fa-regular'
                    "
                  ></i>
                </div>
                <span class="doctor-votes ms-2">
                  <u>{{ doctor.votes.length }} voti</u>
                </span>
              </div>
              <button
                type="button"
                class="btn btn-light send-message mt-5 me-3"
              >
                <i class="fa-regular fa-comment-dots"></i>
                <span class="ms-2" @click="drawer = !drawer"
                  >Invia un messaggio</span
                >
              </button>
              <button type="button" class="btn btn-light send-message mt-5">
                <i class="fa-solid fa-pen-to-square"></i>
                <span class="ms-2">Lascia una recensione</span>
              </button>

              <div class="mt-4 d-flex vote-section align-baseline">
                <select v-model="vote_input" id="vote" class="form-select " name="vote">
                    <option value="" selected>Seleziona voto</option>
                    <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
                </select>
                <button type="button" class="btn btn-light" @click="sendVote">
                    <i class="fa-solid fa-star h6"></i>
                    <span class="ms-2">Invia voto</span>
                </button>
            </div>
                <div v-if="error_vote_input" class="text-danger">errore nell'invio del voto</div>

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
      message: "",
      name: "",
      surname: "",
      telephone: "",
      email: "",
      feedback:false,
      vote_input: '',
      error_vote_input: false,
      success_vote_input: false,
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
    submitForm() {
      const formData = {
        message: this.message,
        name: this.name,
        surname: this.surname,
        tel: this.telephone.toString(),
        email: this.email,
        profile_id: this.doctor.id,
      };
      console.log(formData)
      axios
        .post(this.store.apiBaseUrl + "/leads", formData)
        .then((response) => {
          console.log(response.data);
          this.message = "";
          this.message = "";
          this.name = "",
          this.surname = "",
          this.telephone = "",
          this.email = "";
          console.log('success');
          this.drawer=null;
          this.feedback=true;
        })
        .catch((error) => {
          console.log(error);
        });
    },

        sendVote(){
            // console.log(this.vote_input);
            if(this.vote_input === '' || this.vote_input === null || this.vote_input > 5){
                this.error_vote_input = true;
                return
            }
            this.success_vote_input = false;
            this.error_vote_input = false;
            const formData = {
                'profile_id': this.doctor.user.id,
                'vote_id': this.vote_input
            }
            axios.post(this.store.apiBaseUrl+'/votes/store',formData).then((response)=>{
                if(response.data.success){
                    this.success_vote_input = true;
                    this.getDoctorData();
                }
                else this.error_vote_input = true
                console.log(response.data);
                // console.log("successo: "+this.success_vote_input);
                // console.log("fail:" + this.error_vote_input);
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

.alert-primary{
    .fa-solid.fa-xmark{
        position:absolute;
        top:5px;
        right:7px;
        font-size:1.2em
    }
    .fa-solid.fa-xmark:hover{
        cursor:pointer
    }
}
.btn.btn-warning:hover {
  background-color: #ffca2c !important;
  border: 1px solid rgb(214, 214, 214);
}
.drawer-header {
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
  .fa-solid.fa-xmark {
    position: absolute;
    padding: 7px 9px;
    right: 15px;
    top: 13px;
    border-radius: 50% 50%;
    font-size: 1.1em;
    background-color: rgba(165, 165, 165, 0.2);
    transition: 0.3s;
  }
  .fa-solid.fa-xmark:hover {
    background-color: rgb(255, 15, 15);
    cursor: pointer;
    color: white;
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
      font-size: 1.2em;
      font-weight: 500;
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
    .fa-star.h6{
            font-size: 1em;
     }

    .doctor-votes:hover {
      cursor: pointer;
      color: rgb(80, 78, 78);
    }

    .vote-section{
        select{
            width: 47%;
            margin-right: 10px
        }
        button{
            width: 50%;
            height: 40px;
            .fa-star{
                color:black;
            }
        }
        button:hover{
            cursor: pointer;
            color: white;
            .fa-star{
                color:white;
            }
            border: none;
        }
    }
  }
}
</style>
