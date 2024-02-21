const knex = require("knex");
const knexfile = require("./knexfile");

const knexConnection = knex(knexfile.development);

module.exports = knexConnection;
