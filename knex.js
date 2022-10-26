require('dotenv').config({ path: '.env.local' })

const environment = process.env.NODE_ENV;

const config = require("./db/knexfile")[environment];
const knex = require("knex")(config)

module.exports = knex;
