//@ts-check
const companiesWithNews = exports.companiesWithNews = async function companiesWithNews(db, client) {
    const rs = await db.query('SELECT TOP 10 campo1 as code FROM Empresa_Datos_Facturas WHERE codigo_empresa=:client AND chequeadoEmail=0 GROUP BY campo1', {
        type: 'SELECT',
        replacements: { client }
    })
    return rs.map(({ code }) => code)
}
const invoices = exports.invoices = function invoices(db, client, code) {
    db.model('Invoice')
}