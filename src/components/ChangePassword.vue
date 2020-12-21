<template>
  <div id="submission-form">
    <form id="change-password" class='component' v-on:submit.prevent="changePass" method="put">
      <input id='password' v-model.trim='password' type='password' name='password' placeholder="Password">
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
  name: "ChangePassword",

  data() {
    return {
      errors: [],
      password: ""
    }
  },

  methods: {
    changePass: function() {
      const bodyContent = {password: this.password};
        axios
          .put("/api/users/password", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('change-password-success');
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
      this.password = ""
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
input[type="url"],
input[type="password"] {
  width: 15rem;
}
</style>