import React from "react";
import { ApiDocType } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteApiDoc } from "../../Store/slice/mainApi";

interface Props {
  apiList: number;
  apiDocList: ApiDocType[];
  dispatchGetDocList: any;
}

const ApiListDetail = ({ apiList, apiDocList, dispatchGetDocList }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveApidocs = () => {
    navigate("/apidocs");
  };
  const list = apiList === 0 ? apiDocList : apiDocList;

  const dispatchDeleteDoc: any = (docId: number) => {
    dispatch(deleteApiDoc({ docId: docId })).then((res: any) => {
      if (res.payload?.status === 200) {
        dispatchGetDocList();
      }
    });
  };

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
                <FontAwesomeIcon
                  className="DeatilIcon"
                  icon={faTrash}
                  onClick={() => dispatchDeleteDoc(it.docId)}
                />
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
