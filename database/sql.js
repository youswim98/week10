import mysql from "mysql2";

const pool = mysql.createPool(
    process.env.JAWSDB_URL ?? {
        host: 'localhost',
        user: 'root',
        database: 'week10',
        password: '12171809',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

const promisePool = pool.promise();
//export를 하면 외부에서 이걸 끌어다가 사용할 수 있음
export const selectSql = {
    getUsers : async () => {
        const [rows] = await promisePool.query(`select * from user`);
        //데이터베이스에 쿼리를 전달하고 전달받은 데이터를 배열로 묶어서 return한다.
        return rows
    },

    getDepartment : async () => {
        const [rows] = await promisePool.query('select * from department');
        //getUsers함수와 같다.
        return rows
    },

    getSubject : async () => {
        const [rows] = await promisePool.query('select * from subject');
        return rows
    }
}

export const deleteSql = {
    deleteDepartment : async (data) => {
        console.log('deleteSql.deleteDepartment:',data.Dnumber);
        //삭제하려는 department의 데이터가 잘 넘어왔는지 확인하기위해서 콘솔에 출력한다.
        const sql=`delete from department where Dnumber = ${data.Dnumber}`;
        //넘어온 변수를 포함한 sql문을 작성한다.
        await promisePool.query(sql);
        //작성한 sql문을 db에 전달한다.
    },

    deleteSubject : async (data) => {

        console.log('delete_subSql.deleteSubject:',data.sub_id);
        //삭제하려는 department의 데이터가 잘 넘어왔는지 확인하기위해서 콘솔에 출력한다.
        const sql=`delete from subject where sub_id = '${data.sub_id}'`;
        //넘어온 변수를 포함한 sql문을 작성한다.
        await promisePool.query(sql);
        //작성한 sql문을 db에 전달한다.
    },

}