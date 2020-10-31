import DesafioSofit from './DesafioSofit'
import fs from 'fs'
import path from 'path'
import pricesFile from '../files/prices.json'
import suppliesFile from '../files/supplies.json'
import spentsFile from '../files/spents.json'

export default class DesafioSofitFile extends DesafioSofit {
  constructor (app) {
    super(app)
    this.datasource = app.datasource
  }

  /** Gerando arquivos para dar outra opção de consumo de dados */
  async gerarArquivos () {
    const prices = await this.getPrices()
    const supplies = await this.getSupplies()
    const spents = await this.getSpents()

    await this.criarArquivo(prices, 'prices')
    await this.criarArquivo(supplies, 'supplies')
    await this.criarArquivo(spents, 'spents')
    await this.gerarFileResumo()
  }

  /** Gerando arquivos para dar outra opção de consumo de dados */
  async gerarFileResumo () {
    const prices = pricesFile
    const supplies = suppliesFile
    const spents = spentsFile

    const resumo = []
    await this.popularResumo(prices, resumo, 'precoCb')
    await this.popularResumo(spents, resumo, 'km/dia')
    await this.popularResumo(supplies, resumo, 'vlrAbastecimento')

    const calendario = this.gerarCalendario(resumo)
    this.popularCalendario(calendario, resumo)

    await this.ajustarPrecoCb(calendario)
    this.calcularResultadoCalendario(calendario)

    await this.criarArquivo(calendario, 'resumo')
  }

  async criarArquivo (dados, arquivo) {
    await fs.writeFile(path.join(__dirname, `../files/${arquivo}.json`), JSON.stringify(dados), (err) => {
      if (err) console.log('error', err)
    })
  }
}
