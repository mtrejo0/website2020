<template>
  <div>
    <div class='map'>
      <Navbar/>
      <SearchFilters/>
    </div>
  </div>
</template>
<style scoped>
  .result {
    margin: 16px;
  }
</style>

<script>
import Account from "../components/Account.vue";
import Navbar from "../components/Navbar.vue";
import Map from "../components/Map.vue";
import SearchFilters from "../components/SearchFilters.vue";
import { eventBus } from "../main";

export default {
  name: "account",
  components: {
    SearchFilters,
    Account,
    Navbar,
    Map,
  },
  data () {
    return {
      vaccineLocations: []
    }
  },

  created() {
    eventBus.$on("search-success", (res) => {
      this.vaccineLocations = res;
    });
    eventBus.$on("failed-to-load-pharmacies", () => {
      this.errors.push('Failed to load locations!')
    });
  
  },
};
</script>

<style>
label {
  white-space: pre-wrap;
}

.result {
  list-style-type: none;
}

/*  li {
    
  }*/
</style>
