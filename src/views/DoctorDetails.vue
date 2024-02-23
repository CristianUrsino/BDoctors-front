<template>
  <div class="single-doctor-section py-5">
    <!-- Drawer message -->
    <v-card>
      <v-layout>
        <v-navigation-drawer v-model="drawer" location="right" width="600" temporary>
          <div class="d-flex align-items-center justify-space-between drawer-header">
            <h4 class="pt-3 ps-2">
              Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}
            </h4>
            <button class="btn">
              <i class="fa-solid fa-xmark" @click="drawer = false"></i>
            </button>
          </div>
          <h6 class="ps-2">Messaggio</h6>
          <form @submit.prevent="submitForm('send-message')" class="mt-3 mx-2">
            <div class="mb-3">
              <label class="form-label" for="name">Nome:*</label>
              <input id="name" v-model="name" class="form-control" type="text" name="name" placeholder="Nome*"
                maxlength="255" @blur="errorsDetector('name')" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="surname">Cognome:*</label>
              <input id="surname" v-model="surname" type="text" name="surname" class="form-control" placeholder="Cognome*"
                maxlength="255" @blur="errorsDetector('surname')" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="email">Email:*</label>
              <input id="email" v-model="email" type="email" name="email" class="form-control" placeholder="Email*"
                maxlength="255" @blur="errorsDetector('email')" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="telephone">Telefono:</label>
              <input id="telephone" v-model="telephone" type="number" name="telephone" class="form-control"
                placeholder="Tel." maxlength="13" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="message">Messaggio:*</label>
              <textarea class="px-2 py-1 form-control" name="message" id="message" cols="75" rows="10"
                placeholder="Invia il tuo messaggio..." v-model="message" @blur="errorsDetector('message')"></textarea>
            </div>

            <div class="d-flex gap-2 ms-2 mt-3">
              <button id="send-message" class="btn px-5" type="submit">
                Invia
              </button>
              <button class="btn reset-btn px-5" type="reset" @click="resetErrors('send-message')">Reset</button>
            </div>
          </form>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
    <!-- Drawer review -->
    <v-card>
      <v-layout>
        <v-navigation-drawer v-model="drawer_review" location="right" width="600" temporary>
          <div class="d-flex align-items-center justify-content-between drawer-header">
            <h4 class="pt-3 ps-2">
              Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}
            </h4>
            <button class="btn">
              <i class="fa-solid fa-xmark" @click="drawer_review = false"></i>
            </button>
          </div>
          <h6 class="ps-2">Recensione</h6>
          <form @submit.prevent="submitForm('send-review')" class="mt-3 mx-2">
            <div class="mb-3">
              <label class="form-label" for="name-review">Nome:*</label>
              <input id="name-review" v-model="review_name" type="text" name="name" class="form-control"
                placeholder="Nome*" maxlength="255" @blur="errorsDetector('name-review')" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="email-review">Email:*</label>
              <input id="email-review" v-model="review_email" type="email" name="email" class="form-control"
                placeholder="Email*" maxlength="255" @blur="errorsDetector('email-review')" />
            </div>
            <!--Titolo -->
            <div class="mb-3">
              <label class="form-label" for="title-review">Titolo:</label>
              <input id="title-review" v-model="review_title" type="text" name="title" class="form-control"
                placeholder="Titolo" maxlength="255" />
            </div>
            <!-- Recensione-->
            <div class="mb-3">
              <label class="form-label" for="message-review">Recensione:*</label>
              <textarea class="px-2 py-1 form-control" name="message" id="message-review" cols="75" rows="10"
                placeholder="Scrivi la tua recensione..." v-model="review_text"
                @blur="errorsDetector('message-review')"></textarea>
            </div>
            <div class="d-flex gap-2 ms-2 mt-3">
              <button id="send-review" class="btn px-5" type="submit">
                Invia
              </button>
              <button class="btn reset-btn px-5" type="reset"
                @click="resetErrors('send-review')">Reset</button>
            </div>
          </form>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
    <!--Card del Medico-->
    <div class="container">
      <div class="row">
        <div v-if="this.feedback" class="alert alert-primary text-center" role="alert">
          <h4 class="alert-heading">Il tuo messaggio è stato inviato con successo!</h4>
          <i class="fa-solid fa-xmark" @click="this.feedback = false"></i>
        </div>
        <div v-if="this.feedback_review" class="alert alert-primary text-center" role="alert">
          <h4 class="alert-heading">La tua recensione è stato inviata con successo!</h4>
          <i class="fa-solid fa-xmark" @click="this.feedback_review = false"></i>
        </div>
        <div v-if="this.success_vote_input" class="alert alert-primary text-center" role="alert">
          <h4 class="alert-heading">Il tuo voto è stato inviato con successo!</h4>
          <i class="fa-solid fa-xmark" @click="this.success_vote_input = false"></i>
        </div>
        <!--Card Dottore-->
        <div class="col-12">
          <div class=" bg-white py-4 row ">
            <div class="col-10 col-md-4">
              <div class="doctor-img">
                <img :src="doctor.image
                  ? store.imagesBaseUrl + doctor.image
                  : '/images/avatar_doctor.jpg'
                  " :alt="doctor.user.last_name" />
              </div>
            </div>

            <div class="doctor-info px-4 col-12 col-md-8 col-lg-6">
              <div class="d-flex align-items-center">
                <h2>Dr. {{ doctor.user.name }} {{ doctor.user.last_name }}</h2>
                <i v-if="doctor.sponsorships.length > 0" class="fa-solid fa-circle-check ms-2"></i>
              </div>
              <span class="speciaties d-block mb-1">{{ doctor.specialties[0].name }}</span>
              <span class="address">{{ doctor.address }}</span>
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
              <!-- Sezione voto -->
              <div class="container-fluid">
                <div class="mt-4 row vote-section align-items-center">
                  <div class="col-12 p-0 col-md-6 col-lg-4">
                    <i class="fa-star" :class="star1" @click="setVote(1)"></i>
                    <i class="fa-star" :class="star2" @click="setVote(2)"></i>
                    <i class="fa-star" :class="star3" @click="setVote(3)"></i>
                    <i class="fa-star" :class="star4" @click="setVote(4)"></i>
                    <i class="fa-star" :class="star5" @click="setVote(5)"></i>
                  </div>
                  <div class="col-auto">
                    <button type="button" class="btn btn-light" @click="sendVote(), this.drawer=false, this.drawer_review=false">
                      <i class="fa-solid fa-star h6"></i>
                      <span class="ms-2">Invia voto</span>
                    </button>
                  </div>


                  <div v-if="error_vote_input" class="text-danger">errore nell'invio del voto</div>
                </div>
              </div>
              <button type="button" class="btn btn-light send-message mt-5 me-3">
                <i class="fa-regular fa-comment-dots"></i>
                <span class="ms-2" @click="drawer = !drawer, this.drawer_review = false, this.feedback = false, this.feedback_review = false, this.success_vote_input = false">Invia un messaggio</span>
              </button>
              <button type="button" class="btn btn-light send-message mt-5">
                <i class="fa-solid fa-pen-to-square"></i>
                <span class="ms-2" @click="drawer_review = !drawer_review, this.drawer = false, this.feedback = false, this.feedback_review = false, this.success_vote_input = false">Lascia una
                  recensione</span>
              </button>
              <div class="mt-3">
                <a v-if="doctor.curriculum" :href="'http://127.0.0.1:8000/storage/curriculums/' + doctor.id + '.pdf'" target="_blank" class="btn btn-primary">Scarica il curriculum</a>
              </div>
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
      drawer_review: false,
      message: "",
      name: "",
      surname: "",
      telephone: "",
      email: "",
      errors: [],
      review_email: "",
      review_text: "",
      review_title: "",
      review_name: "",
      feedback: false,
      feedback_review: false,
      vote_input: '',
      error_vote_input: false,
      success_vote_input: false,
      clickedVote: 0,
        star1: 'fa-regular',
        star2: 'fa-regular',
        star3: 'fa-regular',
        star4: 'fa-regular',
        star5: 'fa-regular',
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
    setVote(vote) {
        this.vote_input = vote;
        // Imposta il numero di stelle selezionate dall'utente
        this.clickedVote = vote;

        // Imposta tutte le stelle come vuote (fa-regular) all'inizio
        this.star1 = 'fa-regular';
        this.star2 = 'fa-regular';
        this.star3 = 'fa-regular';
        this.star4 = 'fa-regular';
        this.star5 = 'fa-regular';

        // Imposta le stelle selezionate e quelle precedenti come piene (fa-solid)
        if (vote >= 1) this.star1 = 'fa-solid';
        if (vote >= 2) this.star2 = 'fa-solid';
        if (vote >= 3) this.star3 = 'fa-solid';
        if (vote >= 4) this.star4 = 'fa-solid';
        if (vote >= 5) this.star5 = 'fa-solid';
    },

    submitForm(btnId) {
      const formDataMessage = {
        message: this.message,
        name: this.name,
        surname: this.surname,
        tel: this.telephone.toString(),
        email: this.email,
        profile_id: this.doctor.id,
      };
      const formDataReview = {
        name: this.review_name,
        email: this.review_email,
        text: this.review_text,
        //title: this.review_title
      };
      let data = null;
      if (btnId === 'send-message') {
        data = formDataMessage;
      }
      else if (btnId === 'send-review') {
        data = formDataReview;
      }
      const arrayData = Object.keys(data).map(key => ({ key, value: data[key] }));
      const input = document.getElementById(btnId);
      const errorMsgId = input.id + '-msg';
      const parentDiv = input.parentElement;
      const errorDiv = document.getElementById(errorMsgId);
      const inputsVal = arrayData.map(field => {
        return field.value;
      });
      const emptyFields = inputsVal.filter(val => val === '').length;
      if (errorDiv) {
        errorDiv.remove();
      }
      if (emptyFields === 0) {
        if (this.errors.length === 0) {
          if (btnId === 'send-message') {
            //console.log(formDataMessage);
            formDataMessage.tel = parseInt(this.telephone);
            console.log(formDataMessage);
            axios
              .post(this.store.apiBaseUrl + "/leads", formDataMessage)
              .then((response) => {
                console.log(response.data);
                this.message = "";
                this.name = "",
                  this.surname = "",
                  this.telephone = "",
                  this.email = "";
                console.log('success');
                this.drawer = null;
                this.feedback = true;
              })
              .catch((error) => {
                console.log(error);
              });
          }
          else if (btnId === 'send-review') {
            this.submitReview();
          }

        } else {
          const newDiv = this.createErrorDiv(errorMsgId, 'Il modulo contiene errori di validazione. Correggi prima di inviare.');
          newDiv.classList.remove('invalid-feedback');
          newDiv.classList.add('text-red');
          parentDiv.appendChild(newDiv);
        }
      } else {
        const newDiv = this.createErrorDiv(errorMsgId, 'Vi sono dei campi obbligatori non compilati');
        newDiv.classList.remove('invalid-feedback');
        newDiv.classList.add('text-red');
        parentDiv.appendChild(newDiv);
      }
    },
    submitReview() {
      const formData = {
        body: this.review_text,
        name: this.review_name,
        email: this.review_email,
        title: this.review_title,
        profile_id: this.doctor.id,
      };
      console.log(formData)
      axios
        .post(this.store.apiBaseUrl + "/reviews", formData)
        .then((response) => {
          console.log(response.data);
          this.review_text = "";
          this.review_title = "";
          this.review_name = "";
          this.review_email = "";
          console.log('success review');
          this.drawer_review = null;
          this.feedback_review = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendVote() {
      if (this.vote_input === '' || this.vote_input === null || this.vote_input > 5) {
        this.error_vote_input = true;
        return
      }
      this.success_vote_input = false;
      this.error_vote_input = false;
      const formData = {
        'profile_id': this.doctor.user.id,
        'vote_id': this.vote_input
      }
      axios.post(this.store.apiBaseUrl + '/votes/store', formData).then((response) => {
        if (response.data.success) {
          this.success_vote_input = true;
          this.getDoctorData();
        }
        else this.error_vote_input = true
      })
    },

    errorsDetector(data) {
      let message = '';
      const input = document.getElementById(data);
      const value = input.value.trim();
      const errorMsgId = input.id + '-msg';
      const errorDiv = document.getElementById(errorMsgId);
      let isValid = true;
      switch (input.id) {
        case 'email-review':
        case 'email':
          isValid = value !== '' && this.isValidEmail(value);
          message = (value !== '') ? 'Indirizo e-mail non valido' : 'Il campo è obbligatorio'
          break;
        case 'name':
        case 'name-review':
        case 'surname':
          isValid = value !== '' && this.containsOnlyLetters(input.value);
          message = (value !== '') ? 'Inserire solo caratteri testuali e massimo 255 caratteri' : 'Il campo è obbligatorio'
          break;
        // case 'telephone':
        //   isValid = value !== '' && value.length >= 10;
        //   //il campo telefono non è obbligatorio
        //   message = (value !== '') ? 'Numero di telefono non valido' : 'Il campo è obbligatorio'
        //   break;
        case 'message-review':
        case 'message':
          isValid = value !== '';
          message = 'Scrivere il messaggio'
          break;
        default:
          isValid = value !== '';
      }
      if (!isValid) {
        input.classList.add('is-invalid');
        if (!errorDiv) {
          const parentDiv = input.parentElement;
          const newDiv = this.createErrorDiv(errorMsgId, message);
          parentDiv.appendChild(newDiv);
          this.errors.push(message);
        }
      } else {
        input.classList.remove('is-invalid');
        if (errorDiv) {
          errorDiv.remove();
          this.errors.splice(this.errors.indexOf(message), 1);
        }
      }
    },

    createErrorDiv(id, message) {
      const newDiv = document.createElement('div');
      newDiv.classList.add('invalid-feedback');
      newDiv.textContent = message;
      newDiv.setAttribute('id', id);
      return newDiv;
    },

    containsOnlyLetters(str) {
      return /^[a-zA-Z\s]+$/.test(str) && str.length <= 255;
    },

    isValidEmail(email) {
      const indexCh = email.indexOf('@');
      if (indexCh === -1 || indexCh === email.length - 1) {
        return false;
      }
      const emailSplit = email.substring(indexCh);
      return email.includes('@') && emailSplit.includes('.');
    },

    resetErrors(type) {
      this.errors = [];
      const formDataMessage = [
        'message',
        'name',
        'surname',
        'telephone',
        'email'
      ];
      const formDataReview = [
        'name-review',
        'email-review',
        'text-review'
      ];
      let data = null;
      if (type === 'send-message') {
        data = formDataMessage;
        this.message = "";
        this.name = "",
          this.surname = "",
          this.telephone = "",
          this.email = "";
      }
      else if (type === 'send-review') {
        data = formDataReview;
        this.review_message = "";
        this.review_name = "",
          this.review_email = "";
      }
      data.forEach(item => {
        const input = document.getElementById(item);
        input.classList.remove('is-invalid');
        const errorMsgId = input.id + '-msg';
        const errorDiv = document.getElementById(errorMsgId);
        if (errorDiv) {
          errorDiv.remove();
        }
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
.reset-btn{
  border: 1px solid #ffc720;
  background-color:#ffca2c
}
.reset-btn:hover{
  background-color:#ffca29;
  border-color:#ffc720;
}
#send-review, #send-message{
  background-color: $honolulu-blue;
  color:white
}
#send-review:hover,#send-message:hover{
  background-color: $contrast-color;
  border-color: #4bb8a9;
}
.h6, .h4{
  margin-bottom: 0;
}
img {
  width: 100%;
}

.center {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}

.alert-primary {
  .fa-solid.fa-xmark {
    position: absolute;
    top: 5px;
    right: 7px;
    font-size: 1.2em
  }

  .fa-solid.fa-xmark:hover {
    cursor: pointer
  }

  .alert-primary {
    .fa-solid.fa-xmark {
      position: absolute;
      top: 5px;
      right: 7px;
      font-size: 1.2em
    }

    .fa-solid.fa-xmark:hover {
      cursor: pointer
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

  #send-message {
    background-color:$honolulu-blue;
  }
  .send-message {
    border: 1px solid rgb(238, 238, 238);
    padding: 10px 10px; 
  }
  .selected-star {
    color: black;
}

  .single-doctor-section {
    background-color: white;
  }

  h4 {
    margin: 0;
  }

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

      .fa-star.h6 {
        font-size: 1em;
      }

      .doctor-votes:hover {
        cursor: pointer;
        color: rgb(80, 78, 78);
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
      // .vote-section {
      //   select {
      //     width: 47%;
      //     margin-right: 10px
      //   }

      //   button {
      //     width: 50%;
      //     height: 40px;

      //     .fa-star {
      //       color: black;
      //     }
      //   }

      //   button:hover {
      //     cursor: pointer;
      //     color: white;

      //     .fa-star {
      //       color: white;
      //     }

      //     border: none;
      //   }
      // }
    }
  }
}
</style>
