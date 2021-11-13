import express from "express" ;
import { deleteSql, selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/', async (req, res) => {
    const subject = await selectSql.getSubject();
    console.log(subject);
    res.render('delete_sub.hbs', {
        title:"삭제 기능",
        subject
        //title, department변수를 hbs파일에 넘겨준다.
    })
});

router.post('/', async (req, res) => {
    //"/delete"로 post요청이 들어오면 아래를 실행한다.
    const data ={
        sub_id:  req.body.sub_id,
    };
    //data라는 JSON을 만든다. 
    //key 이름은 Dnumber, value는 클라이언트에서 넘겨준 delBtn이 된다.
    
    await deleteSql.deleteSubject(data);
    //sql.js의 deleteSql모듈의 deleteDepartment함수를 실행한다.

    res.redirect('/delete_sub');
    //"/delete"로 redirect한다.
});

module.exports = router;
