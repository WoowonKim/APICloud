import React from "react";
import { GuestDummy, ManagerDummy } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  ManagerDummy: ManagerDummy[];
  GuestDummy: GuestDummy[];
  ApiList: number;
}

const ApiListDetail = ({ ManagerDummy, GuestDummy, ApiList }: Props) => {
  const navigate = useNavigate();
  const moveApidocs = () => {
    navigate("/welcome");
  };
  const list = ApiList === 0 ? ManagerDummy : GuestDummy;
  return (
    <div className="ApiListDetail">
      {list?.map((it, idx) => (
        <div className="listContent" key={idx}>
          <p>{it.apiTitle}</p>
          <div className="content" onClick={moveApidocs}>
            <p>{it.apiContent}</p>
          </div>
          <div className="userSetting">
            <div className="userSettingSub">
              <div className="member">
                <FontAwesomeIcon icon={faUser} />
                {it.member}
              </div>
              <FontAwesomeIcon className="DeatilIcon" icon={faRightToBracket} onClick={moveApidocs} />
              {ApiList == 0 ? <FontAwesomeIcon className="DeatilIcon" icon={faTrash} /> : <div></div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiListDetail;
