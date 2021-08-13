<template>
  <div align-v="start" class="start">
    <b-container fluid="sm">
      <div class="titles">
        <img
          class="su-img"
          src="../assets/icon-left-font-monochrome-black.png"
          alt="Logo picture"
        />
      </div>
      <div class="div-height">
        <h2 class="h2">Sign up:</h2>
        <div class="d-flex justify-content-center">
          <b-icon
            icon="arrow-down"
            animation="cylon-vertical"
            font-scale="2"
          ></b-icon>
        </div>
        <div class="div-border">
          <b-form class="position-relative p-3" @submit.prevent="onSubmit">
            <b-form-group
              label="First name"
              label-for="form-name"
              label-cols-lg="2"
            >
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  id="form-name"
                  v-model="firstName"
                  :disabled="busy"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              label="Last name"
              label-for="form-Lname"
              label-cols-lg="2"
            >
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  id="form-Lname"
                  v-model="lastName"
                  :disabled="busy"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group label="Email" label-for="form-mail" label-cols-lg="2">
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="envelope-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  id="form-email"
                  type="email"
                  v-model="email"
                  :disabled="busy"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <b-form-group
              label="Password"
              label-for="form-password"
              label-cols-lg="2"
            >
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  id="form-password"
                  type="password"
                  v-model="password"
                  :disabled="busy"
                ></b-form-input>
              </b-input-group>
            </b-form-group>

            <!-- <b-form-group
              label="Image"
              label-for="form-image"
              label-cols-lg="2"
            >
              <b-input-group>
                <b-input-group-prepend is-text>
                  <b-icon icon="image-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-file
                  id="form-image"
                  :disabled="busy"
                  accept="image/*"
                ></b-form-file>
              </b-input-group>
            </b-form-group> -->

            <div class="d-flex justify-content-center">
              <b-button
                variant="info"
                ref="submit"
                type="submit"
                :disabled="busy"
                >Sign up</b-button
              >
            </div>

            <b-overlay :show="busy" no-wrap @shown="onShown" @hidden="onHidden">
              <template #overlay>
                <div
                  v-if="processing"
                  class="text-center p-4 bg-primary text-light rounded"
                >
                  <b-icon icon="cloud-upload" font-scale="4"></b-icon>
                  <div class="mb-3">Processing...</div>
                  <b-progress
                    min="1"
                    max="20"
                    :value="counter"
                    variant="success"
                    height="3px"
                    class="mx-n4 rounded-0"
                  ></b-progress>
                </div>
                <div
                  v-else
                  ref="dialog"
                  tabindex="-1"
                  role="dialog"
                  aria-modal="false"
                  aria-labelledby="form-confirm-label"
                  class="text-center p-3"
                >
                  <p><strong id="form-confirm-label">Are you sure?</strong></p>
                  <div class="d-flex">
                    <b-button
                      variant="outline-danger"
                      class="mr-3"
                      @click="onCancel"
                    >
                      Cancel
                    </b-button>
                    <b-button variant="outline-success" @click="onOK"
                      >OK</b-button
                    >
                  </div>
                </div>
              </template>
            </b-overlay>
          </b-form>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      busy: false,
      processing: false,
      intervall: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    // types: ["password"];
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    onShown() {
      // Focus the dialog prompt
      this.$refs.dialog.focus();
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.submit.focus();
    },
    onSubmit() {
      this.processing = false;
      this.busy = true;
    },
    onCancel() {},
    onOK() {
      this.processing = true;

      let obj = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      };
      fetch("http://localhost:3000/api/auth/signup", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            this.$nextTick(() => {
              this.busy = this.processing = false;
            });
          } else {
            this.$nextTick(() => {
              this.busy = this.processing = false;
            });
            this.$router.push("/login");
          }
          console.log(data);

          // this.$router.push("/login");
        });
    },
  },
};
</script>

<style>
.start {
  background: #f2f2f2;
  height: 100vh;
}
.titles {
  display: flex;
  justify-content: center;
  background: #5bc0de;
  border-radius: 16px;
}
.h2 {
  text-align: center;
  margin-bottom: 35px;
  text-decoration: underline;
  font-weight: bold;
}
.su-img {
  width: 22%;
}
.main-container {
  text-align: center;
}

.div-height {
  position: relative;
  bottom: 62px;
}

.div-border {
  border: 2px solid #5bc0de;
  padding: 30px 20px;
  border-radius: 16px;
}

@media all and (max-width: 800px) {
  .start {
    background: none;
  }
  .div-height {
    padding: 0;
    margin: 20px 0 0 5px;
  }
  .su-img {
    position: relative;
    bottom: 13px;
  }
}
</style>