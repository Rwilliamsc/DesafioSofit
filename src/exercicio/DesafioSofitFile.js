import Controller from '../services/Constroller'
import fs from 'fs'
import path from 'path'

export default class DesafioSofitFile extends Controller {
  constructor (app) {
    super()
    this.datasource = app.datasource
  }

  /** Retorna um array com as datas de alteração do preço do combustível. */
  async getPrices () {
    const prices = await this.rest('/data/5f997281c6a3840014e38249/prices')

    return prices.data
  }

  /** Retorna um array com datas e abastecimentos do veículo em reais (não em litros).. */
  async getSupplies () {
    const supplies = await this.rest('/data/5f997281c6a3840014e38249/supplies')

    return supplies.data
  }

  /** Retorna um array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia). */
  async getSpents () {
    const spents = await this.rest('/data/5f997281c6a3840014e38249/spents')

    return spents.data
  }

  async postValidar (data) {
    const response = await this.rest.post('/check?id=5f997281c6a3840014e38249', data)

    return response.data
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
