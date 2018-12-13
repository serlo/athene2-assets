/**
 * @jest-environment node
 */

import axios from 'axios'
import * as React from 'react'
import { createApp } from '../../src/server-side-rendering'

const Re = props => {
  return <div>{props.name}</div>
}
const app = createApp({ Re: Re })
describe('asdf', () => {
  let server
  beforeAll(() => {
    return new Promise(resolve => {
      server = app.listen(3000, resolve)
    })
  })
  afterAll(() => {
    server.close()
  })
  test('name', async () => {
    const response = await axios.post('http://localhost:3000', {
      name: 'Re',
      props: { name: 'asdf' }
    })
    const { data } = response
    expect(data.html).toMatchSnapshot()
  })
})
