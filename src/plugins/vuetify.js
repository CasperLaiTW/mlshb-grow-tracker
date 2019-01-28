import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme:  {
    primary: '#607d8b',
    secondary: '#795548',
    accent: '#009688',
    error: '#f44336',
    warning: '#ffc107',
    info: '#673ab7',
    success: '#8bc34a'
  }
})
