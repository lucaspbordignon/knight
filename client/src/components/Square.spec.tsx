import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import * as React from 'react'

import { Square } from './Square'

const props = {
  selected: false,
  odd: false,
}

configure({ adapter: new Adapter() })

describe(`<Square />`, () => {
  it('renders', () => {
    expect(shallow(<Square {...props} />).exists()).toBeTruthy()
  })
})
