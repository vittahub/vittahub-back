import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import routes from './src/routes';
import runMigrations from './src/migrations'; // Importar a função de migração

const app: Application = express();

// Configuração de producao
if (process.env.NODE_ENV === 'production') {
    runMigrations();
}
const corsOptions = process.env.NODE_ENV === 'production' ? {
    origin: 'https://vittahub.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
} : {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Aplicar o middleware de CORS
app.use(cors(corsOptions));

// Configuração do Express
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
