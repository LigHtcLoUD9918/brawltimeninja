import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default ({ app, env }) => {
  window.onNuxtReady(() => {
    // should be called after vuex-persist
    Vue.use(VueAnalytics, {
      id: 'UA-137233906-1',
      router: app.router,
      // enabled in layout.vue#watch/adsAllowed
      disabled: app.store.state.adsAllowed !== true,
    })
  })
}