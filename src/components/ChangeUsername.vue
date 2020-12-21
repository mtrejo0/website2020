<template>
  <div id="submission-form">
    <form id="change-username" class='component' v-on:submit.prevent="changeUser" method="put">
      <input id='username' v-model.trim='username' type='text' name='username' placeholder="Username">
      <input type='submit' value='Update' class="button">
    </form>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  input {
    margin: 8px;
  }
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "ChangeUsername",

  data() {
    return {
      errors: [],
      username: ""
    }
  },

  methods: {
    changeUser: function() {
      const bodyContent = { username: this.username};
        axios
          .put("/api/users/username", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('change-username-success', this.username);
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

    resetForm: function() {
      this.username = ""
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  }
}
</script>

<style scoped>
.form-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#submission-form{
  display: flex;
  justify-content: center;
}

label {
  margin-right: 0.5rem;
}

form {
  width: fit-content;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>