import express from 'express';
import auth from './middlewares/auth';

import UsersController from './controllers/UsersController';
import SketchesController from './controllers/SketchesController';

const routes = express.Router();
const usersController = new UsersController();
const sketchesController = new SketchesController();

routes.get('/', function(req, res){
    res.status(200).json( {} );
});

//routes.get('/users', usersController.index);
routes.get('/confirmation', usersController.confirmation);
routes.post('/register', usersController.register);
routes.post('/forgot_password', usersController.forgot_password);
routes.post('/reset_password', usersController.reset_password);
routes.post('/login', usersController.login);
routes.get('/me', auth, usersController.me);


routes.get('/sketches', auth, sketchesController.all);
routes.get('/sketches/:id', auth, sketchesController.once);



export default routes;