<template>
  <div id="app">
    <!-- Only render SearchComponent and CategoryComponent on the home route -->
    <div v-if="$route.name === 'Home'">
      <SearchComponent @search="handleSearch" />
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
    SearchComponent,
    CategoryComponent,
  },
  setup() {
    const store = useMainStore();
    store.loadItems();

    return { store };
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  computed: {
    filteredCategories() {
      if (!this.searchQuery) {
        return this.store.categories; // Use categories from the store
      }

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