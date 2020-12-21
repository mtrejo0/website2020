<template>
  <div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if="isSignedIn" class="form-container">
      <UserSettings/>
    </div>
    <div v-else class="form-container">
      <SignUp/>
    </div> 
  </div>
</template>

<script>
import UserSettings from "./UserSettings.vue";
import SignUp from "./SignUp.vue";
import { eventBus } from "../main";

export default {
  name: "Account",

  components: {
    UserSettings,
    SignUp
  },

  data() {
    return {
      isSignedIn: false,
      messages: [],
    };
  },

  created: function() {
    let authenticated = this.$cookie.get('user-auth');
    if (authenticated) {
      this.isSignedIn = true;
    }

    eventBus.$on("signin-success", (userName) => {
      this.$cookie.set('user-auth', userName);
      this.isSignedIn = true;
      this.messages.push("You have been signed in!");
      this.clearMessages();
    });

    eventBus.$on("change-username-success", (userName) => {
      this.$cookie.set('user-auth', userName);
      this.messages.push("You have changed your username!");
      this.clearMessages();
    });

    eventBus.$on("change-password-success", () => {
      this.messages.push("You have changed your password!");
      this.clearMessages();
    });
    
    eventBus.$on("signout-success", () => {
      this.$cookie.set('user-auth', '');
      this.isSignedIn = false;
      this.messages.push("You have been signed out!");
      this.clearMessages();
    });

    eventBus.$on("signup-success", () => {
      this.messages.push("You have been signed up! Sign in to continue.");
      this.clearMessages();
    });

    eventBus.$on("added-vaccine-success", () => {
      this.messages.push("You have saved a new vaccine!");
      this.clearMessages();
    });


    eventBus.$on("remove-payment-success", () => {
      this.messages.push("You have removed a saved payment!");
      this.clearMessages();
    });

    eventBus.$on("added-payment-success", () => {
      this.messages.push("You have saved a new payment!");
      this.clearMessages();
    });


  },
  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.messages = [];
      }, 5000);
    },
  }
};
</script>