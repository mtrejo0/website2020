<template>
  <div>
    <h1>Welcome!</h1>
    <div class="wrap">

        <input class="input" id='username' v-model.trim='signInUsername' type='text' name='username' placeholder="Username">
        <input class="input" id='password' v-model.trim='signInPassword' type='password' name='password' placeholder="Password">
        <button class="button" v-on:click="signIn"> Sign In</button>

        Sign up and make an account!
        <input class="input" id='username' v-model.trim='signUpUsername' type='text' name='username' placeholder="Username">
        <input class="input" id='password' v-model.trim='signUpPassword' type='password' name='password' placeholder="Password">
        <button class="button" v-on:click="signUp"> Sign Up</button>

    </div>
      
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .button {
    margin: 32px;
  }
  .input {
    margin: 16px;
  }
  .wrap {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignUp",

  data() {
    return {
      errors: [],
      signUpUsername: "",
      signUpPassword: "",
      signInUsername: "",
      signInPassword: ""
    }
  },

  methods: {
    signUp: function() {
      const bodyContent = { username: this.signUpUsername, password: this.signUpPassword  };
        axios
          .post("/api/users", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('signup-success', true);
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
    signIn: function() {
      const bodyContent = { username: this.signInUsername, password: this.signInPassword  };
        axios
          .post("/api/users/session", bodyContent)
          .then((res) => {
            // handle success
            eventBus.$emit('signin-success', res.data.data.username);
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
      this.signUpUsername = ""
      this.signUpPassword = ""
      this.signInUsername = ""
      this.signInPassword = ""
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
form {
  width: fit-content;
}

input[type="text"],
input[type="url"],
input[type="password"] {
  width: 15rem;
}
</style>