<template>
  <div class="wrapper">
    <div class="next">
      <div>
        <p><strong>{{vaccine.vaccine}}</strong></p>
        <p>{{date}}</p>
      </div>
      <button class="button" v-on:click="remove" >Remove</button>
    </div>
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
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .button {
    margin-left: 32px;
  }
  .next {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "Vaccine",

  props: {
    vaccine: Object,
    index: Number
  },

  data() {
    return {
      errors: [],
    };
  },

  methods: {
    remove: function() {
      const bodyContent = {vaccine: this.vaccine.vaccine, date: this.vaccine.date};
        axios
          .post("/api/users/vaccine-delete", bodyContent)
          .then(() => {
            // handle success
            eventBus.$emit('remove-vaccine-success', this.index);
          })
          .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.clearMessages()
          });
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  },
  computed: {
    date: function () {
      return new Date(this.vaccine.date).toISOString().split('T')[0]
    }
  }
  
};
</script>
