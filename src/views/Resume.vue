<template>
  <div>
    <div class='resume'>
      <Navbar/>
      <div class="center">
        <h1>Resume</h1>
        <div>
          <a href="https://drive.google.com/file/d/18gO-uHsGn10CYh_UgH-22lLgFQhzlMaQ/view?usp=sharing"><button class="button">Click to View</button></a>
          <!-- {{' '}} -->
          <!-- <button class="button" v-on:click="download">Download</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "resume",
  components: {
    Navbar,
  },
  data () {
    return {}
  },
  methods: {
    download: function () {
      
    }
  }
};
</script>

<style scoped>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>

