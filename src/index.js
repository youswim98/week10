import express from "express";
import logger from "morgan";
import path from "path";
//모듈 import

import loginRouter from "../routes/login.js" //홈화면
import selectRouter from "../routes/select.js" //수정
import deleteRouter from "../routes/delete.js"//조회
import delete_subRouter from "../routes/delete_sub.js"

const PORT = 8080;

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')

app.use(logger("dev"));

app.use('/', loginRouter); // "/"으로 접속하면 login.js내부의 내용을 사용한다.
app.use('/select', selectRouter); // "/select"으로 접속하면 select.js의 내용을 사용한다.
app.use('/delete', deleteRouter); // "/delete"로 접속하면 delete.js의 내용을 사용한다.
app.use('/delete_sub', delete_subRouter);

app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})
