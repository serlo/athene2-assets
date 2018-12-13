import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as ReactDOMServer from 'react-dom/server'
import * as React from 'react'

interface Registry {
  [name: string]: React.ComponentType<any>
}

export const createApp = (registry: Registry) => {
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
