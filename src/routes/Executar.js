import DesafioSofit from '../exercicio/DesafioSofit'
import DesafioSofitFile from '../exercicio/DesafioSofitFile'
import ResumoFile from '../files/resumo.json'

export default app => {
  app.get('/inicializar', async (req, res) => {
    const sofit = new DesafioSofit(app)
    await sofit.carregarTabelas()

    res.status(200).json({ error: false, msg: 'Tabelas inicializadas com sucesso!' })
  })

  app.get('/exibir', async (req, res) => {
    try {
      const dados = await app.datasource.models.resumo.findAll({})
      res.status(200).json(dados.data)
    } catch (error) {
      res.status(400).json({ error: true, msg: error })
    }
  })

  app.get('/validar', async (req, res) => {
    const sofit = new DesafioSofit(app)
    const resumo = await app.datasource.models.resumo.findAll({ attributes: ['date', 'saldo'] })
    const data = []
    for (const res of resumo) {
      data.push({ date: res.date, value: res.saldo })
    }

    const response = await sofit.postValidar(data)
    res.status(200).json(response)
  })

  /** Manipulação por arquivo */

  app.get('/gerararquivo', async (req, res) => {
    const sofit = new DesafioSofitFile(app)
    await sofit.gerarArquivos()

    res.status(200).json({ error: false, msg: 'Arquivos Gerados com sucesso!' })
  })

  app.get('/exibirarquivo', async (req, res) => {
    res.status(200).json(ResumoFile)
  })

  app.get('/validararquivo', async (req, res) => {
    const sofit = new DesafioSofitFile(app)
    const data = ResumoFile.map(e => {
      return { date: e.date, value: e.saldo }
    })

    const response = await sofit.postValidar(data)
    res.status(200).json(response)
  })
}
