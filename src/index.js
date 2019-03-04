import '@babel/polyfill'

// 这里是发布入口

import component from './main.vue';

component.install = function (Vue, options) {
    Vue.component(component.name, component);
}

export default component;

