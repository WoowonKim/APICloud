import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { userDummy } from "./ListDummy";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, {
  setApiDoc,
  updateApiDoc,
} from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";

const Modal = () => {
  const [docsName, setDocsName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [contextUri, setContextUri] = useState("");
  const [javaVersion, setJavaVersion] = useState(0);
  const [springVersion, setSpringVersion] = useState("");
  const [buildManagement, setBuildManagement] = useState(0);
  const [groupPackage, setGroupPackage] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packaging, setPackaging] = useState(0);
  const [encryptedUrl, setEncryptedUrl] = useState("");

  const docId = useSelector((state: RootState) => state.mainApi.docId);
  const isOpenModal = useSelector(
    (state: RootState) => state.mainApi.isOpenModal
  );

  const dispatch = useDispatch();

  const canGoNext =
    docsName &&
    serverUrl &&
    contextUri &&
    javaVersion &&
    springVersion &&
    buildManagement &&
    groupPackage &&
    packageName &&
    packaging;

  const onChangeDocsName = (e: any) => {
    setDocsName(e.target.value);
  };

  const onChangeServerUrl = (e: any) => {
    setServerUrl(e.target.value);
  };

  const onChangeContextUri = (e: any) => {
    setContextUri(e.target.value);
  };

  const onChangeJavaVersion = (e: any) => {
    setJavaVersion(e.target.value);
  };

  const onChangeSpringVersion = (e: any) => {
    setSpringVersion(e.target.value);
  };

  const onChangeBuildManagement = (e: any) => {
    setBuildManagement(e.target.value);
  };

  const onChangeGroupPackage = (e: any) => {
    setGroupPackage(e.target.value);
  };

  const onChangePackageName = (e: any) => {
    setPackageName(e.target.value);
  };

  const onChangePackaging = (e: any) => {
    setPackaging(e.target.value);
  };

  const createDocRequest = {
    userId: 1,
    docsName: docsName,
    serverUrl: serverUrl,
    contextUri: contextUri,
    javaVersion: javaVersion,
    springVersion: springVersion,
    buildManagement: buildManagement,
    groupPackage: groupPackage,
    packageName: packageName,
    packaging: packaging,
  };

  const updateDocRequest = {
    docId: docId,
    docsName: docsName,
    serverUrl: serverUrl,
    contextUri: contextUri,
    javaVersion: javaVersion,
    springVersion: springVersion,
    buildManagement: buildManagement,
    groupPackage: groupPackage,
    packageName: packageName,
    packaging: packaging,
  };

  // API DOC 생성하기 및 수정하기
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (docId === 0) {
      dispatch(setApiDoc(createDocRequest)).then((res: any) => {
        if (res.payload?.status === 200) {
          setEncryptedUrl(res.payload.encryptedUrl);
          console.log(res.payload.encryptedUrl);
          dispatch(mainApiSlice.actions.setIsOpenModal({ isOpenModal: false }));
          dispatch(
            mainApiSlice.actions.setIsDocCreated({ isDocCreated: true })
          );
        }
      });
    } else {
      dispatch(
        updateApiDoc({ docId: docId, updateDocRequest: updateDocRequest })
      ).then((res: any) => {
        if (res.payload?.status === 200) {
          dispatch(mainApiSlice.actions.setDocId({ docId: 0 }));
          dispatch(mainApiSlice.actions.setIsOpenModal({ isOpenModal: false }));
          dispatch(
            mainApiSlice.actions.setIsDocUpdated({
              isDocUpdated: true,
            })
          );
        }
      });
    }
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div className="modalContainer">
          <div className="modalMain">
            <form onSubmit={onSubmit}>
              <p>생성하기</p>
              <input
                className="docsName"
                type="text"
                placeholder="생성할 API 명을 작성해주세요"
                onChange={onChangeDocsName}
              />
              <input
                className="serverUrl"
                type="text"
                placeholder="생성할 serverUrl을 작성해주세요"
                onChange={onChangeServerUrl}
              />
              <input
                className="contextUrl"
                type="text"
                placeholder="생성할 contextUrl를 작성해주세요"
                onChange={onChangeContextUri}
              />
              <input
                className="javaVersion"
                type="text"
                placeholder="생성할 javaVersion을 작성해주세요"
                onChange={onChangeJavaVersion}
              />
              <input
                className="springVersion"
                type="text"
                placeholder="생성할 springVersion을 작성해주세요"
                onChange={onChangeSpringVersion}
              />
              <input
                className="buildManagement"
                type="text"
                placeholder="생성할 buildManagement을 작성해주세요"
                onChange={onChangeBuildManagement}
              />
              <input
                className="groupPackage"
                type="text"
                placeholder="생성할 groupPackage을 작성해주세요"
                onChange={onChangeGroupPackage}
              />
              <input
                className="packageName"
                type="text"
                placeholder="생성할 packageName을 작성해주세요"
                onChange={onChangePackageName}
              />
              <input
                className="packaging"
                type="text"
                placeholder="생성할 packaging을 작성해주세요"
                onChange={onChangePackaging}
              />
              <p>초대하기</p>
              <input
                className="groupMember"
                type="text"
                placeholder="추가할 사용자의 이메일을 작성해주세요"
              />
              <p>그룹목록</p>
              <p>API 편집 권한이 있는 사용자</p>
              <div className="apiUser">
                {userDummy.map((it, idx) => (
                  <div className="apiUserList" key={idx}>
                    <FontAwesomeIcon
                      className="apiUserIcon"
                      icon={faCircleUser}
                    />
                    <div className="apiUserTitle">
                      <p>{it.name}</p>
                      <p>{it.id}</p>
                    </div>
                    <p className="apiAuthority">{it.authority}</p>
                  </div>
                ))}
              </div>
              <div className="modalBtn">
                <button className="copyBtn">
                  <FontAwesomeIcon icon={faLink} />
                  <span>링크복사</span>
                </button>
                <button className="makeBtn" type="submit" disabled={!canGoNext}>
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (isOpenModal) {
            dispatch(
              mainApiSlice.actions.setIsOpenModal({ isOpenModal: false })
            );
          }
        }}
      />
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 70px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  margin-bottom: 530px;
  margin-right: 550px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

export default Modal;
