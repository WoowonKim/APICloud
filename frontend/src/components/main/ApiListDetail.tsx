import React from "react";
import { ManagerDummy } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
  ManagerDummy: ManagerDummy[];
}

const ApiListDetail = ({ ManagerDummy }: Props) => {
  return (
    <div className="ApiListDetail">
      {ManagerDummy.map((it, idx) => (
        <div className="listContent" key={idx}>
          <p>{it.apiTitle}</p>
          <p>{it.apiContent}</p>
          <div className="userSetting">
            <div className="userSettingSub">
              <div className="member">
                <FontAwesomeIcon icon={faUser} />
                {it.member}
              </div>
              <FontAwesomeIcon className="DeatilIcon" icon={faTrash} />
              <FontAwesomeIcon className="DeatilIcon" icon={faRightToBracket} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiListDetail;
