<template>
  <div class="single-doctor-section py-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="single-doctor-card bg-white p-4 d-flex">
            <div class="doctor-img">
              <img :src="doctor.image ? store.imagesBaseUrl + doctor.image : '/images/avatar_doctor.jpg'"  />
            </div>
            <div class="doctor-info px-4">
              <div class="d-flex align-items-center">
                <h2>Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}</h2>
                <i class="fa-solid fa-circle-check ms-2"></i>
              </div>
              <span class="speciaties">{{doctor.address}}</span>
              <div class="doctor-rating d-flex mt-2">
                <div>
                  <!-- <i class="fa-solid fa-star" v-for="n in 5"></i> -->
                  <i v-for="n in 5" :key="n" class="fa-star" :class="(n <= calculateRating(doctor)) ? 'fa-solid' : 'fa-regular'"></i>
                </div>
                <span class="doctor-votes ms-2">
                  <u>{{doctor.votes.length}} voti</u>
                </span>
              </div>
              <button type="button" class="btn btn-light send-message mt-5">
                <i class="fa-regular fa-comment-dots"></i>
                <span class="ms-2">Invia un messaggio</span>
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
      doctor:{},
      store,
    };
  },
  methods: {
    getDoctorData() {
        console.log(this.$route.params);
            axios.get(`${this.store.apiBaseUrl}/doctors/${this.$route.params.slug}`)
            .then((res) => {
                console.log(res.data);
                if (res.data.success) {
                    this.doctor = res.data.result;
                    console.log(this.doctor)
                } else {
                    console.error('Failed to fetch doctor data:', res.data.error);
                }
            })
            .catch((error) => {
                console.error('Error fetching doctor data:', error);
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
  },
  created(){
    this.getDoctorData()
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";

.send-message {
  border: 1px solid rgb(177, 176, 176);
  padding: 10px 10px;
}
.single-doctor-section {
  background-color: white;
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
    .fa-star{
        font-size: 1.4em;
    }
    .fa-star.fa-regular{
        color: $honolulu-blue;
    }
    .doctor-votes:hover {
      cursor: pointer;
      color: rgb(80, 78, 78);
    }
  }
}
</style>
