import ReactDOM from 'react-dom/client'

import App from './App.tsx'

import { Provider } from 'react-redux'
import { store } from './appStore.ts'

import '@UI/Styles/appStyle.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
