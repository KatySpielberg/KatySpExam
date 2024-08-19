import { defineStore } from 'pinia';
import { fetchData } from '../services/api';

export const useMainStore = defineStore('main', {
  state: () => ({
    selectedItemDetails: null,
    categories: [], // Store the categories 
  }),
  actions: {
    setSelectedItemDetails(details) {
      this.selectedItemDetails = details;
    },
    getItemDetails(id) {
      return this.categories
        .flatMap(category => category.items)
        .find(item => item.id === parseInt(id));
    },
    getSubitemDetails(itemId, subitemId) {
      const item = this.getItemDetails(itemId);
      if (item && item.subitems) {
        return item.subitems.find(subitem => subitem.id === parseInt(subitemId));
      }
      return null;
    },
    async loadItems() {
      const response = await fetchData();
      console.log("stores-main-load-items: ", response);
      this.categories = response.data; // Store the full category data
    },
  },
});