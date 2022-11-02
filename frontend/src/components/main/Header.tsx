import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slice/userSlice";

const Header = () => {
  const [userImg, setUserImg] = useState("");
  const user = useAppSelector(selectUser);
  useEffect(() => {
    setUserImg(user?.imageUrl);
  }, [user]);
  return (
    <div className="header">
      {/* 메뉴바*/}
      <div className="side">
        <FontAwesomeIcon className="barsIcon" icon={faBars} />
      </div>

      {/* 로고 */}
      <img className="logoImg" src={require("../../assets/cloud.png")} />

      {/* 검색창  */}
      <div className="search">
        <input
          className="searchbar"
          type="text"
          placeholder="   검색어를 입력하세요"
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {/* 사용자 프로필 */}
      <div className="user">
        <img className="logoImg" src={userImg} referrerPolicy="no-referrer" />
      </div>
    </div>
  );
};

export default Header;
