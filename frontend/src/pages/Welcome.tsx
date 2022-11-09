import React, { useEffect, useRef, useState } from "react";
import Dots from "../components/welcome/Dots";
import WelcomeHeader from "../components/welcome/WelcomeHeader";
import "../components/welcome/Welcome.scss";

const Welcome = () => {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef: any = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);

  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop }: any = outerDivRef.current; // 스크롤 위쪽 끝 부분
      const pageHeight = window.innerHeight; // 화면 세로 길이, 100vh

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1 페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2 페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else {
          // 현재 3 페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        }
      }
    };
    const outerDivRefCurrent: any = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

  return (
    <div ref={outerDivRef} className="outer">
      <WelcomeHeader />
      <Dots scrollIndex={scrollIndex} />
      <section className="section1">
        <h1 className="title">
          A&nbsp;&nbsp;P&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;l&nbsp;&nbsp;o&nbsp;&nbsp;u&nbsp;&nbsp;d
        </h1>
        <div className="subTitleWrapper">
          <p>"Of the Developer</p>
          <p>&nbsp;&nbsp;&nbsp;For the Developer</p>
          <p>&nbsp;&nbsp;&nbsp;By the Developer"</p>
        </div>
        <div className="startButtonWrapper">
          <div className="startButton">시작하기</div>
        </div>
      </section>
      <div className="divider"></div>
      <section className="section2">
        <div className="introduction">
          <div className="title">
            <p>API 문서만 입력하세요!</p>
            <p>나머지는 API Cloud가 만듭니다!</p>
          </div>
          <div className="subTitle">
            <p>API 문서 작성 시</p>
            <p>개발을 위한 기본 틀을 자동 생성해줍니다.</p>
            <p>반복되는 귀찮은 초기 작업을 API Cloud로 작업해보세요.</p>
          </div>
        </div>
      </section>
      <div className="divider"></div>
      <section className="section3">
        <div className="introduction">
          <div className="title">
            <p>밤샘 코딩 하지 마세요!</p>
            <p>바쁜 개발자들을 위한 API Cloud</p>
          </div>
          <div className="subTitle">
            <p>동시 편집 기능을 포함한 다양한 서비스가</p>
            <p>여러분들의 시간을 아껴줍니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
