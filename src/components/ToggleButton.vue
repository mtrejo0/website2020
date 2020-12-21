<template>
    <label for="toggle_button">
        <div class="wrap">
            <input type="radio" id="two" value="two" v-model="picked" v-on:click="sort">
            <label for="two">Recent</label>
            <br>
            <input type="radio" id="one" value="one" v-model="picked" v-on:click="sort">
            <label for="one">Popular</label>
            <br>
        </div>
    </label>
</template>
<script>
import { eventBus } from "../main";
export default {
    data() {
        return {
            picked: 'two'
        }
    },
    methods: {
        sort: function() {
            eventBus.$emit('toggle-sort', this.picked == 'one');
        },
    }
}
</script>
<style scoped>
    .wrap {
        display: flex;
    }

</style>