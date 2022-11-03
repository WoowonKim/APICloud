import React from "react";
import { ApiDocType } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface Props {
  apiList: number;
  apiDocList: ApiDocType[];
}

const ApiListDetail = ({ apiList, apiDocList }: Props) => {
  const navigate = useNavigate();
  const moveApidocs = () => {
    navigate("/welcome");
  };
  const list = apiList === 0 ? apiDocList : apiDocList;
  
  return (
    <div className="ApiListDetail">
      {apiDocList?.map((it, idx) => (
        <div className="listContent" key={idx}>
          <p>{it.docId}</p>
          <div className="content" onClick={moveApidocs}>
            <p>{it.docName}</p>
          </div>
          <div className="userSetting">
            <div className="userSettingSub">
              <div className="member">
                <FontAwesomeIcon icon={faUser} />
                {it.groupUser.name}
              </div>
              <FontAwesomeIcon
                className="DeatilIcon"
                icon={faRightToBracket}
                onClick={moveApidocs}
              />
              {apiList === 0 ? (
                <FontAwesomeIcon className="DeatilIcon" icon={faTrash} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApiListDetail;
