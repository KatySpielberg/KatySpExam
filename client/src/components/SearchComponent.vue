<template>
  <input
    v-model="searchQuery"
    @input="onInput"
    placeholder="Search for items or subitems..."
  />
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Holds the current search query entered by the user.
    };
  },
  methods: {
     // Emits the current search query to the parent component every time the user types.
    onInput() {
      console.log("Search query changed: ", this.searchQuery); 
      this.$emit('search', this.searchQuery);
      console.log("Search query emitted: ", this.searchQuery); 
    },
  },
};
</script>