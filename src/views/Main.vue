<template>
  <div>
    <Navbar/>
    <div class="center">
      <h1>Hey im Moises!</h1>
      <div class="columns">
        <div class="col">
          <div class="list-item">
            Born and raised in Dallas, TX
          </div>
          <div class="list-item">
            Roots from <a href="https://www.google.com/search?q=tlaltenango+zacatecas" target="_blank">Tlaltenango, Zacatecas 🇲🇽</a>
          </div>
          <div class="list-item">
            First generation low income student
          </div>
        </div>
        <div>
          <div class="list-item">
            Junior at MIT BS 21' MS 22'
          </div>

          <div class="list-item">
            Undergraduate Researcher in the <a href="https://lids.mit.edu/" target="_blank">LIDS</a> Group
            <br/>
            Under Sarah Cen <a href="https://lids.mit.edu/news-and-events/events/regulating-algorithmic-filtering-social-media" target="_blank">Regulating Social Media</a>
          </div>
          <div class="list-item">
            X Facebook Intern X2
          </div>
          <div class="list-item">
            President of <a href="http://maes.mit.edu" target="_blank">MAES</a>
          </div>
          <div class="list-item">
            Secretary of <a href="http://shpe.mit.edu" target="_blank">SHPE</a>
          </div>
          <div class="list-item">
            Brother of <a href="http://sigmanu.mit.edu" target="_blank">Sigma Nu</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Main",
  components: {
    Navbar
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
