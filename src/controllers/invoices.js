//@ts-check
const express = require('express')
const Queue = require('promise-queue')

const ModelCreators = {
    Email: require('../models/emailToSend')
}
const ClientService = require('../services/client')
const InvoiceService = require('../services/invoice')

const router = express.Router()

const companiesQueue = new Queue(3)
const invoicesQueue = new Queue(3)

async function loadClientData(db, client) {
    return {
        fields: await ClientService.configFields(db, client, 'Empresa_Datos_Facturas'),
        codes: await InvoiceService.companiesWithNews(db, client)
    }
}
async function loadClientDataInParallel(db, client) {
    const [fields, codes] = await Promise.all([
        ClientService.configFields(db, client, 'Empresa_Datos_Facturas'),
        InvoiceService.companiesWithNews(db, client),
    ])
    return {
        fields,
        codes,
    }
}

router.get('/process/:client/invoices', (req, res, next) => Promise.resolve().then(async () => {
    const db = require('../db')
    const { client } = req.params

    //const { codes, fields } = await loadClientData(db, client)
    const { codes, fields } = await loadClientDataInParallel(db, client)

    const tasks = codes.map(code =>
        () => InvoiceService.invoices(db, client, code)
    ).map(loadInvoices => invoicesQueue.add(loadInvoices))

    const invoices = (await Promise.all(tasks)).reduce((sum, arr) => sum.concat(arr), [])

    const emails = invoices.map(invoice => ({
        client,
        subject: invoice.get('Campo3'),
        body: invoice.get('Campo4') + invoice.get('Campo5'),
        attachment: null,
        type: 'node-test',
        address: 'axel.dolce@amtek.com.ar'
    }))
    const Email = ModelCreators.Email(db)

    const dbEmails = (await Promise.all(
        emails.map(email =>
            Email.build(email)
        )
    )).map(i => i.get())

    res.json({
        dbEmails,
        invoices,
        codes,
        fields,
    })
}).catch(next))

module.exports = router