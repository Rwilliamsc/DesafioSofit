import Controller from '../services/Constroller'

export default class DesafioSofit extends Controller {
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

  /** Carrega e calcula as tabelas */
  async carregarTabelas () {
    const prices = await this.getPrices()
    const supplies = await this.getSupplies()
    const spents = await this.getSpents()

    const resumo = []
    await this.popularResumo(prices, resumo, 'precoCb')
    await this.popularResumo(spents, resumo, 'km/dia')
    await this.popularResumo(supplies, resumo, 'vlrAbastecimento')

    const calendario = this.gerarCalendario(resumo)
    this.popularCalendario(calendario, resumo)

    await this.ajustarPrecoCb(calendario)
    this.calcularResultadoCalendario(calendario)

    try {
      await this.datasource.models.prices.bulkCreate(prices)
      await this.datasource.models.supplies.bulkCreate(supplies)
      await this.datasource.models.spents.bulkCreate(spents)
      await this.datasource.models.resumo.bulkCreate(calendario)
    } catch (error) {
      console.log(error)
    }
  }

  /** retorna um array populado com os dados da requisição */
  popularResumo (lista, resumo, campo) {
    if (!lista.length) return

    for (const elemento of lista) {
      const idxResumo = resumo.findIndex(el => el.date === elemento.date)

      if (idxResumo !== -1) {
        resumo[idxResumo][campo] = elemento.value
        continue
      }

      const itemLista = {
        date: '',
        precoCb: 0.00,
        vlrAbastecimento: 0.00,
        litrosAbastecimento: 0.00,
        'km/dia': 0.00,
        'km/l': 9.00,
        consumo: 0.00,
        saldo: 0.00
      }

      itemLista.date = elemento.date
      itemLista[campo] = elemento.value
      resumo.push(itemLista)
    }

    resumo.sort((a, b) => {
      const dateAfter = new Date(a.date.split('/').reverse().join('/'))
      const dateBefore = new Date(b.date.split('/').reverse().join('/'))
      return dateAfter - dateBefore
    })
  }

  /** Ajusta no calendário o valor do combustivel dia a dia */
  ajustarPrecoCb (calendario) {
    let ultimoPreco = 0.00

    for (const data of calendario) {
      ultimoPreco = data.precoCb ? data.precoCb : ultimoPreco
      data.precoCb = ultimoPreco
    }
  }

  /** Calcula resultado do Saldo */
  calcularResultadoCalendario (calendario) {
    calendario.forEach((el, idx) => {
      if (el.vlrAbastecimento) el.litrosAbastecimento = parseFloat(el.vlrAbastecimento.toFixed(2)) / el.precoCb
      if (el['km/dia']) el.consumo = parseFloat(el['km/dia'].toFixed(2)) / parseFloat(el['km/l'].toFixed(2))

      let calcularSaldo = parseFloat(calendario[idx === 0 ? 0 : idx - 1].saldo.toFixed(2)) + parseFloat(el.litrosAbastecimento.toFixed(2))
      calcularSaldo = parseFloat(calcularSaldo.toFixed(2)) - parseFloat(el.consumo.toFixed(2))
      el.saldo = parseFloat(calcularSaldo.toFixed(2))
    })
  }

  /** Gera calendário de completo */
  gerarCalendario (resumo) {
    const calendario = []
    const data = new Date(resumo[0].date.split('/').reverse().join('/'))
    const dataFim = new Date(resumo[resumo.length - 1].date.split('/').reverse().join('/'))

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' }

    while (data <= dataFim) {
      const dataBr = data.toLocaleDateString('pt-BR', options)

      calendario.push({
        date: dataBr,
        precoCb: 0.00,
        vlrAbastecimento: 0.00,
        litrosAbastecimento: 0.00,
        'km/dia': 0.00,
        'km/l': 9.00,
        consumo: 0.00,
        saldo: 0.00
      })

      data.setDate(data.getDate() + 1)
    }
    calendario.push(resumo[resumo.length - 1])
    return calendario
  }

  /** Popular Calendario */
  popularCalendario (calendario, resumo) {
    for (const data of resumo) {
      const idx = calendario.findIndex(el => el.date === data.date)

      calendario[idx].precoCb = data.precoCb
      calendario[idx].vlrAbastecimento = data.vlrAbastecimento
      calendario[idx].litrosAbastecimento = data.litrosAbastecimento
      calendario[idx]['km/dia'] = data['km/dia']
      calendario[idx]['km/l'] = data['km/l']
      calendario[idx].consumo = data.consumo
      calendario[idx].saldo = data.saldo
    }
  }
}
