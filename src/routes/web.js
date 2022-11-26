import express from 'express';
import getHomePage from '../controller/homeController'
let router = express.Router();

function initWebRoute(app) {
    router.get('/', getHomePage );
    router.get('/home', (req, res) => {
        res.send('Home!');
    });

    return app.use('/', router);
}

export default initWebRoute;
