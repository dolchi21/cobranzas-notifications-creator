//@ts-check
const express = require('express')
const Queue = require('promise-queue')
const R = require('rambda')

const ModelCreators = {
    Email: require('../models/emailToSend').factory,
    EmailHash: require('../models/emailHash').factory
}
const ClientService = require('../services/client')
const InvoiceService = require('../services/invoice')
const TemplateService = require('../services/template')

const router = express.Router()

const companiesQueue = new Queue(3)
const invoicesQueue = new Queue(3)

async function loadClientData(db, client) {
    return {
        fields: await ClientService.configFields(db, client, 'Empresa_Datos_Facturas'),
        codes: await InvoiceService.companiesWithNews(db, client),
        template: await TemplateService.template(db, 'ACT_FAC')
    }
}
async function loadClientDataInParallel(db, client) {
    const [fields, codes, template] = await Promise.all([
        ClientService.configFields(db, client, 'Empresa_Datos_Facturas'),
        InvoiceService.companiesWithNews(db, client),
        TemplateService.template(db, 'ACT_FAC')
    ])
    return {
        fields,
        codes,
        template,
    }
}

router.get('/process/:client/invoices', (req, res, next) => Promise.resolve().then(async () => {
    const db = require('../db')
    const { client } = req.params

    //const { codes, fields } = await loadClientData(db, client)
    const invoices2 = await InvoiceService.invoices(db, 'SUL', '20342510044')
    const { codes, fields, template } = await loadClientDataInParallel(db, client)

    const tasks = codes.map(code =>
        invoicesQueue.add(() =>
            InvoiceService.invoices(db, client, code)
        )
    )

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
    const dbEmails = (await R.map(
        e => Email.build(e),
        emails
    )).map(i => i.get())

    res.json({
        template,
        dbEmails,
        invoices,
        codes,
        fields,
    })
}).catch(next))

module.exports = router