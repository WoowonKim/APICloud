import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";
import { useAppSelector } from "../../Store/hooks";
import { selectUser } from "../../Store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ApiMainHeader = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px;
  padding-bottom: 0px;
  display: flex;
  justify-content: space-between;
`;
const Header = () => {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState("");
  const user = useAppSelector(selectUser);
  useEffect(() => {
    setUserImg(user?.imgUrl);
  }, [user]);
  return (
    <ApiMainHeader>
      {/* 로고 */}
      <img
        className="logoImg"
        src={require("../../assets/realCloudLogo.png")}
        onClick={() => {
          navigate("/");
        }}
      />

      {/* 검색창  */}
      <div className="search">
        <input className="searchbar" type="text" placeholder="   검색어를 입력하세요" />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* 사용자 프로필 */}
      <div className="user">
        <img className="userImg" src={userImg} referrerPolicy="no-referrer" />
      </div>
    </ApiMainHeader>
  );
};

export default Header;
