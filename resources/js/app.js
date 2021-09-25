/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('../sass/app.scss')

import Vue from 'vue'

window.Vue = require('vue');

// router
import router from './routes.js';
window.router = router;
window.Fire = new Vue();

//v-form
import { Form, HasError, AlertError } from 'vform'
window.Form = Form;

//axios
import axios from "axios";
window.axios = axios;


//Bootstrtap vue
import BootstrapVue from 'bootstrap-vue'

//bootstapVue
Vue.use(BootstrapVue);
import 'bootstrap-vue/dist/bootstrap-vue.css'

//jquery
import $ from 'jquery'
window.$ = $

import Swal from 'sweetalert2'
window.Swal = Swal;

//UPPERCASE TEXT
Vue.filter('uppercaseText', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});

//===momentjs ========
import moment from 'moment'

Vue.filter('filterDate', function (myDate) {
    return moment(new Date(myDate)).format('Do MMMM YYYY, HH:mm:ss A');
});

Vue.filter('filterDateOnly', function (myDate) {
    return moment(new Date(myDate)).format('Do MMMM YYYY');
});

Vue.filter('filterHumanDate', function (myDate) {
    return moment(new Date(myDate)).format('Do MMMM YYYY, h:mm:ss A');
})

Vue.filter('humanize', function (value) {
    return moment(value).fromNow()
});


const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
})

window.toast = toast

const app = new Vue({
    el: '#app',
    router,
}).$mount('#app');
