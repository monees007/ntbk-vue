/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

// Components
import App from './App.vue'
import {registerLicense} from '@syncfusion/ej2-base';


// Composable
import {createApp} from 'vue'

const app = createApp(App)

registerPlugins(app)

registerLicense('');

app.mount('#app')
