const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');

//Middlewares
const guest = require('../app/middlewares/guest')
const auth = require('../app/middlewares/auth')
const admin = require('../app/middlewares/admin')
function initRoutes(app) {
      app.get('/',homeController().index);
      app.get('/contact',homeController().contact);
      app.get('/dashboard',homeController().dashboard);
      app.get('/uploads',homeController().upload);
      app.get('/favourites',homeController().favourites);

     app.get('/login',guest,authController().login);
      app.post('/login',authController().postLogin);
      app.post('/logout',authController().logout);
      app.get('/register',guest,authController().register);
      app.post('/register',authController().postRegister);
      
    
}

module.exports = initRoutes;