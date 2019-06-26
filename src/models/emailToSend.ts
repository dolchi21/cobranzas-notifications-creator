//@ts-check
import * as Sequelize from 'sequelize'

export function factory(sequelize: Sequelize.Sequelize) {
    class EmailToSend extends Sequelize.Model { }
    const attributes: Sequelize.ModelAttributes = {
        client: {
            field: 'empresa',
            type: Sequelize.STRING,
        },
        subject: Sequelize.STRING,
        body: Sequelize.STRING,
        attachment: Sequelize.STRING,
        type: {
            type: Sequelize.STRING,
            field: 'Codigo Email'
        },
        address: {
            type: Sequelize.STRING,
            field: 'Direccion Email',
            allowNull: false
        },
    }
    const options: Sequelize.InitOptions = {
        sequelize,
        modelName: 'EmailToSend',
        tableName: 'EmailsAEnviar',
        timestamps: false,
    }
    EmailToSend.init(attributes, options)
    return EmailToSend
}