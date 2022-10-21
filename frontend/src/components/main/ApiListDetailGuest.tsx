import React from "react";
import { GuestDummy } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
interface Props {
  GuestDummy: GuestDummy[];
}
const ApiListDetailGuest = ({ GuestDummy }: Props) => {
  return (
    <div className="ApiListDetail">
      {GuestDummy.map((it, idx) => (
        <div className="listContent" key={idx}>
          <p>{it.apiTitle}</p>
          <p>{it.apiContent}</p>
          <div className="userSetting">
            <div className="userSettingSubTwo">
              <div className="member">
                <FontAwesomeIcon icon={faUser} />
                {it.member}
              </div>
              <FontAwesomeIcon className="DeatilIcon" icon={faRightToBracket} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiListDetailGuest;
