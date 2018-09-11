import React from 'react'
import { render } from 'react-dom'
import Home from './components/Home'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
import { Provider } from 'react-redux'
import store from './store'

render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
