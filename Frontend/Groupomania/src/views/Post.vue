<template>
  <div class="post-card my-3 post-card-container mx-auto">
    <b-card class="post-margin">
      <div v-if="post">
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar variant="primary" class="mr-2">{{
            post.User.first_name[0] + post.User.last_name[0]
          }}</b-avatar>
          <h6 class="mr-auto">
            {{ post.User.first_name + " " + post.User.last_name }}
          </h6>
          <small>"{{ moment(post.createdAt).fromNow() }}"</small>
        </b-list-group-item>
      </div>
      <b-card-body class="post-text text-justify">
        <b-input v-model="postText"></b-input>
        " {{ post.Post_text }}"
      </b-card-body>
      <b-card-img
        :src="
          post.Post_imgURL
            ? post.Post_imgURL
            : 'https://placekitten.com/300/300'
        "
        alt="Image"
        bottom
      ></b-card-img>
      <div class="create-comment-icons">
        <b-button size="lg" variant="light" class="mb-2" v-b-modal.my-modal4>
          <b-icon icon="image"></b-icon>
        </b-button>

        <b-modal id="my-modal4"
          ><b-form-file v-model="file4" class="mt-3" plain></b-form-file
        ></b-modal>

        <b-button size="lg" variant="light" class="mb-2" @click="handleSubmit">
          <b-icon icon="reply"></b-icon>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
var moment = require("moment");

export default {
  name: "Updatepost",
  data() {
    return {
      moment: moment,
      post: "",
      postText: "",
      postid: this.$route.params.id,
      file4: null,
    };
  },
  created() {
    this.getPost();
  },
  methods: {
    getPost() {
      let User = JSON.parse(localStorage.getItem("User"));

      // get the post py id
      fetch("http://localhost:3000/api/post/" + this.postid, {
        method: "Get",
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.post = data;
          this.postText = this.post.Post_text;
        });
    },
    handleSubmit() {
      // Exit when the form isn't valid

      let User = JSON.parse(localStorage.getItem("User"));
      let formdata = new FormData();
      formdata.append("post_text", this.postText);
      formdata.append("User_id", User.id);
      formdata.append("image", this.file4);
      console.log(formdata);
      fetch("http://localhost:3000/api/Post/" + this.postid, {
        method: "Put",
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.$nextTick(() => {
            this.postText = "";
            this.file4 = null;
            this.getPost();
          });
        });
      // // Push the name to submitted names
      // this.submittedPosts.push(this.post);
    },
  },
};
</script>

<style>
.post-card-container {
  width: 50%;
}

@media all and (max-width: 800px) {
  .post-card-container {
    width: 100vw;
  }
}
</style>