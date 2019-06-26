//@ts-check
module.exports = (sequelize, Sequelize = require('sequelize')) => {
    const options = {
        tableName: 'EmailsAEnviar',
        timestamps: false,
    }
    const Model = sequelize.define('EmailToSend', {
        client: {
            field: 'empresa',
            type: Sequelize.STRING,
        },
        subject: Sequelize.STRING,
        body: Sequelize.STRING,
        attachment: Sequelize.STRING,
        type: {
            type: Sequelize.STRING,
            field: 'Codigo Email'
        },
        address: {
            type: Sequelize.STRING,
            field: 'Direccion Email'
        },
    }, options)
    return Model
}