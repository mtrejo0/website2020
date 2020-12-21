<template>
  <div class="wrapper">
    <div class="search">
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :autocomplete-items="filteredItems"
        @tags-changed="newTags => tags = newTags"
      />
      
      <button class="button" v-on:click="search">Search</button>

    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
    <h4>Sort by:</h4>
    <ToggleButton />
    
    <div class="toggle">
      <div v-if="displayNotes.length==0">
        <Note
            v-for="note in notes.slice().reverse()"
            v-bind:key="note"
            v-bind:note="note"
            v-bind:index="index"
          />
      </div>
      <div v-else>
        <Note
            v-for="note in displayNotes.slice().reverse()"
            v-bind:key="note.note"
            v-bind:note="note"
            v-bind:index="index"
          />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .search{
    display: flex;
    margin-bottom: 32px;
  }
  .button {
    margin-left: 16px;
    height: 32px
  }
  .toggle{
    margin-top: 32px;
  }
</style>

<script>

import Note from "../components/Note.vue"
import ToggleButton from "../components/ToggleButton.vue"
import VueTagsInput from '@johmun/vue-tags-input';
import { eventBus } from "../main";

export default {
  name: "Notes",

  props: {
    notes: Array
  },

  data() {
    return {
      tag: '',
      tags: [],
      errors: [],
      displayNotes: [],
      autocompleteItems: [{
        text: 'Vaccines',
      }, {
        text: 'Payment',
      }, {
        text: 'Accessibility',
      }, {
        text: 'Wait',
      }, {
        text: 'Request',
      }, {
        text: 'Cash',
      }, {
        text: 'English',
      }, {
        text: 'Spanish',
      }
      ],
    };
  },
  methods: {
    search() {
      this.displayNotes = []
      for (let i = 0 ; i < this.notes.length ; i ++){
        let note = this.notes[i]
        let noteTags = note.tag.split(',').map( x => x.toLowerCase())
          
        let add = false;
        this.tags.map( x => x.text.toLowerCase()).forEach(
          function(tag) {
            if (noteTags.includes(tag)){
              add = true;
            }
          }
        )
        if (add) {
          this.displayNotes.push(note)
        }
      }

    }
  },
  components: {
    Note,
    VueTagsInput,
    ToggleButton
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
  created: function() {
    eventBus.$on("toggle-sort", (toggle) => {
      this.displayNotes = this.notes;
      if (!toggle) {
        this.displayNotes.sort( (a,b) => {
          return a.likes.length - b.likes.length
        })
      }
      else {
        this.displayNotes.sort( function (a,b) {
          return a.timestamp - b.timestamp
        })
      }
    });
    eventBus.$on("add-note-success", (note) => {
      this.notes.push(note)
    });

    
  }
};
</script>
