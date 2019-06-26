//@ts-check
exports.template = async function template(db, code) {
    const rs = await db.query('SELECT * FROM EmailsTemplates', {
        type: 'SELECT',
        replacements: { code }
    })
    return rs[0]
}
