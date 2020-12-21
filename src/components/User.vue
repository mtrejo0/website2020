<template>
  <div>
    <Navbar/>
    <div class="wrap"> 
      <h1>{{user.username}}</h1>
      <h3>Description:</h3>
      <div v-if="user.description">
        {{user.description}}
      </div>
      <div v-else>
        No description
      </div>
      <h3>Links:</h3>
      <div v-if="user.links.length > 0">
        <ul v-for="link in user.links" v-bind:key="link" >
          <li><a :href="`${link.link}`" target="_blank">{{link.name}}</a></li>
        </ul>
      </div>
      <div v-else>
        No links
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import axios from "axios";

export default {
  name: "User",

  data() {
    return {
      posts: [],
      user: {},
      id: parseInt(this.$route.params.id),
      errors: [],
      messages: []
    }
  },
  components: {
    Navbar
  },
  created: function() {
    this.getUser()
  },
  methods: {
    getUser: function() {
      axios
        .get(`/api/users/id/${this.id}` )
        .then((res) => {
          this.user = res.data;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
    },
  },
}
</script>

<style scoped>
  .wrap {
    margin: 32px
  }
  .link {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
    margin: 16px;
  }
</style>
