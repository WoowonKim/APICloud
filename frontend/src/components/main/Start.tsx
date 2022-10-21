import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
const Start = () => {
  return (
    <div className="start">
      <div className="startMain">
        <div className="startText">
          <span>쉽고 간단하게 API 명세서를 작성해보세요</span>
          <button>생성하기</button>
        </div>
        <div>
          <img className="startImg" src={require("../../assest/ApiCloud.png")} />
        </div>
      </div>
    </div>
  );
};

export default Start;
