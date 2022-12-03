require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production' // verifica se é produçãp

const {Pool} = require('pg')

// monta uma string de conexão com o banco (ele usa o dotenv, que vai para o arquivo .env que criamos)
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

// quando cria o pool, ele usa a connections string, se estiver em produção vai procurar o databaseurl (que vai criar quando fizermos o deploy), se nao estiver em produtucao ele usa a variavel connectionString
const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL: connectionString
  // descomentar para fazer deploy no heroku
 // , ssl: {
 //   rejectUnauthorized: false,
 // }
})

module.exports = {pool}