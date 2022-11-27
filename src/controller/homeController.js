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
async function getDetailPage(req, res){
    let id = req.params.userId;
    let [user,fields] = await pool.execute('SELECT * FROM `user` WHERE `id` = ?  ',[id])
    return res.send(JSON.stringify(user))
}

export {getDetailPage} ;
