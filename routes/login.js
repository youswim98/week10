import express from "express";
import {insertSql, selectSql} from "../database/sql";

const router = express.Router();

router.get('/',(req, res) => { //"/"으로 get요청이 들어오면 login.hbs를 내려준다.
    res.render('login.hbs');
});

router.post('/', async (req,res)=>{
    //"/"으로 post요청이 들어오면 아래를 실행한다.
    const vars = req.body;
    //post로 받아온 JSON Object를 vars에 저장한다.
    const users = await selectSql.getUsers();
    //sql.js파일에 있는 selectSql모듈에 있는 getUsers함수를 실행한다.
    //실행해서 받아온 데이터를 users에 담는다
    //받아온 데이터는 JSON array형태로 들어온다.

    let whoAmI = '';
    let checkLogin = false;

    users.map((user) => {
        //users의 각 데이터(=user)에 대해서 아래의 내용을 실행함.
        if(vars.id === user.Id && vars.password === user.Password){
            //클라이언트에서 받은 id와 password가 db에서 꺼내온 것과 같다면,
            checkLogin = true;
            //login에는 true로 기록.
            if(vars.id === 'admin'){
                whoAmI = 'admin'
                //클라이언트에서 넘겨받은 id가 'admin'이면,
                //whoAmI에 'admin'이라고 기록.
            }
            else{
                //클라이언트에서 넘어온 id가 'admin'이 아니라면,
                    whoAmI = 'user';
                //whoAmI에는 그냥 'user'라고 기록.
            }
        }
    })

    console.log('whoami : ', whoAmI);
    //콘솔에 현재 로그인한 사용자가 누구인지 출력.

    if(checkLogin && whoAmI === 'admin'){
        //checkLogin이 true이고, whoAmI가 'admin'이라면
        res.redirect('/delete');
        //"/delect"로 redirect 시킨다.
    }
    else if(checkLogin && whoAmI === 'user'){
        //checkLogin이 true이고, whoAmI가 'user'라면,
        res.redirect('/select')
        //"/select"로 redirect한다.
    }
    else{
        //login에 실패했다면
        console.log('login falied!');
        //콘솔에 "login failed!"출력하고
        res.send("<script>alert('로그인에 실패했습니다.'); location.href='/';</script>");
        //클라이언트에 로그인 실패했다는 알림을 전송한다.
    }
});
module.exports = router;