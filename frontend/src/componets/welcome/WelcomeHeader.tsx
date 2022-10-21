import React from 'react'
import './WelcomeHeader.scss'

const WelcomeHeader = () => {
  return (
    <header className='header'>
      <div className='container'>
        <div className='logo'>API Cloud</div>
        <div className='buttonWrapper'>
          <div className='signIn'>로그인</div>
          <div className='signUp'>회원가입</div>
        </div>
      </div>
    </header>
  )
}

export default WelcomeHeader