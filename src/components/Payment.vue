<template>
  <div class="wrapper">
    {{payment.payment}}
    <button class="button" v-on:click="remove"> Remove</button>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
  .wrapper {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
    margin-bottom: 16px;
  }
  .button {
    margin-left: 32px;
  }
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "Payment",

  props: {
    payment: Object,
    index: Number
  },

  data() {
    return {
      errors: [],
    };
  },
  methods: {
    remove: function() {
      const bodyContent = { payment: this.payment.payment };
        axios
          .post("/api/users/payment-delete", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('remove-payment-success', this.index);
          })
          .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.clearMessages()
          });
    }
  }
  
};
</script>
