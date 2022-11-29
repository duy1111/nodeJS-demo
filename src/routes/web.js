import express from 'express';
import getHomePage, {
    getDetailPage,
    getCreateNewUser,
    getDeleteUser,
    getEditUser,
    getUpdateUse,
    getUploadFilePage,
    uploadFilePic,
    uploadMultipleFile,
} from '../controller/homeController';
let router = express.Router();
import multer from 'multer';
import path from 'path'
var appRoot = require('app-root-path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + "/src/public/image/");
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

function initWebRoute(app) {
    router.get('/', getHomePage);
    router.get('/edit-user/:id', getEditUser);
    router.get('/detail/user/:userId', getDetailPage);
    router.post('/create-new-user', getCreateNewUser);
    router.post('/delete-user/', getDeleteUser);
    router.post('/update-user', getUpdateUse);
    router.get('/upload', getUploadFilePage);
    router.post('/upload-profile-pic',upload.single('profile_pic'), uploadFilePic);
    router.post('/upload-multiple-images',upload.array('multiple_images', 10),uploadMultipleFile)
    return app.use('/', router);
}

export default initWebRoute;
