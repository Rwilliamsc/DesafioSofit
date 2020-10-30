import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import RouterManager from '../routes/RouterManager'
import { DATA_SOURCE } from './datasource'

export const CREATE_APP = () => {
  const app = express()

  // Desativa o X-Powered-By: Express
  app.disable('x-powered-by')

  // Parse JSON
  app.use(bodyParser.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

  // Permite acesso externo
  app.use(cors())

  // Atribui o datasource ao app
  app.datasource = DATA_SOURCE()

  // Configura as rotas de acesso
  RouterManager(app)

  return app
}
