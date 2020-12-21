<template>
  <div>
    <div class='account'>
      <Navbar/>
      <Account/>
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
import Account from "../components/Account.vue";
import Navbar from "../components/Navbar.vue";


export default {
  name: "account",
  components: {
    Account,
    Navbar,
  }
};
</script>
