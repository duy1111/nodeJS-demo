import express from 'express';
import getAllUser ,{createNewUser,updateUser,deleteUser} from '../controller/apiController'
let router = express.Router();

function initApiRoute(app) {
    router.get('/users', getAllUser)
    router.post('/create-user',createNewUser)
    router.put('/update-user',updateUser)
    router.delete('/delete-user',deleteUser)
    return app.use('/api/v1/', router);

}

export default initApiRoute;
