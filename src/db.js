const Sequelize = require('sequelize')

const string = 'mssql://sa:Amteki17.s@cyan.ovpn:5000/CobranzasData'

module.exports = new Sequelize(string)
