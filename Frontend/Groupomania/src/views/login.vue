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
        <h2 class="h2">Login:</h2>
        <div class="d-flex justify-content-center">
          <b-icon
            icon="arrow-down"
            animation="cylon-vertical"
            font-scale="2"
          ></b-icon>
        </div>
        <div class="div-border">
          <b-form class="position-relative p-3" @submit.prevent="onSubmit">
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

            <div class="d-flex justify-content-center">
              <b-button
                variant="info"
                ref="submit"
                type="submit"
                :disabled="busy"
                >Login</b-button
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
                    value="20"
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
  name: "login",
  data() {
    return {
      busy: false,
      processing: false,
      done: false,
      interval: null,
      email: "",
      password: "",
    };
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
      this.$refs.submit.focus();
    },
    onSubmit() {
      this.processing = false;
      this.busy = true;
    },
    onCancel() {},
    onOK() {
      this.processing = true;

      let obj = { email: this.email, password: this.password };
      fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => res.json())
        .then(
          (data) => {
            console.log(data);
            if (data.token) {
              localStorage.setItem("User", JSON.stringify(data));
              this.$nextTick(() => {
                this.busy = this.processing = false;
              });

              this.$router.push("/main");
            } else {
              alert(data.error);
              this.busy = this.processing = false;
            }
          },
          (error) => {
            console.log("error block", error);
          }
        )
        .catch((err) => {
          console.log("catch block", err);
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