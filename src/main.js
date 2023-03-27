import { createApp } from 'vue'
import App from './App.vue'
import jquery from 'jquery'
import * as d3 from 'd3'

createApp(App).mount('#app')
Vue.prototype.$ = jquery
Vue.prototype.d3 = d3
