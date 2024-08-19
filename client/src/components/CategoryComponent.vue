<template>
  <div v-if="shouldDisplayCategory">
    <h3 @click="toggle" class="category">{{ category?.name }}</h3>
    <div v-if="isOpen">
      <ItemComponent 
        v-for="item in filteredItems" 
        :key="item.id" 
        :item="item"
        :search-query="searchQuery"
      />
    </div>
  </div>
</template>

<script>
import ItemComponent from './ItemComponent.vue';

export default {
  props: {
    category: Object,
    searchQuery: String,
  },
  components: {
    ItemComponent,
  },
  computed: {
    filteredItems() {
      if (!this.searchQuery) {
        return this.category?.items || [];
      }

      const query = this.searchQuery.toLowerCase();
      return (this.category?.items || []).filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query) ||
        (item.subitems || []).some(subitem =>
          subitem.name.toLowerCase().includes(query) ||
          subitem.details.toLowerCase().includes(query)
        )
      );
    },
    categoryMatchesQuery() {
      const query = this.searchQuery?.toLowerCase() || '';
      return this.category && this.category.name.toLowerCase().includes(query);
    },
    shouldDisplayCategory() {
      return this.categoryMatchesQuery || this.filteredItems.length > 0;
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  watch: {
    searchQuery(newQuery) {
      this.isOpen = !!newQuery;
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped>
.category {
  color: red;
}
</style>