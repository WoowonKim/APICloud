import React, { useEffect, useRef, useState } from "react";
import Dots from "../components/welcome/Dots";
import WelcomeHeader from "../components/welcome/WelcomeHeader";
import "../components/welcome/Welcome.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const Welcome = () => {
  const DIVIDER_HEIGHT = 5;
  const outerDivRef: any = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);

  // 2번째 페이지로 이동
  const moveToPage2 = () => {
    outerDivRef.current.scrollTo({
      top: window.innerHeight + DIVIDER_HEIGHT,
      left: 0,
      behavior: "smooth",
    });
    setScrollIndex(2);
  };

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
      <WelcomeHeader scrollIndex={scrollIndex} />
      <Dots scrollIndex={scrollIndex} />
      <section className="section1">
        <img
          alt="clouds"
          src={
            scrollIndex === 1
              ? require("../assets/whiteCloud.png")
              : scrollIndex === 2
              ? require("../assets/redCloud.png")
              : require("../assets/grayCloud.png")
          }
          className="welcomeClouds"
        />
        <img
          alt="clouds"
          src={
            scrollIndex === 1
              ? require("../assets/whiteCloud.png")
              : scrollIndex === 2
              ? require("../assets/redCloud.png")
              : require("../assets/grayCloud.png")
          }
          className="welcomeClouds1"
        />
        <img
          alt="clouds"
          src={
            scrollIndex === 1
              ? require("../assets/whiteCloud.png")
              : scrollIndex === 2
              ? require("../assets/redCloud.png")
              : require("../assets/grayCloud.png")
          }
          className="welcomeClouds2"
        />
        <h1 className="title">
          A&nbsp;&nbsp;P&nbsp;&nbsp;I&nbsp;&nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;l&nbsp;&nbsp;o&nbsp;&nbsp;u&nbsp;&nbsp;d
        </h1>
        <div className="welcomeSubTitleWrapper">
          <div className="text-container">
            <div className="row">
              <span>"O</span>
              <span>f</span>
              <span>&nbsp;&nbsp;</span>
              <span>t</span>
              <span>h</span>
              <span>e</span>
              <span>&nbsp;&nbsp;</span>
              <span>D</span>
              <span>e</span>
              <span>v</span>
              <span>e</span>
              <span>l</span>
              <span>o</span>
              <span>p</span>
              <span>e</span>
              <span>r</span>
              <br></br>
              <br></br>
              <span>F</span>
              <span>o</span>
              <span>r</span>
              <span>&nbsp;&nbsp;</span>
              <span>t</span>
              <span>h</span>
              <span>e</span>
              <span>&nbsp;&nbsp;</span>
              <span>D</span>
              <span>e</span>
              <span>v</span>
              <span>e</span>
              <span>l</span>
              <span>o</span>
              <span>p</span>
              <span>e</span>
              <span>r</span>
              <br></br>
              <br></br>
              <span>B</span>
              <span>y</span>
              <span>&nbsp;&nbsp;</span>
              <span>t</span>
              <span>h</span>
              <span>e</span>
              <span>&nbsp;&nbsp;</span>
              <span>D</span>
              <span>e</span>
              <span>v</span>
              <span>e</span>
              <span>l</span>
              <span>o</span>
              <span>p</span>
              <span>e</span>
              <span>r"</span>
            </div>
          </div>
        </div>
        <div className="arrowDownIconWrapper">
          <FontAwesomeIcon
            icon={faChevronDown}
            size="3x"
            className="arrowDownIcon"
            onClick={moveToPage2}
          />
        </div>
      </section>
      <div className="divider"></div>
      <section className="section2">
        <div
          className={scrollIndex === 2 ? "introduction2Move" : "introduction"}
        >
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
        <img
          alt="createApiGIF"
          src={require("../assets/createApi.gif")}
          className={scrollIndex === 2 ? "section2GIFMove" : "section2GIF"}
        />
        <img
          alt="createApiGIF"
          src={require("../assets/mainGIF.gif")}
          className={scrollIndex === 2 ? "section2GIF2Move" : "section2GIF2"}
        />
      </section>
      <div className="divider"></div>
      <section className="section3">
        <div
          className={scrollIndex === 3 ? "introduction3Move" : "introduction"}
        >
          <div className="title">
            <p>밤샘 코딩 하지 마세요!</p>
            <p>바쁜 개발자들을 위한 API Cloud</p>
          </div>
          <div className="subTitle">
            <p>동시 편집 기능을 포함한 다양한 서비스가</p>
            <p>여러분들의 시간을 아껴줍니다.</p>
          </div>
        </div>
        <div className="startButtonsWrapper">
          <div className="startButtonWrapper">
            <div className="welcomeStartButton">
              <a href={process.env.REACT_APP_GOOGLE_OAUTH2}>
                <img
                  alt="googleLoginImage"
                  src={require("../assets/googleLogin.png")}
                  className="loginImage"
                />
              </a>
              로 시작하기
            </div>
          </div>
          <div className="startButtonWrapper">
            <div className="welcomeStartButton">
              <a href={process.env.REACT_APP_GITHUB_OAUTH2}>
                <img
                  alt="githubLoginImage"
                  src={require("../assets/githubLoginWhite.png")}
                  className="loginImage"
                />
              </a>
              으로 시작하기
            </div>
          </div>
        </div>
        <img
          alt="createApiGIF"
          src={require("../assets/section3GIF1.gif")}
          className={scrollIndex === 3 ? "section3GIFMove" : "section3GIF"}
        />
        <img
          alt="createApiGIF"
          src={require("../assets/section3GIF2.gif")}
          className={scrollIndex === 3 ? "section3GIF2Move" : "section3GIF2"}
        />
      </section>
    </div>
  );
};

export default Welcome;
