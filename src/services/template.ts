import * as Sequelize from 'sequelize'

interface EmailTemplate {
    code: string
    body: string
    language: string
    subject: string
}
export async function template(db: Sequelize.Sequelize, code: string): Promise<EmailTemplate> {
    const [row] = await db.query('SELECT body, subject, idioma as language, tipo as code FROM EmailsTemplates WHERE Tipo=:code', {
        type: 'SELECT',
        replacements: { code }
    })
    //@ts-ignore
    return row
}
