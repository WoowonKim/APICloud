import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { userDummy } from "./ListDummy";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, { setApiDoc } from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import { useAppSelector } from "../../Store/hooks";
import { selectUser } from "../../Store/slice/userSlice";
import { axiosGet } from "../../util/axiosUtil";
import { AnyArray } from "immer/dist/internal";

export type DocInformationType = {
  docId: number;
  docsName: string;
  serverUrl: string;
  contextUri: string;
  javaVersion: string;
  springVersion: string;
  buildManagement: number;
  groupPackage: string;
  packageName: string;
  packaging: number;
};

const CreateModal = () => {
  const currentUser = useAppSelector(selectUser);
  const [docsName, setDocsName] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [contextUri, setContextUri] = useState("");
  const [javaVersion, setJavaVersion] = useState("");
  const [springVersion, setSpringVersion] = useState("");
  const [buildManagement, setBuildManagement] = useState("");
  const [groupPackage, setGroupPackage] = useState("");
  const [packageName, setPackageName] = useState("");
  const [packaging, setPackaging] = useState("");
  const [searcUser, setSerchUser] = useState("");
  const [searchUserRes, setSearchUserRes] = useState<any>();
  const [invitedUsers, setInvitedUsers] = useState<AnyArray>([]);
  const [encryptedUrl, setEncryptedUrl] = useState("");

  const docId = useSelector((state: RootState) => state.mainApi.docId);
  const isOpenCreateModal = useSelector(
    (state: RootState) => state.mainApi.isOpenCreateModal
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

  // API DOC 생성하기
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (docId === 0) {
      dispatch(setApiDoc(createDocRequest)).then((res: any) => {
        if (res.payload?.status === 200) {
          setEncryptedUrl(res.payload.encryptedUrl);
          console.log(res.payload.encryptedUrl);
          dispatch(
            mainApiSlice.actions.setIsOpenCreateModal({ isOpenModal: false })
          );
          dispatch(
            mainApiSlice.actions.setIsDocCreated({ isDocCreated: true })
          );
        }
      });
    }
  };

  const search = async (email: any) => {
    await axiosGet("/users?email=" + email)
      .then((res) => {
        if (res.data.id === currentUser.id) {
          console.log("나다");
          alert("본인 이메일 입니다.");
          setSearchUserRes(undefined);
        } else {
          setSearchUserRes(res.data);
        }
      })
      .catch(() => {
        setSearchUserRes(null);
      });
  };

  const handleAuthortyChange = (e: any, idx: number) => {
    let copy = [...invitedUsers];
    copy[idx].authority = e.target.value;
    setInvitedUsers(copy);
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
                onChange={(e) => setDocsName(e.target.value)}
              />
              <input
                className="serverUrl"
                type="text"
                placeholder="생성할 serverUrl을 작성해주세요"
                onChange={(e) => setServerUrl(e.target.value)}
              />
              <input
                className="contextUrl"
                type="text"
                placeholder="생성할 contextUrl를 작성해주세요"
                onChange={(e) => setContextUri(e.target.value)}
              />
              <input
                className="javaVersion"
                type="text"
                placeholder="생성할 javaVersion을 작성해주세요"
                onChange={(e) => setJavaVersion(e.target.value)}
              />
              <input
                className="springVersion"
                type="text"
                placeholder="생성할 springVersion을 작성해주세요"
                onChange={(e) => setSpringVersion(e.target.value)}
              />
              <input
                className="buildManagement"
                type="text"
                placeholder="생성할 buildManagement을 작성해주세요"
                onChange={(e) => setBuildManagement(e.target.value)}
              />
              <input
                className="groupPackage"
                type="text"
                placeholder="생성할 groupPackage을 작성해주세요"
                onChange={(e) => setGroupPackage(e.target.value)}
              />
              <input
                className="packageName"
                type="text"
                placeholder="생성할 packageName을 작성해주세요"
                onChange={(e) => setPackageName(e.target.value)}
              />
              <input
                className="packaging"
                type="text"
                placeholder="생성할 packaging을 작성해주세요"
                onChange={(e) => setPackaging(e.target.value)}
              />
              <p>초대하기</p>
              <input
                className="groupMember"
                type="text"
                placeholder="추가할 사용자의 이메일을 작성해주세요"
                onChange={(e) => {
                  setSerchUser(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  search(searcUser);
                }}
              >
                검색하기
              </button>
              {searchUserRes && (
                <div>
                  <span>{searchUserRes.name}</span>
                  <button
                    type="button"
                    onClick={() => {
                      let copy = [...invitedUsers];
                      const isIncluded = copy.find((ele) => {
                        if (ele.userId === searchUserRes.id) {
                          return true;
                        }
                      });
                      if (isIncluded) {
                        alert("이미 추가된 유저입니다.");
                        return;
                      }
                      copy.push({
                        userId: searchUserRes.id,
                        name: searchUserRes.name,
                        email: searchUserRes.email,
                        authority: 3,
                      });
                      setInvitedUsers(copy);
                    }}
                  >
                    추가하기
                  </button>
                </div>
              )}
              {searchUserRes === null && <p>존재하지 않는 사용자 입니다.</p>}
              <p>그룹목록</p>
              <div className="apiUser">
                {invitedUsers.map((it, idx) => (
                  <div className="apiUserList" key={idx}>
                    <FontAwesomeIcon
                      className="apiUserIcon"
                      icon={faCircleUser}
                    />
                    <div className="apiUserTitle">
                      <p>{it.name}</p>
                      <p>{it.email}</p>
                    </div>
                    <select
                      onChange={(e) => {
                        handleAuthortyChange(e, idx);
                      }}
                      value={it.authority}
                    >
                      <option value="2">editor</option>
                      <option value="3">viewer</option>
                    </select>
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
          if (isOpenCreateModal) {
            dispatch(
              mainApiSlice.actions.setIsOpenCreateModal({ isOpenModal: false })
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

export default CreateModal;
