import userModel from "../models/user_model";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

const user = userModel;

const signUser = async (req, res) => {
  try {
    const { email } = req.body; // Email enviado
    const { password } = req.body;// Senha Enviada
    const auth = await user.findOne({ email }).select("+password"); // Verifique o usuário (se já existe) por meio do email;
    if (!auth) return res.status(400).send({ error: "User not found" }); // Se já existir envie um erro

    if (!(await bcrypt.compare(password, auth.password))) return res.status(400).send({error: 'Invalid password'}); // compare as senhas e verifique a incriptação e não bater => retorne erro
    // Criar o token de autenticação
    const token = jwt.sign({ id: auth._id }, authConfig.secret, {
        expiresIn: 86400,
    })
    res.send({auth, token})
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    // Tirar do nosso corpo da requisição os dados necessários para a criação do usuário.
    const { firstName } = req.body;
    const { lastName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    // Variáveis mais dinâmicas
    const full_name = `${firstName} ${lastName}`;
    const verify_user_existence = await user.findOne({ email });
    if (verify_user_existence)
      return res.status(400).send({ error: "User alredy exists" });
    else {
      const register = await user.create({
        // Vamos inserir aqui os dados da criação do usuário
        full_name,
        email,
        password,
        username: firstName,
      });
    }
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export default { signUser, registerUser };
