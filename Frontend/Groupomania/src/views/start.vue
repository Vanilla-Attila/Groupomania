<template>
  <div>
    <div class="div-img">
      <img
        class="start-img"
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
      </div>

      <p>&copy; 2021 Groupomania</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    let User = JSON.parse(localStorage.getItem("User"));
    let token = User.token;
    if (token) {
      this.$router.push("main");
    }
  },
};
</script>