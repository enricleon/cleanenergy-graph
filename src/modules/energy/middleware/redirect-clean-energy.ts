import { RouteLocationNormalized } from '.nuxt/vue-router';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  const path = to.path.replace(/\/$/, '');
  return navigateTo([path, 'clean-energy'].join('/'), { redirectCode: 301 });
});
