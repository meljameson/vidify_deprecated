import React from 'react'
import ReactDOM from 'react-dom'
import Login from './components/Login'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

ReactDOM.render(<Login />, document.getElementById('root'))
registerServiceWorker()
