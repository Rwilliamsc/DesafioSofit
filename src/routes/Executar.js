import DesafioSofit from '../exercicio/DesafioSofit'
import DesafioSofitFile from '../exercicio/DesafioSofitFile'

export default app => {
  app.get('/inicializar', async (req, res) => {
    const sofit = new DesafioSofit(app)
    await sofit.carregarTabelas()

    res.status(200).json({ error: false, msg: 'Tabelas inicializadas com sucesso!' })
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

  app.get('/gerararquivos', async (req, res) => {
    const sofit = new DesafioSofitFile(app)
    await sofit.gerarArquivos()

    res.status(200).json({ error: false, msg: 'Arquivos Gerados com sucesso!' })
  })
}
