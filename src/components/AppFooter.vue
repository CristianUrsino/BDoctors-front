<template>
  <footer class="py-3">
    <div class="top-footer container py-3">
      <div class="row justify-content-between">
        <div class="col-8 d-flex gap-5">
          <div class="d-flex flex-column">
            <h3 class="">Servizi</h3>
            <ul>
              <li><a href="#">Chi Siamo</a></li>
              <li><a href="#">Contatti</a></li>
              <li><a href="#">Lavora con noi</a></li>
              <li><a href="#">Ufficio Stampa</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3>Trova il tuo medico</h3>
            <div class="d-flex justify-content-between gap-5">
              <div class="d-flex flex-column">
                <ul>
                  <li
                    v-for="specialty in specialties.slice(0, 6)"
                    :key="specialty">
                    <a href="#">{{ specialty }}</a>
                  </li>
                </ul>
              </div>
              <div class="d-flex flex-column">
                <ul>
                  <li
                    v-for="specialty in specialties.slice(6, 12)"
                    :key="specialty">
                    <a href="#">{{ specialty }}</a>
                  </li>
                </ul>
              </div>
              <div class="d-flex flex-column">
                <ul>
                  <li
                    v-for="specialty in specialties.slice(12, 18)"
                    :key="specialty">
                    <a href="#">{{ specialty }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 d-flex justify-content-center">
            <div class="d-flex align-items-center">
                <!-- <div class="logo-wrapper">
                    <img class="footer-logo" src="/images/bdoctors1.jpg" alt="logo">
                </div> -->
                <h2 class="logo-text text-uppercase">BDoctors</h2>
            </div>
        </div>
      </div>
    </div>
    <div class="bottom-footer col-12 text-center py-3">
      <p class="footer-text">©2024 BDoctors. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      specialties: [
        "Dermatologo-venereologo",
        "Ginecologo",
        "Oculista",
        "Otorinolaringoiatra",
        "Ortopedico-traumatologo",
        "Cardiologo",
        "Andrologo",
        "Urologo",
        "Neurologo",
        "Neurochirurgo",
        "Dentista",
        "Pediatra",
        "Osteopata",
        "Fisiatra",
        "Psicologo",
        "Medico di medicina generale",
        "Gastroenterologo",
        "Medico estetico",
        "Allergologo-immunologo",
        "Fisioterapista",
        "Chirurgo plastico",
        "Endocrinologo",
        "Geriatra",
        "Ematologo",
        "Reumatologo",
        "Nefrologo",
        "Radiologo",
        "Anestesista",
        "Immunologo",
        "Patologo",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
 /*    .logo-wrapper{
        width:100%;
        height:100px;
        overflow:hidden;
        .footer-logo{
        width: 100%;
        height:100%;

    }
    } */
  p {
    margin: 0;
  }
  ul {
    padding: 0;
    li {
      list-style: none;
      a {
        text-decoration: none;
        color: white;
      }
      a:hover {
        color: rgb(224, 221, 221);
        transition: 0, 5s;
      }
    }
  }
  h3 {
    font-size: 1.3em;
    font-weight: 700;
  }
}
</style>
