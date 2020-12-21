<template>
  <div>
      <router-link to="/">
        <button v-bind:class="{ selected: $route.name  == 'main'}" class="button">Home</button>
      </router-link>
      <router-link to="/resume">
        <button v-bind:class="{ selected: $route.name  == 'resume' || $route.name  == 'location'}" class="button">Resume</button>
      </router-link>
      <router-link to="/people">
        <button v-bind:class="{ selected: $route.name  == 'people'}" class="button">People</button>
      </router-link>
      <router-link to="/contact">
        <button v-bind:class="{ selected: $route.name  == 'contact'}" class="button">Contact</button>
      </router-link>
      <router-link to="/account">
        <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">{{auth? `${auth}'s Account` : "Account"}}</button>
      </router-link>   
  </div>
</template>
<style scoped>
  .selected {
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 2px black solid
  }
  .button {
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
  }
</style>

<script>
import { eventBus } from "../main";

export default {
  name: "NavBar",
  data() {
    return {
      auth: this.$cookie.get('user-auth')
    }
  },
  created: function() {
    eventBus.$on("signin-success", (userName) => {
      this.auth = userName;
    });
    
    eventBus.$on("signout-success", () => {
      this.auth = '';
    });
  }
};
</script>

<style scoped>
  .button {
    margin: 8px;
  }

</style>



