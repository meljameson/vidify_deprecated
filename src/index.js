import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'

ReactDOM.render(<Home />, document.getElementById('root'))
registerServiceWorker()
