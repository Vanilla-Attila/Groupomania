<template>
  <div class="avatar-div ml-auto">
    <b-list-group-item fluid class="avatar text-right">
      <b-avatar
        button
        v-b-tooltip.hover
        title="Edit user details"
        @click="onClick(UserData.id)"
        src="https://placekitten.com/300/300"
      ></b-avatar>
      <span class="mx-3 mr-5"
        >{{ UserData.first_name }} {{ UserData.last_name }}</span
      >
      <b-button variant="outline-dark" class="mb-2" @click="logout">
        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
      </b-button>
    </b-list-group-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UserData: [],
      User: "",
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("User"));
    let userID = this.user.id;

    fetch("http://localhost:3000/api/auth/getOne/" + userID, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.UserData = data;
        console.log(data);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    onClick(id) {
      this.$router.push("/profile/" + id);
    },
    logout() {
      localStorage.clear();
      this.$router.push("/start");
    },
  },
};
</script>

<style>
.avatar-div {
  border-radius: 12px;
  box-shadow: 5px 5px 5px gray;
}
.bell {
  /* color: #ea3c53; */
  color: #236b8e;
  position: relative;
  top: 6px;
}
.avatar {
  /* border-radius: 16px 0; */
  border: none;
  /* border-bottom: 1px solid #236b8e; */
  background: lightblue;
  /* position: relative; */
  /* top: 8px; */
  /* left: 20px; */
  padding: 20px;
}
@media all and (max-width: 800px) {
  .avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .avatar-div {
    margin-left: 5px;
  }
}
</style>