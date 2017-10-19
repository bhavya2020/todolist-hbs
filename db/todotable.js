const mysql =require('mysql2');
const config=require('../config.json');
const dbconfig={
    host:config.DB.host,
    database:config.DB.database,
    user:config.DB.user,
    password:config.DB.password
};

exports.addtodo= function insertTodo(task,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select max(od) i from todo;`,
        (err,rows)=>{
            if(err) throw err;
            let mi =rows[0].i;
            if(mi !=null) {
                conn.query(
                    `insert into todo(od,task,done) values (?,?,false);`,
                    [mi+1, task],
                    (err) => {
                        if (err) throw err;
                        cb();
                    }
                )
            }else {
                conn.query(
                    `insert into todo(od,task,done) values (1,?,false);`,
                    [task],
                    (err) => {
                        if (err) throw err;
                        cb();
                    }
                )

            }
        }
    )

};
function selectTodo(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select id from todo order by od;`,
        (err,rows) =>{
            if(err) throw err;
            if(rows.length==0)
                cb(rows);
            for(let index in rows)
            {
             conn.query(
                 `update todo set od= ? where id=? `,
                 [parseInt(parseInt(index)+1),rows[index].id],
                 (err) =>{
                     if(err)
                         throw err;
                     if(index==rows.length-1)
                     {
                         conn.query(
                             `select * from todo order by od;`,
                             (err,rows) =>{
                                 if(err) throw err;
                                 cb(rows);
                     }
                         )
                     }
                 }
             )
            }
        }
    )};

function deleteTodo(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `delete from todo where od = ?;`,
        [id],
        (err) =>{
            if(err) throw err;
            cb();
        });
}

exports.delete=function deletion(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `delete from todo  where done=true;`,
        (err) =>{
            if(err) throw err;
           cb();
        }
    )
};
exports.checktodo=function checkTodo(id,cb) {
    console.log(id);
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todo set done=true where od = ? ;`,
        [id],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};
exports.unchecktodo=function uncheckTodo(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todo set done=false where od = ? ;`,
        [id],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};
exports.up=function up(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todo set od=0 where od = ?;`,
        [id-1],
        (err) => { if(err)
            throw err;
           }
    );

    conn.query(
        `update todo set od=od-1 where od = ?;`,
        [id],
        (err) => { if(err)
            throw err;
            }
    );
    conn.query(
        `update todo set od=? where od = 0;`,
        [id],
        (err) => { if(err)
            throw err;
            cb();
        }
    );

};

exports.down=function down(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todo set od=0 where od = ?;`,
        [parseInt(id)+1],
        (err) => { if(err)
            throw err;
        }
    );

    conn.query(
        `update todo set od=od+1 where od = ?;`,
        [id],
        (err) => { if(err)
            throw err;
        }
    );
    conn.query(
        `update todo set od=? where od = 0;`,
        [id],
        (err) => { if(err)
            throw err;
            cb();
        }
    );

};
exports.deletetodo=deleteTodo;
exports.showtodo=selectTodo;