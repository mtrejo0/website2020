<template>
  <div>
    <Navbar/>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
    
    <div class="wrapper">
      <h1 v-if="users.length == 0"> No accounts available</h1>
      <ul>
        <li v-for="(user, index) in users" v-bind:key="user">
            <h1><a :href="`user/${user.user_id}`">{{user.username}}</a></h1>
            <div v-if="user.description">
              {{user.description}}
            </div>
            <br/>
            <div v-if="user.links">
              <ul v-for="link in user.links" v-bind:key="link" >
                <li><a :href="`${link.link}`" target="_blank">{{link.name}}</a></li>
              </ul>
            </div>
            <button v-if="isAdmin" class="button" v-on:click="removeUser(index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 32px
  }
</style>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "People",

  data() {
    return {
      users: [],
      messages: [],
      errors: [],
      isAdmin: this.$cookie.get('user-auth') === 'admin'
    }
  },
  components: {
    Navbar
  },
  created: function() {
      axios
        .get("/api/users")
        .then((res) => {
          // handle success
          this.users = res.data;
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
  },
  methods: {
    removeUser: function(index) {
      axios
        .delete("/api/users/"+this.users[index].username)
        .then(() => {
          // handle success
          this.messages.push("Removed user " + this.users[index].username)
          this.users.splice(index,1)
        })
        .catch(err => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
    }
  },
  resetForm: function() {
    this.username = ""
  },

  clearMessages: function() {
    setInterval(() => {
      this.errors = [];
    }, 5000);
  }
}
</script>
