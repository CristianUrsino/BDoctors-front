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
    <div class="border-rounded">
        <img class="hidden " src="/images/bdoctors1.jpg" alt="">
      </div>   

        <ul class="nav-items ">
          <li>Menu</li>
          <li>About</li>
          <li>Contact</li>
        
        </ul>

        <button type="button" class="btn btn-light">Login</button>
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
.logo{
  display: none;
}

.nav-menu {
background-color:#0077b6ff;
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

.border-rounded{
    border-radius: 25px;
    overflow: hidden;
}
.nav-small{
  display: none;
}
img {
  width: 110px;
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
//height: 150px;
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
.hidden{
  display: none;
}
i {
display: block;
text-align: right;
padding: 0 10px 10px 0;
}

.logo{
  display: block;
  
  text-align: left;

}
.nav-small{
display: flex;
justify-content: space-between;
align-items: center;
list-style: none;

}


}


</style>