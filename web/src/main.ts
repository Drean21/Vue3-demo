import { AuthStore } from './type/user';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'



const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState({
    storage: localStorage, // 指定要使用的持久化存储类型
}));
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
