<template>
    <div>
      <h2>{{ details.name }}</h2>
      <p>{{ details.details }}</p>
    </div>
  </template>
  
  <script>
  import { useMainStore } from '../stores/main';
  import { computed } from 'vue';
  
  export default {
    setup() {
      const store = useMainStore();
      const details = computed(() => store.selectedItemDetails);
  
      return { details };
    },
  };
  </script>