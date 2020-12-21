<template>
  <div class="stacked">
    <h2>Links:</h2>
    <div class="next">
      <div class="stacked">
        <input v-model.trim='name' type='text' name='name' placeholder="Name">
        <input v-model.trim='link' type='text' name='link' placeholder="Link">
      </div>
      <button class="button" v-on:click="addLink">Add</button>
    </div>
    <div v-if="links.length">
      <div v-for="(link,index) in links" v-bind:key="link">
        <div class="link stacked">
          <a :href="`${link.link}`" target="_blank">{{link.name}}</a>
          {{' '}}
          <button class="button" v-on:click="deleteLink(index)">Delete</button>
        </div>
      </div>
    </div>
    <div v-else>
      You have 0 links saved
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
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

export default {
  components: { },
  name: "UserLinks",
  data() {
    return {
      links: [],
      name: '',
      link: '',
      errors: [],
      messages: [],
    }
  },
  methods: {
    addLink: function () {
      
      const bodyContent = { name: this.name, link: this.link };
        axios
          .post("/api/users/link", bodyContent)
          .then(() => {
            // handle success
            this.links.push({ name: this.name, link: this.link })
          })
          .catch(err => {
            // handle error 
            this.errors.push(JSON.stringify(err.response.data.error));
          })
          .then(() => {
            // always executed
            this.clearMessages()
            this.resetForm()
          });
    },
    deleteLink: function(index) {
      const bodyContent = { name: this.links[index].name, link: this.links[index].link };
        axios
          .post("/api/users/link-delete", bodyContent)
          .then((res) => {
            // handle success
            this.links.splice(index,1)
            this.errors.push(res.response.data.message);
          })
          .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.clearMessages()
            this.resetForm()
          });
    },
    resetForm: function() {
      this.name = '';
      this.link = '';
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
      }, 5000);
    },
    getLinks: function() {
        axios
          .get("/api/users/link")
          .then((res) => {
            this.links = res.data.links
          })
          .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
          })
          .then(() => {
            // always executed
            this.clearMessages()
            this.resetForm()
          });
    },
  },
  created: function() {
    this.getLinks()
  }
};
</script>

<style scoped>
  .stacked {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .next {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .tags {
    margin-bottom: 16px;
  }
  .link {
    width: 100%;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
    margin: 16px;
  }
</style>



