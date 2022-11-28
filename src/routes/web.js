import express from 'express';
import getHomePage,{getDetailPage, getCreateNewUser, getDeleteUser,getEditUser,getUpdateUse} from '../controller/homeController'
let router = express.Router();

function initWebRoute(app) {
    router.get('/', getHomePage );
    router.get('/edit-user/:id',getEditUser)
    router.get('/detail/user/:userId', getDetailPage )
    router.post('/create-new-user',getCreateNewUser)
    router.post('/delete-user/', getDeleteUser)
    router.post('/update-user',getUpdateUse)
    return app.use('/', router);
}

export default initWebRoute;
