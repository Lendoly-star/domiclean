const mysql= require('mysql2');

const sqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});

const mysqlConnect = ()=>{
    sqlConnection.connect(err =>{
        if(err){
            console.error('MYSQL connection error', err);
            return;
        }
        console.log('MYSQL connected');
    })
}

module.exports = {
    mysqlConnect,
    sqlConnection
}