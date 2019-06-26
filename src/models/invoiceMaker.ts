//@ts-check
import * as Sequelize from 'sequelize'
const { BIGINT, BOOLEAN, STRING } = Sequelize

interface ModelOptions {
    tableName?: string
}

export default (modelOptions?: ModelOptions) => {
    modelOptions = modelOptions || {}
    return (sequelize: Sequelize.Sequelize) => {
        class Invoice extends Sequelize.Model { }
        const options: Sequelize.InitOptions = {
            sequelize,
            tableName: modelOptions.tableName || 'Empresa_Datos_FacturasTP',
            timestamps: false,
        }
        const attributes: Sequelize.ModelAttributes = {
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
        }
        const campos = new Array(51).fill(null).map((e, i) => ({
            ['Campo' + (i + 1)]: STRING
        })).reduce((sum, item) => Object.assign(sum, item), {})
        Object.assign(attributes, campos)
        Invoice.init(attributes, options)
        return Invoice
    }
}