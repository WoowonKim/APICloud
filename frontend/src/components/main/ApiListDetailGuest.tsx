import React from "react";
import { GuestDummy } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
interface Props {
  GuestDummy: GuestDummy[];
}
const ApiListDetailGuest = ({ GuestDummy }: Props) => {
  const navigate = useNavigate();
  const moveApidocs = () => {
    navigate("/welcome");
  };
  return (
    <div className="ApiListDetail">
      {GuestDummy.map((it, idx) => (
        <div className="listContent" key={idx}>
          <p>{it.apiTitle}</p>
          <div className="content" onClick={moveApidocs}>
            <p>{it.apiContent}</p>
          </div>
          <div className="userSetting">
            <div className="userSettingSubTwo">
              <div className="member">
                <FontAwesomeIcon icon={faUser} />
                {it.member}
              </div>
              <FontAwesomeIcon className="DeatilIcon" icon={faRightToBracket} onClick={moveApidocs} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiListDetailGuest;
