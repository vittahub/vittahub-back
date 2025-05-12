require('dotenv').config();
const express = require('express');
const routes = require('./src/routes');
const knex = require('knex');
const app = express();

// Configuração do banco de dados
const db = knex(require('./knexfile').development);

// Função para rodar migrações e resetar o banco se necessário
async function runMigrations() {
    try {
        // Rodar as migrações automaticamente
        await db.migrate.latest();
        console.log('Migrações rodadas com sucesso!');
    } catch (err) {
        console.error('Erro ao rodar as migrações:', err);
    }
}


// Rodar migrações ao iniciar
runMigrations();

// Configuração do Express
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
