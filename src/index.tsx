import React from 'react'

import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'

import App from '~/App'

const render = (Component: React.ComponentType) => {
  ReactDOM.render(<Component />, document.getElementById('app'))
}

render(hot<any>(App))
