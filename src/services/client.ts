//@ts-check
export interface ConfigField {
    client: string
    fieldNumber: number
    group: number
    email: boolean
}
export async function configFields(db, client, tableName): Promise<ConfigField[]> {
    const rs = await db.query('SELECT a.* FROM Empresa_Config_TxtDatos a JOIN Empresa_Configuracion_Grupo b ON a.codigo_empresa=b.codigo_empresa AND a.grupo=b.grupo WHERE a.codigo_empresa=:client AND b.tablaDatos=:tableName', {
        type: 'SELECT',
        replacements: { client, tableName }
    })
    return rs
}
