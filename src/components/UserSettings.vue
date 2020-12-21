<template>
  <div>
    <h1>
      Hello {{username}}!
    </h1>
    <SignOut/>
    <ChangeUsername/>
    <ChangePassword/>
    <button class="button" v-on:click="deleteUser()">Delete Account</button>
    <div class="next">
      <ChangeDescription/>
      <UserLinks/>
    </div>
  </div>
</template>
<style scoped>
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
import SignOut from "./SignOut.vue";
import ChangePassword from "./ChangePassword.vue";
import ChangeUsername from "./ChangeUsername.vue";
import ChangeDescription from "./ChangeDescription.vue";
import UserLinks from "./UserLinks.vue";

import { eventBus } from "../main";
import axios from "axios";


export default {
  name: "UserSettings",

  data() {
    return {
      errors: [],
      username: this.$cookie.get('user-auth')
    }
  },
  components: {
    SignOut,
    ChangeUsername,
    ChangePassword,
    ChangeDescription,
    UserLinks
  },
  methods: {
    deleteUser: function() {
      this.errors.push("Succesfully Deleted Account");
      const bodyContent = { username: this.username};
        axios
          .delete("/api/users/"+this.username, bodyContent)
          .then(() => {
            // handle success
            this.errors.push("Succesfully Deleted Account");
            eventBus.$emit('signout-success', true);
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
      this.username = this.$cookie.get('user-auth')
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  },
  created: function() {
    eventBus.$on("change-username-success", (userName) => {
      this.username = userName;
    });
  }
}
</script>

<style scoped>
form {
  width: fit-content;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}

.next {
    display: flex;
    flex-direction: row;
}

 @media (max-width: 700px) {
    .next {
      display: block;
    }
  }

.payments{
  margin-left: 64px;
}
</style>