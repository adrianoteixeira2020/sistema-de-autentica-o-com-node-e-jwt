import express  from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import config from './config/db_config'
import cors from 'cors'
import requireDir from 'require-dir'
//Iniciando o nosso app (Servidor Web)
const app = express();
app.use(express.json())
app.use(cors())
// Inciando a conexão com o banco de dados MongoDB.
mongoose.connect(`mongodb://${config.HOST}:${config.PORT}/${config.DB}`, {useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true})

// Importar as rotas /api/.....
app.use('/api', routes);

export default app;