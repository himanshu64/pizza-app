const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');

const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');

//Middlewares
const guest = require('../app/middlewares/guest')
const auth = require('../app/middlewares/auth')
const admin = require('../app/middlewares/admin')
function initRoutes(app) {
      app.get('/',homeController().index);
      app.get('/login',guest,authController().login);
      app.post('/login',authController().postLogin);
      app.post('/logout',authController().logout);
      app.get('/register',guest,authController().register);
      app.post('/register',authController().postRegister);
      app.get('/cart', cartController().index);
      app.post('/update-cart', cartController().update);

      //Customer orders
      app.post('/orders',auth, orderController().store);
      app.get('/customer/orders',auth, orderController().index);

      //Admin Routes
      app.get('/admin/orders',admin, adminOrderController().index);
    
}

module.exports = initRoutes;