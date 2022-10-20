import React from 'react'
import WelcomeHeader from '../components/NavFooter/WelcomeHeader'
import './Welcome.scss'

const Welcome = () => {
  return (
    <div>
      <WelcomeHeader />
      <section className='section1'>
        <h1 className='title'>A&nbsp;&nbsp;P&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;l&nbsp;&nbsp;o&nbsp;&nbsp;u&nbsp;&nbsp;d</h1>
        <div className='subTitleWrapper'>
          <p>"Of the Developer</p>
          <p>&nbsp;&nbsp;&nbsp;For the Developer</p>
          <p>&nbsp;&nbsp;&nbsp;By the Developer"</p>
        </div>
        <div className='startButtonWrapper'>
          <div className='startButton'>시작하기</div>
        </div>
      </section>
      <section className='bridge'></section>
      <section className='section2'>
        <div className='introduction'>
          <div className='title'>
            <p>API 문서만 입력하세요!</p>
            <p>나머지는 API Cloud가 만듭니다!</p>
          </div>
          <div className='subTitle'>
            <p>API 문서 작성 시</p>
            <p>개발을 위한 기본 틀을 자동 생성해줍니다.</p>
            <p>반복되는 귀찮은 초기 작업을 API Cloud로 작업해보세요.</p>
          </div>
        </div>
      </section>
      <section className='bridge'></section>
      <section className='section3'>

      </section>
    </div>
  )
}

export default Welcome
