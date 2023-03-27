import { createApp } from 'vue'
import App from './App.vue'
import jquery from 'jquery'
import * as d3 from 'd3'

createApp(App).mount('#app')
createApp(App).prototype.$ = jquery
createApp(App).prototype.d3 = d3
