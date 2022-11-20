import React, { useEffect, useState } from "react";
import { ApiDocType } from "./ApiList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, { deleteApiDoc } from "../../Store/slice/mainApi";
import UpdateModal from "./UpdateModal";
import GroupInfoModal from "./GroupInfoModal";
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
  margin: 15px;
  border-radius: 50px;
  padding-left: 30px;
  padding-right: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
  box-shadow: 0 17px 15px -18px rgba(180, 180, 180, 1);
`;

const DocIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const DetailContent = styled.div`
  cursor: pointer;
  font-weight: bold;
`;

const ApiListDetail = ({ apiList, apiDocList, dispatchGetDocList }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpenUpdateModal = useSelector(
    (state: RootState) => state.mainApi.isOpenUpdateModal
  );
  const isGroupInfoModal = useSelector(
    (state: RootState) => state.mainApi.isGroupInfoModal
  );
  const [selectedDocItem, setSelectedDocItem] = useState(-1);
  const moveApidocs: any = (docId: number, isEdit: boolean, data?: any) => {
    dispatch(mainApiSlice.actions.setDocId({ docId: docId }));
    localStorage.setItem("docId", docId.toString());
    if (isEdit && data) {
      window.location.replace(`/createApi/${docId}`);
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

  useEffect(() => {
    setSelectedDocItem(-1);
  }, []);

  return (
    <div className="ApiListDetail">
      {isOpenUpdateModal && <UpdateModal></UpdateModal>}
      {apiList === 0 ? (
        <>
          {apiDocList?.map((it, idx) => (
            <div key={idx}>
              {it.authority === 1 ? (
                <>
                  <ListContent>
                    <DetailContent
                      onClick={() => {
                        moveApidocs(it.encryptedUrl, false);
                      }}
                    >
                      <p>{it.docName}</p>
                    </DetailContent>
                    <div className="userSetting">
                      <div className="userSettingSub">
                        {selectedDocItem === idx && isGroupInfoModal && (
                          <GroupInfoModal docId={it.docId}></GroupInfoModal>
                        )}
                        <DocIcon
                          alt="groupUserIcon"
                          src={require("../../assets/groupUserIcon.png")}
                          onClick={() => {
                            setSelectedDocItem(idx);
                            dispatch(
                              mainApiSlice.actions.setIsGroupInfoModal({
                                isGroupInfoModal: true,
                              })
                            );
                          }}
                        />
                        <DocIcon
                          alt="docSelectIcon"
                          onClick={() => moveApidocs(it.encryptedUrl, true, it)}
                          src={require("../../assets/docSelectIcon.png")}
                        />
                        <DocIcon
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
                          }}
                          src={require("../../assets/docUpdateIcon.png")}
                        />
                        <DocIcon
                          alt="docDeleteIcon"
                          onClick={() => dispatchDeleteDoc(it.docId)}
                          src={require("../../assets/docDeleteIcon.png")}
                        />
                      </div>
                    </div>
                  </ListContent>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      ) : (
        <>
          {apiDocList?.map((it, idx) => (
            <div key={idx}>
              {it.authority !== 1 ? (
                <>
                  <ListContent>
                    <DetailContent
                      onClick={() => {
                        moveApidocs(it.encryptedUrl, false);
                      }}
                    >
                      <p>{it.docName}</p>
                    </DetailContent>
                    <div className="userSettingView">
                      <div className="userSettingSub">
                        {selectedDocItem === idx && isGroupInfoModal && (
                          <GroupInfoModal docId={it.docId}></GroupInfoModal>
                        )}
                        <DocIcon
                          alt="groupUserIcon"
                          src={require("../../assets/groupUserIcon.png")}
                          onClick={() => {
                            setSelectedDocItem(idx);
                            dispatch(
                              mainApiSlice.actions.setIsGroupInfoModal({
                                isGroupInfoModal: true,
                              })
                            );
                          }}
                        />
                        <DocIcon
                          alt="docSelectIcon"
                          onClick={() => moveApidocs(it.encryptedUrl, true, it)}
                          src={require("../../assets/docSelectIcon.png")}
                        />
                      </div>
                    </div>
                  </ListContent>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ApiListDetail;
