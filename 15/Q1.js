const mysql = require('mysql');
//create connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Harshal@123',
  database: 'student'

});
//connect database
connection.connect((err)=>{
  if(err){
    console.error('Error connecting: '+err.stack);
    return;
  }
  console.log('Connect as id'+ connection.threadlId);
  connection.query('SELECT * FROM student',(error,results)=>{
    if(error)throw error;
    console.log('User Data',results);
    connection.end();
  });
});