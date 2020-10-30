import fs from 'fs'
import path from 'path'

export default async app => {
  /** importa e carrega as rotas */
  const files = await fs.readdirSync(path.join(__dirname, './'))
  files.forEach(fileName => {
    if (fileName !== 'RouterManager.js') {
      import(path.join(__dirname, fileName))
        .then(modulo => modulo.default(app))
        .catch(err => console.error(err))
    }
  })
}
