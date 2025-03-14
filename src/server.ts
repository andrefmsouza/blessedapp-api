//Variaveis de ambiente
import dotenv from 'dotenv';
dotenv.config();

import express, {Request, Response} from 'express';
import path from 'path';
import cors from 'cors';

//Rotas
import rotasAPIv1 from './routes/routes';

try{

    var server = express();
    
    //CORS
    server.use(cors());
    
    //Parametros via POST
    server.use( express.urlencoded({ extended:true }) );
    server.use( express.json() );
    
    //Diretório público
    server.use( express.static( path.join(__dirname, '../../../../public' ) ) );
    
    //Rotas
    server.use('/v1/', rotasAPIv1);

    server.use("/", (req:Request, res:Response) =>{
        res.status(200);
        res.json({
            status: 'success',
            message: 'API is running'
        });
    });
    
    //404
    server.use( (req:Request, res:Response) =>{
        res.status(404);
        res.json({ status: 'error', error: 'Endpoint não encontrado.' });
    });
    
    //Inicia o servidor
    server.listen( process.env.PORT , () => console.log('Rodando em http') );
    
}catch(err){
    console.log("Error", err);
}