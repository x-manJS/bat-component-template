import '@babel/polyfill'

// 这里是调试入口

import main from './main.vue';

new Vue({
    el: "#app",
    render: h => h(main)
});
