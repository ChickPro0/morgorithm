import React from 'react'
import './AdminScoreModal.css'
import X from '../image/X.png'
import { useState } from 'react'

const AdminScoreModal = ({ closeModal }) => {

  const [scoreModal, setScoreModal] = useState(true);

  const xIconClick = () => {
    setScoreModal(false);
    console.log('clicked')
  };

  if(!scoreModal) {
    return null;
  }

  return (
    <div className='admin-score-modal'>
        <div className="x-button-wrap">
            <button className='x-button' onClick={xIconClick}><img src={X} alt="닫기버튼" className='x-button-img'/></button>
        </div>
            <div className="admin-score-modal-content">
            <span className='admin-score-modal-title'>패혈증 의심 수치 설정</span>
            <div className="modal-score-set">
                <input type="text" className='score-box' />
                <span className='score-box-text'>점 이상</span>
            </div>
            <button className='admin-score-modal-confirm'>확인</button>
        </div>
    </div>
  )
}

export default AdminScoreModal