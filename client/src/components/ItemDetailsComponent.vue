<template>
  <div>
    <h2 v-if="details">{{ details.name }}</h2>
    <p v-if="details">{{ details.details }}</p>

    <!-- Display Subitems only if on the Item Page -->
    <div v-if="details && details.subitems && route.params.id">
      <h3>Subitems:</h3>
      <ul>
        <li v-for="subitem in details.subitems" :key="subitem.id">
          <router-link :to="`/items/${details.id}/subitems/${subitem.id}`">{{ subitem.name }}</router-link>
        </li>
      </ul>
    </div>

    <!-- Debugging -->
    <div v-else-if="!details">
      <p>No details available</p>
      <p>Route params: {{ route.params }}</p>
    </div>

    <button @click="goBack">Back</button>
    <router-link to="/" class="home-link">Home</router-link>
  </div>
</template>

<script>
import { useMainStore } from '../stores/main';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  setup() {
    const store = useMainStore();
    const route = useRoute();
    const router = useRouter();

    const details = computed(() => {
      const { id, itemId, subitemId } = route.params;

      if (itemId && subitemId) {
        return store.getSubitemDetails(itemId, subitemId);
      } else if (id) {
        return store.getItemDetails(id);
      } else if (itemId) {
        return store.getItemDetails(itemId);
      } else {
        return null;
      }
    });

    const goBack = () => {
      router.back();
    };

    return { details, goBack, route };
  },
};
</script>

<style scoped>
.home-link {
  margin-left: 10px;
  text-decoration: none;
  color: violet;
}
</style>