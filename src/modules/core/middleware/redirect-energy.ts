import { RouteLocationNormalized } from '.nuxt/vue-router';

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  const path = to.path.replace(/\/$/, '');
  return navigateTo([path, 'energy'].join('/'), { redirectCode: 301 });
});
