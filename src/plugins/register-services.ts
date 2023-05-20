// plugins/hello.ts
export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiService: `Api Service`
    }
  };
});
