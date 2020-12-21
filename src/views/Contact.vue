<template>
  <div>
    <div class='resume'>
      <Navbar/>
      <div class="center">
        <h1>Get in contact with me!</h1>
        <div class="columns">
          <div class="col">
            <div class="list-item">
              <a href="mailto:moisest@mit.edu" target="_blank">moisest@mit.edu</a>
              <p>Send me an email</p>
            </div>
            <div class="list-item">
            <a href="https://calendly.com/moisestrejo/30min" target="_blank">Calendly</a>
            <p>Schedule some time with me</p>
            </div>
            <div class="list-item">
              <a href="https://www.linkedin.com/in/moisestrejo/" target="_blank">LinkedIn</a>
              <p>Connect with me</p>
            </div>
            <div class="list-item">
              <a href=" https://www.instagram.com/moises.trejo0/" target="_blank">Instagram</a>
              <p>Follow me</p>
            </div>
          </div>
          <div>
            <div class="list-item">
              <a href="https://github.com/mtrejo0" target="_blank">Github</a>
              <p>Checkout past projects</p>
            </div>
            <div class="list-item">
              <a href="https://devpost.com/mtrejo" target="_blank">Devpost</a>
              <p>Checkout past hackathons</p>
            </div>
            
          </div>
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
  .list-item {
    width: 100%;
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
    margin: 16px;
  }
  
  .columns {
    display: flex;
  }

  @media (max-width: 700px) {
    .columns {
      display: block;
    }
  }
  .col {
    margin-right: 32px;
  }
</style>

