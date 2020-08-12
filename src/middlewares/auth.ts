import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

const auth = async (req:any, res:any, next:any) => {
  var token = req.headers['access-token'];

  //Verifica se o token está no cabeçalho da requisicao
  if (!token) 
    return res.status(401).json({ auth: false, message: 'Nenhum token de autenticação.' });
  
  const secret: string = (process.env.SECRET as string);

  //valida o token
  jwt.verify(token, secret, function(err:any, decoded: any) {
    //Caso tenha algum erro na validaçao do token
    if (err) 
      return res.status(500).json({ auth: false, message: 'Token inválido.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.body.USERID = decoded.id;
    next();
  });
};

export default auth;