<template>
  <div class="wrapper">
    <strong>"{{note.note}}"</strong>
    <p v-if="note.tag.length > 0">Tags: <i>{{note.tag}}</i></p>
    <p>{{time}}</p>
    <p v->Likes: {{likes}}</p>
    <button v-if="!note.hasLiked" class="button" v-on:click="addLike">Like</button>

    <button v-else class="button" v-on:click="removeLike">Unlike</button>
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

<style scoped>
  .wrapper {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
    margin-bottom: 16px;
  }
</style>

<script>
import axios from "axios";

export default {
  name: "Note",

  props: {
    note: Object,
    index: Number
  },

  data() {
    return {
      errors: [],
      messages: [],
      likes: this.note.likes.length,
    };
  },
  methods: {
    addLike() {
      axios
        .post(`/api/users/like/${this.note.note_id}`)
        .then((res) => {
          // handle success
          this.messages.push(res.data.message);
          this.likes += 1
          this.note.hasLiked = true;
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
    removeLike() {
      axios
        .delete(`/api/users/like/${this.note.note_id}`)
        .then((res) => {
          // handle success
          this.messages.push(res.data.message);
          this.likes -= 1
          this.note.hasLiked = false;
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
        this.messages = []
      }, 5000);
    },
    timeDifference(current, previous) {

      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;

      var elapsed = current - previous;

      if (elapsed < msPerMinute) {
          return Math.round(elapsed/1000) + ' seconds ago';   
      }

      else if (elapsed < msPerHour) {
          return Math.round(elapsed/msPerMinute) + ' minutes ago';   
      }

      else if (elapsed < msPerDay ) {
          return Math.round(elapsed/msPerHour ) + ' hours ago';   
      }

      else if (elapsed < msPerMonth) {
          return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
      }

      else if (elapsed < msPerYear) {
          return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
      }

      else {
          return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
      }
    }
  },
  computed: {
    time() {
      return this.timeDifference(Date.now(), parseInt(this.note.timestamp))
    },
  },
};
</script>
