import React from "react";
import ApiList from "../componets/main/ApiList";
import Header from "../componets/main/Header";
import Start from "../componets/main/Start";

/**
 * Header
 * 메뉴바, 검색, 사용자 정보(프로필 사진)
 * 메뉴바 : 옆으로 슬라이드 효과, [ 내용은 아직 ] + 공통적으로 사용 할 곳
 *         메뉴바를 따로 빼야 할듯
 * 검색 : MainPage한정 ApiList 검색 시 리스트만 제공해줘도 될듯
 * 사용자 정보 : 구글 연동 시 프로필 사진 받아와서 뿌려주기
 *
 * Start
 * 스크롤 화면 꽉 채울 이미지와 구름, 생성하기 버튼
 * 이미지 구름 : 그래픽효과?
 * 생성하기 버튼 : 버튼 클릭 시 API 모달 띄어주기
 *
 * ApiList
 * 현재 활동중인 API 리스트
 */

const Main = () => {
  return (
    <div>
      <Header />
      <Start />
      <ApiList />
    </div>
  );
};

export default Main;
