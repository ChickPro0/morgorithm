const express = require('express');
const path = require('path')
const app = express();
const userRouter = require('./routes/user')
const indexRouter= require('./routes')

// COPS 이슈 해결
app.use(express.json());
const cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 3001);

app.use('/', indexRouter)
app.use('/user', userRouter)


app.get('/', (req,res)=>{
    res.send('환영합니다.')
})


// 서버 잘 동작하고 있는지 확인
app.listen(app.get('port'), ()=>{
    console.log('port waiting')
})


