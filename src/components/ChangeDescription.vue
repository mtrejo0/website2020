<template>
  <div>
    <h2>Description:</h2>
    <div  id="submission-form">
      <form id="change-description" class='component' v-on:submit.prevent="changeDescription" method="put">
        <input id='description' v-model.trim='description' type='description' name='description' :placeholder="`${description}`">
        <input type='submit' value='Update' class="button">
      </form>
    </div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "ChangeDescription",
  props: {
    user: Object,
  },
  data() {
    return {
      errors: [],
      messages: [],
      description: "123"
    }
  },
  created: function() {
    this.getDescription()
  },
  methods: {
    changeDescription: function() {
      const bodyContent = { description: this.description};
        axios
          .put("/api/users/description", bodyContent)
          .then((res) => {
            // handle success
            this.messages.push(res.data.message);
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
    getDescription: function() {
        axios
          .get("/api/users/me")
          .then((res) => {
            this.description = res.data.description
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

    resetForm: function() {
      this.description = ""
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
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
input {
    margin: 8px;
}
</style>