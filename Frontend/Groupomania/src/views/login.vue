<template>
  <div class="login">
    <h1>This is a login page</h1>
    <div>
      <label>Email</label>
      <input type="text" v-model="username" />
      <div>{{ username }}</div>
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="password" />
      <div>{{ password }}</div>
    </div>
    <button type="button" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    alert("im  mounted");
  },
  methods: {
    login() {
      alert(this.username + " " + this.password);
    },
  },
};
</script>

<style>
</style>