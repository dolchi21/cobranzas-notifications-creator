//@ts-check
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const options = {
        tableName: 'EmailsAEnviar',
        timestamps: false,
    }
    const Model = sequelize.define('EmailHash', {
        client: {
            field: 'empresa',
            type: Sequelize.STRING,
        },
        code: {
            field: 'codigo',
            type: Sequelize.STRING,
        },
        value: {
            field: 'RegistroConcatenado',
            type: Sequelize.STRING,
        }
    }, options)
    return Model
}