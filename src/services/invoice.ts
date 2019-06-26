import * as Sequelize from 'sequelize'

import * as ModelMaker from '../models/invoiceMaker'

const clientInvoiceModels = {}
export async function clientInvoiceModel(db: Sequelize.Sequelize, client: string) {
    if (clientInvoiceModels[client]) return clientInvoiceModels[client](db)
    const ownsTable = await db.query('SELECT TOP 1 * FROM Empresa_Datos_FacturasTP_' + client).then(() => true).catch(() => false)
    console.log(client, 'ownsTable', ownsTable)
    const tableName = ownsTable ? 'Empresa_Datos_FacturasTP_' + client : 'Empresa_Datos_FacturasTP'
    clientInvoiceModels[client] = ModelMaker.default({
        tableName
    })
    return clientInvoiceModels[client](db)
}
export async function companiesWithNews(db: Sequelize.Sequelize, client: string): Promise<string[]> {
    const rs = await db.query('SELECT TOP 10 campo1 as code FROM Empresa_Datos_Facturas WHERE codigo_empresa=:client AND chequeadoEmail=0 GROUP BY campo1', {
        type: 'SELECT',
        replacements: { client }
    })
    return rs.map(({ code }) => code)
}
export async function invoices(db: Sequelize.Sequelize, client: string, code: string) {
    const Invoice = await clientInvoiceModel(db, client)
    return Invoice.findAll({
        where: {
            Codigo_Empresa: client,
            Campo1: code,
        }
    })
}