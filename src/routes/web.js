import express from 'express';
import getHomePage,{getDetailPage} from '../controller/homeController'
let router = express.Router();

function initWebRoute(app) {
    router.get('/', getHomePage );
    router.get('/home', (req, res) => {
        res.send('Home!');
    });
    router.get('/detail/user/:userId', getDetailPage )
    return app.use('/', router);
}

export default initWebRoute;
