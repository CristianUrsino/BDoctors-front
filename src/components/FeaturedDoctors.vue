<template>
  <div class="mybg py-5">
    <div class="container">
      <h1 class="text-center text-white py-5">Medici in evidenza</h1>
      <div class="row gy-5 justify-content-center my-5 pt-5">
        <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="doctor in sponsoredDoctors" :key="doctor.id">
          <DoctorCards :name="doctor.user.name" :surname="doctor.user.last_name" :specialty="doctor.specialties[0].name"
            :image="image ? store.imagesBaseUrl + doctor.image : '/images/avatar_doctor.jpg'" :address="doctor.address" :slg="doctor.slug"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorCards from "./DoctorCards.vue";
import { store } from "../store";
import axios from "axios";
export default {
  name: "FeaturedDoctors",
  data() {
    return {
      sponsoredDoctors: [],
      doctorList: [],
      store,
    }
  },
  components: {
    DoctorCards,
  },
  methods: {
    getFeaturedDoctors() {
      //console.log(this.store.doctors);
      let result = this.store.doctors.filter(el => {

        return el.sponsorships.length > 0;
      });
      this.sponsoredDoctors = result;
      //console.log(this.doctorList);
    },
  },
  mounted() {
    this.getFeaturedDoctors();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";

.mybg {
  background-color: $blue-green;
  padding: 50px;
}
</style>
