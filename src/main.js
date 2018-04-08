import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.config.productionTip = false;
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

new Vue({
  render: h => h(App)
}).$mount('#app');
