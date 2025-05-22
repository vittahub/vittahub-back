import knex, { Knex } from 'knex';
import knexConfig from '../knexfile';

//const knexConfig = require('../knexfile').development; // Certifique-se de usar a configuração correta
const db: Knex = knex(knexConfig.development);

async function runMigrations(): Promise<void> {
    try {
        // Rodar as migrações automaticamente
        await db.migrate.latest();
        console.log('Migrações rodadas com sucesso!');
    } catch (err) {
        console.error('Erro ao rodar as migrações:', err);
    } finally {
        // Fecha a conexão com o banco de dados após a migração
        await db.destroy();
    }
}

// Exportar a função para uso em outros arquivos
export default runMigrations;
