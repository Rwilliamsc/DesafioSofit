import DesafioSofit from './DesafioSofit'
import fs from 'fs'
import path from 'path'

export default class DesafioSofitFile extends DesafioSofit {
  constructor (app) {
    super(app)
    this.datasource = app.datasource
  }

  //* * Gerando arquivos para dar outra opção de consumo de dados */
  async gerarAquivos () {
    const prices = await this.getPrices()
    const supplies = await this.getSupplies()
    const spents = await this.getSpents()

    const pricesFile = JSON.stringify(prices)
    const suppliesFile = JSON.stringify(supplies)
    const spentsFile = JSON.stringify(spents)

    await fs.writeFile(path.join(__dirname, './prices.json'), pricesFile, function (err, result) {
      if (err) console.log('error', err)
    })

    await fs.writeFile(path.join(__dirname, './supplies.json'), suppliesFile, function (err, result) {
      if (err) console.log('error', err)
    })

    await fs.writeFile(path.join(__dirname, './spents.json'), spentsFile, function (err, result) {
      if (err) console.log('error', err)
    })
  }
}
