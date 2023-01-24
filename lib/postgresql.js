const {Pool} = require('pg');

const config = {
  user: 'postgres',
  host: 'localhost',
  database: 'hackathon',
  password: 'password',
  port: 5432
}

module.exports = class Postgres{
  Postgres(){
    this.client = null
    this.pool = null
  }
  async connect(){
    try{
      this.pool = new Pool(config)
      this.client = await this.pool.connect()
      return
    }
    catch(err){
      console.log(err)
    }
  }

  async disconnect(){
    try{
      this.client.release(true)
    }
    catch(err){
      console.log(err)
    }
  }
}