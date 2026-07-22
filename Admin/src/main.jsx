import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/index.css'
import {App} from './app/App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/app.slice.js'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
