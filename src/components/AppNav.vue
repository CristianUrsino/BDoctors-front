<template>
  <header>
    <!--container menu-->
    <div class="nav-menu">
      <!--click-->

      <ul class="nav-small">
        <li><img class="border-rounded logo " src="/images/bdoctors1.jpg" alt=""></li>
        <li><i class="fa-solid fa-bars" @click="showMenu()"> </i></li>
      </ul>





      <!--menu content-->
      <div class="nav-content" :class="this.showMobileMenu ? 'open-menu' : 'closed-menu'">
        <!--logo-->
        <div class="nav-logo">
          <div class="border-rounded logo-img-wrapper">
            <img class="hidden " src="/images/bdoctors1.jpg" alt="">
          </div>
        </div>

        <ul class="nav-items text-uppercase">
          <li><router-link class="nav-link" active-class="active" :to="{ name: 'Home' }">Home</router-link></li>
          <li><router-link class="nav-link" active-class="active" :to="{ name: 'DoctorSearch' }">Ricerca</router-link>
          </li>
          <li><router-link class="nav-link" active-class="active" :to="{ name: 'ourTeam' }">Il Nostro team</router-link>
          </li>

        </ul>

        <div class="gap-2">
          <button type="button" class="btn btn-light me-3"><a href="http://127.0.0.1:8000/login"
              rel="noopener noreferrer">Login</a>
          </button>
          <button type="button" class="btn btn-light"><a href="http://127.0.0.1:8000/register"
              rel="noopener noreferrer">Registrati</a>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppNav",
  data() {
    return {
      showMobileMenu: false,
    };
  },
  methods: {
    showMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    },
  },
};




</script>

<style lang="scss" scoped>
.logo-img-wrapper {
  width: 110px
}

.nav-logo {
  width: 220px
}

.logo {
  display: none;
}

.nav-menu {
  background-color: #0077b6ff;
  color: white;

}

.nav-content {
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  align-items: center;
}

.nav-items {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    padding: 0 10px;
    cursor: pointer;
    font-size: 1.5rem;
  }
}

i {
  display: none;
}

button {
  color: white;
  background-color: #0077b6ff;
  font-size: 1.5rem;
}

.border-rounded {
  border-radius: 25px;
  overflow: hidden;
}

.nav-small {
  display: none;
}

img {
  width: 110px;
}

@media screen and (max-width: 600px) {
  .nav-items {
    flex-direction: column;
    font-size: 0.5rem;
  }

  button {
    margin-top: 10px;
  }
}

// Mobile version - hidden hamburger menu
@media screen and (max-width: 768px) {
  .nav-menu {
    padding-top: 10px;
    position: absolute;
    width: 100%;
    z-index: 5000;
  }

  .open-menu {
    opacity: 1;
    height: auto;
  }

  .closed-menu {
    opacity: 0;
    height: 0;
    padding: 0;
  }

  .nav-content {
    z-index: 1000;
    position: relative;
    transition: all 0.2s ease-out;
  }

  .nav-items {
    flex-direction: column;
  }

  .hidden {
    display: none;
  }

  i {
    display: block;
    text-align: right;
    padding: 0 10px 10px 0;
  }

  .logo {
    display: block;

    text-align: left;

  }

  .nav-small {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;

  }


}

@media screen and (max-width: 375px) {
  .nav-menu .nav-items li {
    font-size: 1rem;
  }

  .nav-menu button {
    font-size: 0.8rem;
    padding: 5px 10px;
  }
}</style>