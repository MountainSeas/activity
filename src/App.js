import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import App from './container/Coupon'
import 'normalize.css'
// import './App.css'

class APP extends Component {
  render () {
    return (
      <App />
    )
  }
}

// export default App
export default hot(module)(APP)
