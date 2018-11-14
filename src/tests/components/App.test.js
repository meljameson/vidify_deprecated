import React from 'react'
import { App } from 'pages/App'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const props = {
  fetchUser: jest.fn()
}

it('renders without crashing', () => {
  shallow(<App {...props} />)
})