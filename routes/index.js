// express 모듈과 path 모듈 import
const express = require('express');
// 라우터 객체 생성
const router = express.Router();
const path = require('path');

//경로로 GET 요청 들어오면
// router.get('/', (req, res)=>{
//    console.log('')
//    // 해당 경로의 파일을 클라이언트에게 전송
//    // 인자로 전달된 경로들을 결합하여 새로운 경로 생성
//    // __dirname은 현재파일 위치한 디렉토리 경로
//    // res.sendFile(path.join(__dirname,'..','','','index.html'))
// })

// 라우터 객체를 모듈로 내보냄
module.exports = router;