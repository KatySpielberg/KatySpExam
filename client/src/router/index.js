import { createRouter, createWebHistory } from 'vue-router';
import CategoryComponent from '../components/CategoryComponent.vue';
import ItemDetailsComponent from '../components/ItemDetailsComponent.vue';

const routes = [
  { path: '/', name: 'Home', component: CategoryComponent },  // Home page display a list of categories
  { path: '/items/:id', name: 'ItemDetails', component: ItemDetailsComponent }, // Item details page
  { path: '/items/:itemId/subitems/:subitemId', name: 'SubitemDetails', component: ItemDetailsComponent }, // Subitem details page
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;