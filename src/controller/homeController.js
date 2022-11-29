import multer from 'multer';
import pool from '../config/connectDB';

async function getHomePage(req, res) {
    //logic
    let data = [];
    // pool.query('SELECT * FROM `user` ', function (err, results, fields) {
    //     //console.log(results); // results contains rows returned by server
    //     results.map((row) => {
    //         data.push({
    //             id: row.id,
    //             email: row.email,
    //             address: row.address,
    //             firstName: row.firstName,
    //             lastName: row.lastName,
    //         });
    //     });
    //     console.log(data)
    //
    // });

    const [rows, fields] = await pool.execute('SELECT * FROM `user` ');

    return res.render('index.ejs', { dataUser: rows });
}
export default getHomePage;
async function getDetailPage(req, res) {
    let id = req.params.userId;
    let [user, fields] = await pool.execute('SELECT * FROM `user` WHERE `id` = ?  ', [id]);
    return res.send(JSON.stringify(user));
}
async function getCreateNewUser(req, res) {
    console.log('check req', req.body.firstName);
    await pool.execute('INSERT INTO `user` ( `firstName`, `lastName`, `email`,`address`) VALUES (?,? ,? ,? );', [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.address,
    ]);
    return res.redirect('/');
}
async function getDeleteUser(req, res) {
    await pool.execute('delete from user where id = ? ', [req.body.userId]);
    return res.redirect('/');
}
async function getEditUser(req, res) {
    let id = req.params.id;
    let [user, fields] = await pool.execute('Select * from user where id = ?', [id]);
    return res.render('update.ejs', { dataUser: user[0] });
}
async function getUpdateUse(req, res) {
    let data = req.body;
    console.log(data);
    await pool.execute('UPDATE `user` SET `firstName` = ? , lastName = ? , email = ? , address = ?  WHERE (`id` = ?)', [
        data.firstName,
        data.lastName,
        data.email,
        data.address,
        data.id,
    ]);
    return res.redirect('/');
}
const getUploadFilePage = async (req, res) => {
    return res.render('uploadFile.ejs');
};

const upload = multer().single('profile_pic');

let uploadFilePic = async (req, res) => {
    //'profile_pic' is the name of our file input field in the HTML form
    //let upload = multer({ storage: storage, fileFilter: imageFilter }).single('profile_pic');
    console.log(req.file);
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } 
        // else if (err) {
        //     return res.send(err);
        // }

        // Display uploaded image for user validation
        res.send(
            `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`,
        );
        
    });
};
export { getDetailPage, getCreateNewUser, getDeleteUser, getEditUser, getUpdateUse, getUploadFilePage, uploadFilePic };
