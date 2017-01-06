/**
 * Created by hardy on 17-1-6.
 */
var user = {
    insert  :   'INSERT INTO 3014218099_user(id, username, password) VALUES (0, ?, ?)',
    queryByName:  'select * from 3014218099_user where username=? ',
    checkLogin: 'select * from 3014218099_user where username=? AND password=?'
};
module.exports = user;