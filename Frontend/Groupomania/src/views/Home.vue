<template>
  <div>
    <div class="div-img">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="Logo picture"
      />
    </div>
    <div class="div-right-side">
      <div class="h3">
        <h3>The socail media for Groupomania employees</h3>
      </div>
      <div class="div-btn">
        <router-link to="/login" class="btn-login"
          >Login
          <!-- <button class="btn-login">Login</button> -->
        </router-link>
        <router-link to="/signUp" class="btn-sign-up">Sign Up</router-link>
        <!-- <button class="btn-sign-up">Sign up</button> -->
        <router-view />
      </div>

      <p>&copy; 2021 Groupomania</p>
    </div>
  </div>
</template>

<style>
.div-right-side {
  float: right;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  justify-content: space-between;
  width: 49vw;
  height: 100vh;
}

.div-img {
  float: left;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 49vw;
  background: #00688b;
  background-image: linear-gradient(#388e8e, #00cdcd);
}
img {
  image-rendering: pixelated;
  width: 90%;
}
.h3 {
  text-align: center;
  margin-top: 130px;
  color: #008080;
  text-shadow: 2px 2px 4px grey;
}
.btn-login {
  margin-bottom: 60px;
  width: 30%;
  text-align: center;
  border: none;
  background: #00868b;
  color: #fff;
  text-decoration: none;
  padding: 16px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 36px;
}
.btn-sign-up {
  width: 30%;
  text-align: center;
  border: none;
  background: #00c5cd;
  /* background-image: linear-gradient(to bottom right, blue, purple); */
  color: #fff;
  text-decoration: none;
  padding: 16px;
  font-size: 30px;
  cursor: pointer;
  border-radius: 36px;
  margin-bottom: 90px;
}

.div-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}

.btn-login:hover {
  background: #2f4f4f;
  box-shadow: 10px 10px 5px #8db6cd;
  color: #fff;
  text-decoration: none;
}

.btn-sign-up:hover {
  background: #2f4f4f;
  box-shadow: 10px 10px 5px #8db6cd;
  color: #fff;
  text-decoration: none;
}
p {
  color: #00c5cd;
}

@media all and (max-width: 1200px) {
  .div-img {
    width: 100vw;
    height: 200px;
  }
  .div-right-side {
    width: 100vw;
  }
  .btn-sign-up {
    width: 50%;
  }
  .btn-login {
    width: 50%;
  }
}
</style>