import express from "express" ;
import { selectSql } from "../database/sql";
//사용자가 만든 모듈을 불러올 때, 중괄호를 쓴다.


const router = express.Router();

router.get('/', async function(req, res) {

    const department = await selectSql.getDepartment();
    //slq.js의 selectSql모듈의 getDepartment함수를 실행한다.
    //department의 모든 record가 department에 JSON Array형태로 담긴다.
    res.render('select.hbs',{
        title:'IT 공대',
        department
    });
    //select.hbs에 title과 department를 넘겨주고 렌더링한다.
});

module.exports = router;
