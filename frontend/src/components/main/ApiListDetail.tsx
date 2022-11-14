import React from "react";
import { ApiDocType } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, { deleteApiDoc } from "../../Store/slice/mainApi";
import UpdateModal from "./UpdateModal";
import { RootState } from "../../Store/store";
import styled from "styled-components";

interface Props {
  apiList: number;
  apiDocList: ApiDocType[];
  dispatchGetDocList: any;
}
const ListContent = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.listBgColor};
  color: black;
  margin: 5px;
  border-radius: 10px;
  padding-left: 23px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ApiListDetail = ({ apiList, apiDocList, dispatchGetDocList }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpenUpdateModal = useSelector(
    (state: RootState) => state.mainApi.isOpenUpdateModal
  );

  const moveApidocs: any = (docId: number, isEdit: boolean, data?: any) => {
    dispatch(mainApiSlice.actions.setDocId({ docId: docId }));
    localStorage.setItem("docId", docId.toString());
    if (isEdit && data) {
      navigate(`/createApi/${docId}`, { state: { data: data } });
    } else {
      navigate(`/apiDocs/${docId}`);
    }
  };
  const list = apiList === 0 ? apiDocList : apiDocList;

  const dispatchDeleteDoc: any = (docId: number) => {
    dispatch(deleteApiDoc({ docId: docId })).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatchGetDocList();
      }
    });
  };
  const nBB = `&nbsp &nbsp`;

  return (
    <div className="ApiListDetail">
      {isOpenUpdateModal && <UpdateModal></UpdateModal>}
      {apiDocList?.map((it, idx) => (
        <ListContent key={idx}>
          <p>{it.docId}</p>
          <div
            className="content"
            onClick={() => {
              moveApidocs(it.encryptedUrl, false);
            }}
          >
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
                onClick={() => moveApidocs(it.encryptedUrl, true, it)}
              />
              {apiList === 0 ? (
                <>
                  <FontAwesomeIcon
                    className="DeatilIcon"
                    icon={faPenToSquare}
                    onClick={() => {
                      dispatch(
                        mainApiSlice.actions.setIsOpenUpdateModal({
                          isOpenUpdateModal: true,
                        })
                      );
                      dispatch(
                        mainApiSlice.actions.setEncryptedUrl({
                          encryptedUrl: it.encryptedUrl,
                        })
                      );
                      dispatch(
                        mainApiSlice.actions.setDocId({ docId: it.docId })
                      );
                      console.log("ApiListDetail DocId => ", it.docId);
                    }}
                  />
                  <FontAwesomeIcon
                    className="DeatilIcon"
                    icon={faTrash}
                    onClick={() => dispatchDeleteDoc(it.docId)}
                  />
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </ListContent>
      ))}
    </div>
  );
};

export default ApiListDetail;
