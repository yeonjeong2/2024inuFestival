const mysql = require('mysql');

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nayeonjeong', // mysql -u "root": root is user
    // mysql -u nayeonjeong
    password: 'abc123!', // mysql -u root -p -> "password?:" this is password 
    // mysql -u nayeonjeong -p
    // password: inu1234
    database: 'inuFestival' 
    // mysql -u nayeonjeong -p > password: inu1234 > next
    // insert command: SHOW TABLES; 
    // have nayeonjeong in table list
});

connection.connect((err) => {
    if (err) {
        console.error('MySQL 연결 오류: ', err);
        return;
    }
    console.log('MySQL에 성공적으로 연결되었습니다.');
});

module.exports = connection;