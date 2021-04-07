const knex = require('knex');

class Database {
  constructor(knexfile) {
    this.db = knex(knexfile);
  }
  async updateRecord({ jsonpath, json, ip }) {
    const date = parseInt(new Date().getTime() / 1000);
    return await this.db('jsons')
      .where("jsonpath", jsonpath)
      .insert({
        jsonpath,
        ip,
        json,
        created_at: date,
        updated_at: date,
      })
      .onConflict('jsonpath')
      .merge(['json', 'ip', 'updated_at']);
  }
  async getRecord(jsonpath) {
    return await this.db("jsons").select("json").where("jsonpath", jsonpath);
  }
}

module.exports = Database;