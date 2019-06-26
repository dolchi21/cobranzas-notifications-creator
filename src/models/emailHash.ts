//@ts-check
import * as Sequelize from 'sequelize'

export function factory(sequelize: Sequelize.Sequelize) {
    class EmailHash extends Sequelize.Model { }
    const options: Sequelize.InitOptions = {
        sequelize,
        tableName: 'EmailsAEnviar',
        timestamps: false,
    }
    const atributes: Sequelize.ModelAttributes = {
        client: {
            field: 'empresa',
            type: Sequelize.STRING,
        },
        code: {
            field: 'codigo',
            type: Sequelize.STRING,
        },
        value: {
            field: 'RegistroConcatenado',
            type: Sequelize.STRING,
        }
    }
    EmailHash.init(atributes, options)
    return EmailHash
}