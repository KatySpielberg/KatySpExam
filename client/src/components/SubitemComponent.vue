<template>
  <div>
    <router-link 
      :to="`/items/${itemId}/subitems/${subitem.id}`"
      class="subitem"
    >
      <h5>{{ subitem.name }}</h5>
    </router-link>
    <p class="subitem-details">{{ subitem.details }}</p> 
  </div>
</template>

<script>
export default {
  props: {
    subitem: Object,
    itemId: String,  // itemId imported from the parent component
  },
};
</script>

<style scoped>
.subitem {
  color: salmon;
  cursor: pointer;
}

.subitem-details {
  color: purple; 
}
</style>