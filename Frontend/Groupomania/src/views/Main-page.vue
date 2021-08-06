<template>
  <div>
    <header class="header">
      <b-navbar type="light" variant="light">
        <b-navbar-brand @click="reloadPage">
          <img
            class="logo-left"
            src="../assets/icon.png"
            alt="Groupomania-logo"
            width="40px"
            height="40px"
          />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-nav-form>
            <b-form-input class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button
              variant="outline-dark"
              class="my-2 my-sm-0 search"
              type="submit"
              >Search</b-button
            >
          </b-nav-form>
        </b-collapse>
        <User />
      </b-navbar>
      <h1 class="text-center h1">Groupomania</h1>
    </header>
    <main class="main-container mx-auto">
      <div class="create-div">
        <b-container fluid class="d-flex">
          <b-avatar
            class="main-avatar"
            variant="info"
            src="https://placekitten.com/300/300"
            size="4rem"
          ></b-avatar>

          <b-form-textarea
            v-model="postText"
            class="create-post-text"
            id="textarea-small"
            size="sm"
            placeholder="Create a post"
          ></b-form-textarea>
        </b-container>
        <div class="create-comment-icons">
          <b-button size="lg" variant="light" class="mb-2" v-b-modal.my-modal>
            <b-icon icon="image"></b-icon>
          </b-button>

          <b-modal id="my-modal"
            ><b-form-file v-model="file2" class="mt-3" plain></b-form-file
          ></b-modal>

          <b-button
            size="lg"
            variant="light"
            class="mb-2"
            @click="handleSubmit"
          >
            <b-icon icon="reply"></b-icon>
          </b-button>
        </div>
      </div>

      <div class="post-card my-3" v-for="post in AllPost" :key="post.id">
        <b-card class="post-margin">
          <div>
            <b-list-group-item class="d-flex align-items-center">
              <b-avatar
                variant="info"
                src="https://placekitten.com/300/300"
                class="mr-3"
              ></b-avatar>
              <span class="mr-auto">{{
                post.User.first_name + " " + post.User.last_name
              }}</span>
              <small>{{ moment(post.createdAt).fromNow() }}</small>

              <b-dropdown
                id="dropdown-right"
                right
                text="..."
                variant="light"
                class="m-2"
              >
                <b-dropdown-item
                  @click="
                    () => {
                      $router.push('post/' + post.id);
                    }
                  "
                  ><b-icon
                    type="button"
                    icon="pencil-fill"
                    class="mr-2"
                  ></b-icon
                  >Modify</b-dropdown-item
                >
                <b-dropdown-item @click="handleDeletePost(post.id)"
                  ><b-icon type="button" icon="trash" class="mr-2"></b-icon
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </b-list-group-item>
          </div>
          <b-card-body class="post-text text-justify">
            {{ post.Post_text }}
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
          <!-- <b-list-group-item>
            <div class="like-icon-with-counter d-flex">
              <b-icon icon="hand-thumbs-up" scale="2"></b-icon>
              <span class="like-index">2</span>
            </div>
          </b-list-group-item> -->
          <b-list-group-item class="card-footer">
            <!-- <div>
              <b-button size="lg" variant="primary" class="mb-2">
                <b-icon icon="hand-thumbs-up" class="like-icon"></b-icon>
              </b-button>
              <span class="like-btn-span">Liked</span>
            </div> -->

            <b-button
              @click="showComment = !showComment"
              size="lg"
              variant="light"
              class="mb-2"
            >
              <b-icon icon="chat-left-text" class="comment-icon"></b-icon>
            </b-button>
          </b-list-group-item>
          <div v-if="showComment">
            <div
              class="create-div d-flex"
              v-for="comment in post.Comments"
              :key="comment.id"
            >
              <b-container fluid>
                <b-avatar
                  class="main-avatar"
                  variant="info"
                  src="https://placekitten.com/300/300"
                  size="3rem"
                ></b-avatar>

                <b-label
                  class="create-post-text"
                  id="textarea-plaintext"
                  size="sm"
                  >{{ comment.Comment_text }}</b-label
                >
                <div class="comment-image text-center">
                  <img
                    v-if="comment.Comment_text_imgURL"
                    :src="comment.Comment_text_imgURL"
                    width="50px"
                    height="50px"
                  />
                </div>
              </b-container>
              <b-dropdown
                id="dropdown-right"
                right
                text="..."
                variant="light"
                class="m-2"
              >
                <!-- <b-dropdown-item
                  ><b-icon
                    type="button"
                    icon="pencil-fill"
                    class="mr-2"
                  ></b-icon
                  >Modify</b-dropdown-item
                > -->
                <b-dropdown-item @click="handleDeleteComment(comment.id)"
                  ><b-icon type="button" icon="trash" class="mr-2"></b-icon
                  >Delete</b-dropdown-item
                >
              </b-dropdown>
            </div>

            <div class="create-div">
              <b-container fluid class="d-flex">
                <b-avatar
                  class="main-avatar"
                  variant="info"
                  src="https://placekitten.com/300/300"
                  size="3rem"
                ></b-avatar>

                <b-form-textarea
                  class="create-post-text"
                  id="textarea-small"
                  size="sm"
                  placeholder="Comment"
                  v-model="commentText"
                ></b-form-textarea>
              </b-container>

              <div class="create-comment-icons">
                <b-button
                  size="lg"
                  variant="light"
                  class="mb-2"
                  v-b-modal.my-modal2
                >
                  <b-icon icon="image"></b-icon>
                </b-button>

                <b-button
                  size="lg"
                  variant="light"
                  class="mb-2"
                  @click="handleSubmitComment(post.id)"
                >
                  <b-icon icon="reply"></b-icon>
                </b-button>
              </div>
            </div>
          </div>
        </b-card>
      </div>
      <b-modal id="my-modal2"
        ><b-form-file v-model="file3" class="mt-3" plain></b-form-file
      ></b-modal>
    </main>
  </div>
