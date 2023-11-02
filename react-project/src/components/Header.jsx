import { useState, useEffect } from "react";
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import React from "react";
import "../components/Header.css";
import aronWhite from "../image/aronWhite.png";
import iconLogout from "../image/iconLogout.svg"

// 임시 데이터 (axios 후 삭제 예정)
const User = {
  id: '20231031',
  pw: 'test1031!',
  name: '정혜빈',
  job: '의사'
}

const Header = () => {

  // job, name 상태 업데이트하는 state
  const [job, setJob] = useState('');
  const [name, setName] = useState('');

  // 자동 로그아웃을 위한 state ,초 단위로 60분 설정 (즉, 초기값을 3600초로 설정)
  // time은 로그아웃까지 남은시간을 저장하는 상태
  const [time, setTime] = useState(60 * 60);
  const navigate = useNavigate();

  // 컴포넌트 렌더링 될 때마다 특정 작업 수행
  useEffect(()=>{
    const fetchData = async () => {
      try {
        // const response = await axios.get('/api/user(API요청임시주소)');
        // setJob(response.data.job);
        // setName(response.data.name);
        setJob(User.job);
        setName(User.name);
      } catch (error) {
        console.error('데이터 불러오기 실패', error)
      }
    };
    fetchData();
    // 빈 배열 --> 처음 렌더링 될 때만 실행
  },[])

  // setInterval --> 첫 번째 인자로 전달된 함수를 두 번째 인자로 전달된 시간 간격마다 반복 실행
  // 1초마다 남은 시간 감소 
  useEffect(()=>{
    const timerId = setInterval(()=>{
      setTime(prevTime => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId) // 컴포넌트 언마운트 시 타이머 제거
    }
  }, []);

  useEffect(()=>{
    if(time === 0){
      // time 상태가 0 이되면 로그아웃 처리되는 로직 작성하기
      alert('로그아웃 되었습니다');
    }
  },[time]);

  // formatTime --> 초 단위로 표현된 시간을 mm:ss형식의 문자열로 변환하는 함수
  const formatTime = (time) => {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    // minutes가 10보다 작으면 앞에 0을 붙여서 '01', '02' 이런식으로 표기, 10보다 크면 그대로 표기
    // seconds도 마찬가지
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  // try-catch --> try부분에서 오류가 발생하면 catch 부분으로 이동해서 오류를 처리함
  // 프로그램의 예기치 않은 중단을 방지
  const onClickLogout = async () => {
    try {
      // 서버에 logout 요청을 보냄
      // await --> 비동기 작업이 완료될 때까지 기다림
      // axios.post --> 서버에 POST 요청을 보내는 함수
      // '/logout'은 요청을 보낼 주소

      const response = await axios.post('/logout');

      //  HTTP 상태코드 200은 요청이 성공적으로 처리되었음을 의미
      if (response.status === 200) {
        alert('로그아웃 되었습니다')
        navigate('/login') // 로그인 창으로 이동
      } else {
        // new Error('메시지') --> '메시지'라는 오류 메시지를 가진 Error를 생성해서 던져서 오류를 발생시킴
        // 이 코드가 실행되면, 이후의 코드는 실행되지 않고, 가장 가까운 catch블록으로 제어가 이동함
        throw new Error('로그아웃 요청 실패')
      }
    } catch (error) {
      alert('로그아웃 실패')
    }
  };


  return (
    <div className="header-page">
      <div className="header-content">
        <img src={aronWhite} alt="로고" className="header-logo" />
        <ul>
          <li>
            <span>담당{job} [{name}]</span>
          </li>
          <li>
            <span className="login-time">{formatTime(time)}</span>
          </li>
          <li>
            <div className="logout-wrapper" onClick={onClickLogout}>
              {/* <span className="logout-content" onClick={onClickalertLogout}>로그아웃</span> */}
              <span className="logout-content">로그아웃</span>
              <button className="icon-logout-wrap"><img src={iconLogout} className="icon-logout"></img></button>
            </div>
          </li>
          {/* <li>
            <button className="icon-logout-wrap"><img src={iconLogout} className="icon-logout"></img></button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;