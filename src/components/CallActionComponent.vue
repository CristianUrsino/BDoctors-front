<template>
  <div class="">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex call-action">
          <div class="col-2 d-flex justify-content-center">
            <div class="call-action-img border-rounded my-5">
              <img src="/images/bdoctors1.jpg" alt="" />
            </div>
          </div>
          <div class="col-10 call-action-text text-white my-4">
            <h1 class="">Sei un medico? Registrati!</h1>
            <ul>
              <li class="d-flex gap-2">
                <i class="fa-solid fa-share mt-2"></i>
                <p class="">
                  Iscriviti subito al nostro sito e inizia a lavorare come
                  medico.
                </p>
              </li>
              <li class="d-flex gap-2">
                <i class="fa-solid fa-share mt-2"></i>
                <p class="">
                  Controlla le tue statistiche e le tue recensioni.
                </p>
              </li>
              <li class="d-flex gap-2">
                <i class="fa-solid fa-share mt-2"></i>
                <p class="">
                  Proponi ai tuoi pazienti esami innovativi. 
                </p>
              </li>
              
              <li class="d-flex gap-2">
                <i class="fa-solid fa-share mt-2"></i>
                <p class="">
                  Migliora la tua visibilità online. 
                </p>
              </li>
            </ul>
            <div class="mt-3">
              <button class="btn btn-primary text-uppercase sub-btn">Iscriviti subito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CallActionComponent",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/partials/_variables.scss";
.sub-btn{
    font-weight: 600;
    border-radius: 10px;
}
.call-action-img {
  width: 200px;
  height: 200px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.call-action-text{
    padding:0 100px;
}
.call-action {
  background-color: $blue-green;

  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 20px;
  border: 1px solid rgb(190, 190, 190);
  box-shadow: 5px 5px 5px lightblue;
  ul{
    padding:0;
    p{
        margin:0
    }
  }
}
.border-rounded {
  border-radius: 50px;
  overflow: hidden;
}
img {
  width: 100%;
  transition: transform 0.3s, filter 0.3s ease-in-out;
}
.border-rounded:hover img {
  transform: scale(1.1);
  filter: brightness(1.2);
}
</style>
