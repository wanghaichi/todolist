/**
 * Created by hardy on 17-1-4.
 */
var todoList = {
    insert  :   'INSERT INTO 3014218099_todolist(id, content, isdeleted, time, userid) VALUES (0, ?, 0, ?, ?)',
    remove  :   'update 3014218099_todolist set isdeleted=1 where id=?',
    update  :   'update 3014218099_todolist set content=? where id=?',
    queryById:  'select * from 3014218099_todolist where id=? and isdeleted = 0',
    queryAll:   'select * from 3014218099_todolist WHERE isdeleted = 0 AND userid=? order by id desc',
    queryAllFinished : 'select * from 3014218099_todolist WHERE isdeleted = 1 AND userid=? order by id desc',
    finished:   'update 3014218099_todolist set isdeleted=1 where id=?'
};
module.exports = todoList;