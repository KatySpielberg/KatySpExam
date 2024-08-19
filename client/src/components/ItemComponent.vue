<template>
  <div v-if="shouldDisplayItem">
    <h4 @click="goToItemDetails" class="item">{{ item.name }}</h4>
    <div v-if="isOpen">
      <p v-if="itemMatchesQuery">{{ item.details }}</p>
      <div v-if="filteredSubitems.length > 0">
        <SubitemComponent 
          v-for="subitem in filteredSubitems" 
          :key="subitem.id" 
          :subitem="subitem"
          :item-id="String(item.id)" 
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubitemComponent from './SubitemComponent.vue';
import { useRouter } from 'vue-router';

export default {
  props: {
    item: Object,
    searchQuery: String,
  },
  components: {
    SubitemComponent,
  },
  setup(props) {
    const router = useRouter();
    
    const goToItemDetails = () => {
      router.push({ name: 'ItemDetails', params: { id: String(props.item.id) } });  
    };

    return { goToItemDetails };
  },
  computed: {
    filteredSubitems() {
      if (!this.searchQuery) {
        return this.item.subitems || [];
      }

      const query = this.searchQuery.toLowerCase();
      return (this.item.subitems || []).filter(subitem =>
        subitem.name.toLowerCase().includes(query) ||
        subitem.details.toLowerCase().includes(query)
      );
    },
    itemMatchesQuery() {
      const query = this.searchQuery.toLowerCase();
      return (
        this.item.name.toLowerCase().includes(query) ||
        this.item.details.toLowerCase().includes(query)
      );
    },
    shouldDisplayItem() {
      return this.itemMatchesQuery || this.filteredSubitems.length > 0;
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
.item {
  color: green;
}
</style>