</template>

<script>
var moment = require("moment");

import User from "../components/User.vue";
export default {
  components: { User },

  data() {
    return {
      moment: moment,
      file2: null,
      file3: null,
      selectedFile: null,
      text: "",
      post: "",
      showingComment: "",
      postState: null,
      submittedPosts: [],
      postText: "",
      postIMG: "",
      AllPost: [],
      AllComment: [],
      showComment: false,
      commentText: "",
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },

    handleSubmit() {
      // Exit when the form isn't valid

      let createPost = {
        post_imgURL: this.postIMG,
        post_text: this.postText,
      };
      let User = JSON.parse(localStorage.getItem("User"));
      let formdata = new FormData();
      formdata.append("post_text", this.postText);
      formdata.append("User_id", User.id);
      formdata.append("image", this.file2);
      console.log(formdata);
      fetch("http://localhost:3000/api/Post/createPost/", {
        method: "POST",
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
            this.file2 = null;
            this.getAllPost();
          });
        });
      // // Push the name to submitted names
      // this.submittedPosts.push(this.post);
    },

    handleSubmitComment(id) {
      let createComment = {
        comment_imgURL: this.commentIMG,
        comment_text: this.commentText,
      };
      let User = JSON.parse(localStorage.getItem("User"));
      let formdata = new FormData();
      formdata.append("Comment_text", this.commentText);
      formdata.append("user_id", User.id);
      formdata.append("post_id", id);
      formdata.append("image", this.file3);
      console.log(formdata);
      fetch("http://localhost:3000/api/comment/createComment", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${User.token}`,
        },
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          this.$nextTick(() => {
            this.commentText = "";
            this.file3 = null;
            this.getAllPost();
          });
        });
      // // Push the name to submitted names
      // this.submittedPosts.push(this.post);
    },

    handleDeletePost(id) {
      let User = JSON.parse(localStorage.getItem("User"));
      let token = User.token;
      console.log(token);
      fetch("http://localhost:3000/api/post/" + id, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);

          this.$nextTick(() => {
            this.getAllPost();
          });
        });
    },
    handleDeleteComment(id) {
      let User = JSON.parse(localStorage.getItem("User"));
      let token = User.token;
      console.log(token);
      fetch("http://localhost:3000/api/comment/" + id, {
        method: "Delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          this.$nextTick(() => {
            this.getAllPost();
          });
        });
    },

    reloadPage() {
      window.location.reload();
    },
    getAllPost() {
      fetch("http://localhost:3000/api/post/")
        .then((res) => res.json())
        .then((data) => {
          this.AllPost = data;
          console.warn(data);
        })
        .catch((err) => console.log(err.message));
    },
  },
  mounted() {
    this.getAllPost();
  },
};
</script>

<style>
.header {
  background: lightblue;
}
.logo-left {
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}
.logo-left:hover {
  border: 1.5px solid #696969;
}
.search {
  color: gray;
  background: lightblue;
}

.h1 {
  border-radius: 16px 0;
  padding: 20px 0;
  background: lightblue;
  font-family: "Zen Tokyo Zoo", cursive;
  color: blue;
}

.main-container {
  width: 50%;
}
.create-div {
  margin: 40px 0;
  border: 1px solid #f2f2f2;
}
.create-comment-icons {
  margin-top: 5px;
  display: flex;
  justify-content: space-around;
}

.main-avatar {
  margin-right: 15px;
}

.post-text {
  padding: 10px;
  color: black;
  line-height: 1.6;
  text-align: justify;
}
.like-icon-with-counter {
  margin: 5px 5px 5px 5%;
  color: #0275d8;
}
.like-index {
  margin-left: 10px;
}
.like-btn-span {
  margin-left: 5px;
  color: #0275d8;
}
.card-footer {
  display: flex;
  justify-content: space-around;
  background: white;
}
.post-margin {
  margin: 40px 0;
}

@media all and (max-width: 800px) {
  .main-container {
    width: 100vw;
  }
}
</style>