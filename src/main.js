/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

import Vue from "vue";
import App from "./App.vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { IconsPlugin } from 'bootstrap-vue'
import "./main.css";
import ProgressBar from 'vuejs-progress-bar'
import '@progress/kendo-ui' // This will import the entire Kendo UI library
// As an alternative, you could import only the scripts that are used by a specific widget:
// import '@progress/kendo-ui/js/kendo.treeview' // Imports only the TreeView script and its dependencies

import '@progress/kendo-theme-default/dist/all.css'

import {
    TreeView,
    TreeViewItem,
    TreeViewInstaller
} from '@progress/kendo-treeview-vue-wrapper'
import { createApp } from 'vue'
import WelcomeScreen from './views/WelcomeScreen.vue'




Vue.use(TreeViewInstaller)
Vue.use(ProgressBar)
Vue.use(IconsPlugin);
Vue.use(BootstrapVue);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false;
import * as mdbvue from 'mdbvue'
for (const component in mdbvue) {
    Vue.component(component, mdbvue[component])
}


const ENV_PATH = require(`@/environments/environment.${process.env.VUE_APP_ENV_PATH}.js`);
console.log(ENV_PATH.ENV);

let {
    API_BASE_URI,
    IMG_CDN,
    AUDIO_CDN,
    VIDEO_CDN,
    DOCUMENT_CDN
} = ENV_PATH.ENV;

// let {
//   API_BASE_URI,

// } = ENV_PATH.ENV;
//if (ENV_PATH.ENV) {   // I don't know why ES6 object appending is not working...
//Vue.prototype = { ...Vue.prototype, ...prefix(ENV_PATH.ENV) };
//}

Object.assign(Vue.prototype, {});

console.dir(Vue.prototype);

new Vue({
    router,
    store,
    components: {
        TreeView
    },
    render: h => h(App)
}).$mount("#app");

// store.$app = app;