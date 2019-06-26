//@ts-check
import * as Sequelize from 'sequelize'

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
                type: Sequelize.BIGINT,
                field: 'ID'
            },
            client: {
                field: 'codigo_empresa',
                type: Sequelize.STRING,
                primaryKey: true,
            },
            SuperId: {
                type: Sequelize.BIGINT,
                primaryKey: true,
            },
            number: {
                type: Sequelize.STRING,
                field: 'Campo2'
            },
            Campo1: Sequelize.STRING,
            Campo2: Sequelize.STRING,
            Campo3: Sequelize.STRING,
            Campo4: Sequelize.STRING,
            Campo5: Sequelize.STRING,
            Campo51: Sequelize.STRING,
            emailChecked: {
                type: Sequelize.BOOLEAN,
                field: 'chequeadoEmail'
            }
        }
        const campos = new Array(51).fill(null).map((e, i) => ({
            ['Campo' + (i + 1)]: Sequelize.STRING
        })).reduce((sum, item) => Object.assign(sum, item), {})
        Object.assign(attributes, campos)
        Invoice.init(attributes, options)
        return Invoice
    }
}