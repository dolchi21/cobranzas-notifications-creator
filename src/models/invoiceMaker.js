//@ts-check
const { BIGINT, BOOLEAN, STRING } = require('sequelize')
module.exports = (modelOptions = {}) => {
    return (sequelize) => {
        const options = {
            tableName: modelOptions.tableName || 'Empresa_Datos_FacturasTP',
            timestamps: false,
        }
        const Model = sequelize.define('Invoice', {
            ID: {
                type: BIGINT,
                field: 'ID'
            },
            client: {
                field: 'codigo_empresa',
                type: STRING,
                primaryKey: true,
            },
            SuperId: {
                type: BIGINT,
                primaryKey: true,
            },
            number: {
                type: STRING,
                field: 'Campo2'
            },
            Campo1: STRING,
            Campo2: STRING,
            Campo3: STRING,
            Campo4: STRING,
            Campo5: STRING,
            Campo51: STRING,
            emailChecked: {
                type: BOOLEAN,
                field: 'chequeadoEmail'
            }
        }, options)
        Model.removeAttribute('id')
        return Model
    }
}