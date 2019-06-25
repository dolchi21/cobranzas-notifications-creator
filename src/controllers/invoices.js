//@ts-check
const express = require('express')

const ClientService = require('../services/client')
const InvoiceService = require('../services/invoice')

const router = express.Router()

router.get('/process/:client/invoices', (req, res, next) => Promise.resolve().then(async () => {
    const db = require('../db')
    
    const fields = await ClientService.configFields(db, req.params.client, 'Empresa_Datos_Facturas')
    const codes = await InvoiceService.companiesWithNews(db, req.params.client)

    res.json({
        fields, codes
    })
}).catch(next))

module.exports = router