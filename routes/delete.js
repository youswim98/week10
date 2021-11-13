import express from "express" ;
import { deleteSql, selectSql, updateSql } from "../database/sql";

const router = express.Router();

router.get('/', async (req, res) => {
    //"/delete"로 get요청이 들어오면 아래를 실행한다.
    const department = await selectSql.getDepartment();
    //slq.js의 selectSql모듈의 getDepartment함수를 사용한다.
    //함수의 결과물을 department에 담는다.
    //deaprtment에는 JSON array가 담긴다.

    res.render('delete', {
        //delete.hbs를 렌더링한다.
        title:"삭제 기능",
        department
        //title, department변수를 hbs파일에 넘겨준다.
    })
});

router.post('/', async (req, res) => {
    //"/delete"로 post요청이 들어오면 아래를 실행한다.
    const data ={
        Dnumber:  req.body.delBtn,
    };
    //data라는 JSON을 만든다. 
    //key 이름은 Dnumber, value는 클라이언트에서 넘겨준 delBtn이 된다.
    
    await deleteSql.deleteDepartment(data);
    //sql.js의 deleteSql모듈의 deleteDepartment함수를 실행한다.

    res.redirect('/delete');
    //"/delete"로 redirect한다.
});

module.exports = router;
