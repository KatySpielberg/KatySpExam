import { defineStore } from 'pinia';
import { fetchData } from '../services/api';

export const useMainStore = defineStore('main', {
  state: () => ({
    selectedItemDetails: null, // Holds the details of the selected item.
    categories: [], // Stores the entire list of categories and their items.
  }),
  actions: {

    setSelectedItemDetails(details) {
      // Sets the selected item's details in the store.
      this.selectedItemDetails = details;
    },

    getItemDetails(id) {
       // Retrieves the details of an item by its ID from the categories.
      console.log("Getting details for item ID: ", id);
      return this.categories
        .flatMap(category => category.items)
        .find(item => item.id === parseInt(id));
    },

    getSubitemDetails(itemId, subitemId) {
      // Retrieves the details of a subitem by its ID from the specified item.
      console.log(`Getting details for subitem ID: ${subitemId} under item ID: ${itemId}`);
      const item = this.getItemDetails(itemId);
      if (item && item.subitems) {
        const subitem = item.subitems.find(subitem => subitem.id === parseInt(subitemId));
        console.log("Subitem details found: ", subitem);
        return subitem;
      }
      console.log("No subitem found");
      return null;
    },
      
    async loadItems() {
      // Fetches the categories and items data from the API and stores it in the state.
      console.log("Loading items...");
      const response = await fetchData();
      console.log("Items loaded: ", response.data);
      this.categories = response.data; // Store the full category data
    },
  },
});