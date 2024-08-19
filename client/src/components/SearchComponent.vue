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
      searchQuery: '',
    };
  },
  methods: {
    onInput() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>