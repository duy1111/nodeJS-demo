import connection from '../config/connectDB';

function getHomePage(req, res) {
    //logic
    let data = [];
    connection.query('SELECT * FROM `user` ', function (err, results, fields) {
        //console.log(results); // results contains rows returned by server
        results.map((row) => {
            data.push({
                id: row.id,
                email: row.email,
                address: row.address,
                firstName: row.firstName,
                lastName: row.lastName,
            });
        });
        console.log(data)
        return res.render('index.ejs', { dataUser: data });
    });
    
    
}

export default getHomePage;
