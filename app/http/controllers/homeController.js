
function homeController(){
    return {
       async index (req, res) {
            
            res.render('home',);
            
        },
        async dashboard (req, res) {
            
            res.render('dashboard',);
            
        },
        async contact (req, res) {
            
            res.render('contact',);
            
        },
        async upload (req, res) {
            
            res.render('uploads',);
            
        },
        async favourites (req, res) {
            
            res.render('favourites',);
            
        }

    }
}

module.exports = homeController;