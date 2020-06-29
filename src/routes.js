import express from 'express'
// importando os nossos controllers
import user_controller from './controllers/user_controller';
import stores_controller from './controllers/stores_controller'
import authMiddleware from './config/middlewares/auth'
const routes = express.Router();

// Expondo as nossas rotas (ou endpoints);
routes.get('/',(req, res) => res.send('<h2>Bem-vindo a Nossa API</h2>')) // Rota Principal

// Rotas com operções de usuário
routes.post('/user/register', user_controller.registerUser) // Registo de Novos usuários
routes.post('/user/authentication', user_controller.signUser) // Rota de autenticação de usuário (ou seja o login)

// Rota de Lojas 
routes.use(authMiddleware).get('/stores', stores_controller._index) // Retorna lista de lojas

export default routes;