/* user와 관련된 Router 모음 
- DB와 연결 기능
- 기능 : 회원가입, 아이디 중복체크, 로그인 , 회원탈퇴, 로그아웃, 회원검색 등
- 작성자 : 서혜림 (23.10.31)
*/

const express = require('express');
const router = express.Router();
// 이 경로에 있는 데이터베이스 연결 모듈 가져옴
const conn = require('../config/database');



module.exports = router;