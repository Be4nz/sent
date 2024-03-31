const knex = require('knex');
const knexfile = require('./knexfile');
const { attachPaginate } = require('knex-paginate');
const knexConnection = knex(knexfile.development);
attachPaginate();

module.exports = knexConnection;

export default knexConnection;
