<template>
  <div id="app">
    <!-- Only render SearchComponent and CategoryComponent on the home route -->
    <div v-if="$route.name === 'Home'">
      <!-- The main app container that renders the search component and the category components -->
      <SearchComponent @search="handleSearch" />
      <!-- Renders each category and its items -->
      <CategoryComponent 
        v-for="category in filteredCategories" 
        :key="category.id" 
        :category="category" 
        :search-query="searchQuery"  
      />
    </div>

    <!-- Render the routed component (item or subitem in this project) -->
    <router-view></router-view>
  </div>
</template>

<script>
import SearchComponent from './components/SearchComponent.vue';
import CategoryComponent from './components/CategoryComponent.vue';
import { useMainStore } from './stores/main';

export default {
  name: 'App',
  components: {
    SearchComponent, // The component that handles user input for searching items and subitems.
    CategoryComponent, // The component that renders categories and their respective items.
  },

  // The setup method is part of the Composition API in Vue 3 
  // and is used to organize and set up reactive 
  // state, lifecycle hooks, and other logic.
  setup() {
    // Pinia is used for state management across the app. 
    // The main store (useMainStore) handles loading data, 
    // storing selected item details, 
    // and managing state across components.
    const store = useMainStore();
    store.loadItems();

    return { store };
  },
  data() {
    return {
      searchQuery: '', // Holds the current search query from the search component.
    };
  },
  computed: {
    filteredCategories() {
      if (!this.searchQuery) {
        return this.store.categories; // Use categories from the store
      }
      // This checks each item in the category to see if it matches the search query. 
      // It looks at the item’s name, details, and the names and details of any subitems.
      const query = this.searchQuery.toLowerCase();

      return this.store.categories.map(category => {
        const filteredItems = category.items
          .map(item => {
            const filteredSubitems = item.subitems
              ? item.subitems.filter(subitem =>
                  subitem.name.toLowerCase().includes(query) ||
                  subitem.details.toLowerCase().includes(query)
                )
              : [];

            return {
              ...item,
              subitems: filteredSubitems,
            };
          })
          .filter(
            item =>
              item.name.toLowerCase().includes(query) ||
              item.details.toLowerCase().includes(query) ||
              item.subitems.length > 0
          );

        return {
          ...category,
          items: filteredItems,
        };
      }).filter(category => category.items.length > 0);
    },
  },
  methods: {
    handleSearch(query) {
      // Update the search query when the user types in the search box.
      this.searchQuery = query;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>