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
    ItemComponent, // The component responsible for displaying individual items.
  },

  // Example of using getters instead computed.
  // Good practice for complex logic or derived state
  // that is used in multiple places, 
  // or if the logic to calculate a value from the state is complex.
  // For simple app - access the state directly in component.
  getters: {
  filteredItems: (state) => (searchQuery) => {
    const query = searchQuery.toLowerCase();
    return state.items.filter(item => 
      item.name.toLowerCase().includes(query) || 
      (item.subitems || []).some(subitem => 
        subitem.name.toLowerCase().includes(query)
      )
    );
  },
},
  computed: {
    filteredItems() {
       // Filters the items in the category based on the search query.
      // Returns all items if no search query is provided.
      if (!this.searchQuery) {
        console.log("No search query, returning all items: ", this.category?.items);
        return this.category?.items || [];
      }

      const query = this.searchQuery.toLowerCase();
      const filtered = (this.category?.items || []).filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.details.toLowerCase().includes(query) ||
        (item.subitems || []).some(subitem =>
          subitem.name.toLowerCase().includes(query) ||
          subitem.details.toLowerCase().includes(query)
        )
      );
      console.log("Filtered items based on query:", query, filtered);
      return filtered;
    },

    categoryMatchesQuery() {
      // This checks if the category's name matches the search query.
      const query = this.searchQuery?.toLowerCase() || '';
      const matches = this.category && this.category.name.toLowerCase().includes(query);
      console.log("Does category name match the query?", matches, "Query:", query);
      return matches;
    },
    shouldDisplayCategory() {
         // Determines whether the category should be displayed.
      // It is displayed if the category name matches the search query or if there are any matching items.
      const shouldDisplay = this.categoryMatchesQuery || this.filteredItems.length > 0;
      // console.log("Should display category?", shouldDisplay);
      return shouldDisplay;
    },
  },
  data() {
    return {
      // Controls whether the category's items are visible (expanded)
      // or hidden (collapsed).
      isOpen: false,  
    };
  },
  watch: {
    // Automatically expands the category if a search query is present.
    searchQuery(newQuery) {
      this.isOpen = !!newQuery;
    },
  },
  methods: {
    toggle() {
      // Toggles the visibility of the category's items 
      // when the category name is clicked.
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