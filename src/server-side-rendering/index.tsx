import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import * as ReactDOMServer from 'react-dom/server'
import * as React from 'react'

interface Registry {
  [name: string]: React.ComponentType<any>
}

export const createApp = (registry: Registry) => {
  console.log(express)

  const app = express()

  app.use(cors())
  app.use(bodyParser.json())

  app.post('/', (req, res) => {
    const { name, props } = req.body
    const Component = registry[name]
    const html = ReactDOMServer.renderToString(<Component {...props} />)
    res.send({ html })
  })
  return app
}
