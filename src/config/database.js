export const DB = {
  database: 'SOFITDB',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'SOFITDB.sqlite',
    define: {
      underscored: true
    },
    dialectOptions: {
      useUTC: false,
      timezone: 'Etc/GMT-3'
    },
    sync: { force: true },
    benchmark: false,
    logging: false
  }
}
