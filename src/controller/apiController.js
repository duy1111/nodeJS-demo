import pool from '../config/connectDB';
async function getAllUser(req, res) {
    let [user, fields] = await pool.execute('SELECT * FROM `user` ');
    return res.status(200).json({
        message: 'ok',
        data: user,
    });
}
let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    console.log(req.body);
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params',
        });
    }
    await pool.execute('INSERT INTO `user` ( `firstName`, `lastName`, `email`,`address`) VALUES (?,? ,? ,? );', [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.address,
    ]);
    return res.status(200).json({
        message: 'ok',
    });
};
let updateUser = async (req, res) => {
    let data = req.body;
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params',
        });
    }
    await pool.execute('UPDATE `user` SET `firstName` = ? , lastName = ? , email = ? , address = ?  WHERE (`id` = ?)', [
        data.firstName,
        data.lastName,
        data.email,
        data.address,
        data.id,
    ]);
    return res.status(200).json({
        message:'ok',
    })
};
let deleteUser = async(req,res) =>{
    let id =req.params.id
    if (!id) {
        return res.status(200).json({
            message: 'missing required params',
        });
    }
    await pool.execute('delete from user where id = ? ',[id])
    return res.status(200).json({
        message:'ok',
    })
}
export default getAllUser;
export { createNewUser,updateUser,deleteUser };
