import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, {
  getApiCreationInfo,
  setApiDoc,
} from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import { useAppSelector } from "../../Store/hooks";
import { selectUser } from "../../Store/slice/userSlice";
import { axiosGet } from "../../util/axiosUtil";
import { AnyArray } from "immer/dist/internal";
import "./CreateModal.scss";
import {
  Avatar,
  IconButton,
  InputBase,
  List,
  ListItem,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { Search } from "@mui/icons-material";

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
  detail?: string;
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
  const [isDefaultAvailable, setIsCreationInfoAvailable] = useState(false);
  const [creationInfo, setCreationInfo] = useState({} as any);

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
    userId: currentUser.id,
    docsName: docsName,
    serverUrl: serverUrl,
    contextUri: contextUri,
    javaVersion: javaVersion,
    springVersion: springVersion,
    buildManagement: buildManagement,
    groupPackage: groupPackage,
    packageName: packageName,
    packaging: packaging,
    userAuthorityVO: invitedUsers,
  };

  useEffect(() => {
    dispatch(getApiCreationInfo()).then((res: any) => {
      setCreationInfo(res.payload);
      setDocsName(res.payload.name.default);
      setJavaVersion(res.payload.javaVersion.default);
      setSpringVersion(res.payload.bootVersion.default);
      setBuildManagement(res.payload.type.default);
      setPackaging(res.payload.packaging.default);
      setGroupPackage(res.payload.groupId.default);
      setPackageName(res.payload.packageName.default);
      setIsCreationInfoAvailable(true);
    });
  }, []);

  // API DOC 생성하기
  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(setApiDoc(createDocRequest)).then((res: any) => {
      if (res.meta.requestStatus === "fulfilled") {
        setEncryptedUrl(res.payload.encryptedUrl);
        console.log(res.payload.encryptedUrl);
        dispatch(
          mainApiSlice.actions.setIsOpenCreateModal({ isOpenModal: false })
        );
        dispatch(mainApiSlice.actions.setIsDocCreated({ isDocCreated: true }));
      }
    });
  };

  const search = async (email: any) => {
    await axiosGet("/users?email=" + email)
      .then((res) => {
        if (res.data.id === currentUser.id) {
          console.log("나다");
          alert("본인 이메일 입니다.");
          setSearchUserRes(undefined);
        } else {
          console.log(res.data);
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
    console.log(copy);
    setInvitedUsers(copy);
  };

  const handleUserAdd = () => {
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
      imgUrl: searchUserRes.imgUrl,
      authority: 3,
    });
    setInvitedUsers(copy);
  };
  return (
    <ModalContainer>
      <DialogBox>
        <div className="modalContainer">
          <div className="modalMain">
            <form className="modalForm" onSubmit={onSubmit}>
              <p>생성하기</p>
              {isDefaultAvailable && (
                <>
                  <div className="inputWrapper">
                    <label htmlFor="docsName">Doc 이름</label>
                    <input
                      id="docsName"
                      className="docsName"
                      type="text"
                      placeholder="생성할 Doc 이름을 작성해주세요"
                      value={docsName}
                      onChange={(e) => {
                        setDocsName(e.target.value);
                        setPackageName(groupPackage + "." + docsName);
                      }}
                    />
                  </div>
                  <div className="inputWrapper">
                    <label htmlFor="serverUrl">서버 URL</label>
                    <input
                      id="serverUrl"
                      className="serverUrl"
                      type="text"
                      placeholder="생성할 서버 URL을 작성해주세요"
                      onChange={(e) => setServerUrl(e.target.value)}
                    />
                  </div>
                  <div className="inputWrapper">
                    <label htmlFor="contextUri">Context URI</label>
                    <input
                      id="contextUri"
                      className="contextUri"
                      type="text"
                      placeholder="생성할 context URI를 작성해주세요"
                      onChange={(e) => setContextUri(e.target.value)}
                    />
                  </div>
                  <div className="inputWrapper">
                    <label>Java Version</label>
                    <div className="radioWrapper">
                      {creationInfo.javaVersion.values.map((version: any) => (
                        <div key={version.id} className="radioBtnWrapper">
                          <input
                            type="radio"
                            name="javaVersion"
                            id={"java" + version.id}
                            value={version.id}
                            checked={javaVersion === version.id}
                            onChange={(e) => setJavaVersion(e.target.value)}
                          />
                          <label htmlFor={"java" + version.id}>
                            {version.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inputWrapper">
                    <label>Spring Boot</label>
                    <div className="radioWrapper">
                      {creationInfo.bootVersion.values.map((version: any) => (
                        <div key={version.id} className="radioBtnWrapper">
                          <input
                            type="radio"
                            name="springVersion"
                            id={version.id}
                            value={version.id}
                            checked={springVersion === version.id}
                            onChange={(e) => setSpringVersion(e.target.value)}
                          />
                          <label htmlFor={version.id}>{version.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inputWrapper">
                    <label>Build Management</label>
                    <div className="radioWrapper">
                      {creationInfo.type.values.map((type: any) => (
                        <div key={type.id} className="radioBtnWrapper">
                          <input
                            type="radio"
                            name="buildManagement"
                            id={type.id}
                            value={type.id}
                            checked={buildManagement === type.id}
                            onChange={(e) => setBuildManagement(e.target.value)}
                          />
                          <label htmlFor={type.id}>{type.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="inputWrapper">
                    <label htmlFor="groupPackage">Group Package</label>
                    <input
                      id="groupPackage"
                      className="groupPackage"
                      type="text"
                      placeholder="생성할 group package를 작성해주세요"
                      value={groupPackage}
                      onChange={(e) => {
                        setGroupPackage(e.target.value);
                        setPackageName(groupPackage + "." + docsName);
                      }}
                    />
                  </div>
                  <div className="inputWrapper">
                    <label htmlFor="packageName">Package</label>
                    <input
                      id="packageName"
                      className="packageName"
                      type="text"
                      placeholder="생성할 package를 작성해주세요"
                      value={packageName}
                      onChange={(e) => setPackageName(e.target.value)}
                    />
                  </div>
                  <div className="inputWrapper">
                    <label>Packaging</label>
                    <div className="radioWrapper">
                      {creationInfo.packaging.values.map((p: any) => (
                        <div key={p.id} className="radioBtnWrapper">
                          <input
                            type="radio"
                            name="packaging"
                            id={p.id}
                            value={p.id}
                            checked={packaging === p.id}
                            onChange={(e) => setPackaging(e.target.value)}
                          />
                          <label htmlFor={p.id}>{p.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <p>초대하기</p>
              <div className="searchUser">
                <input
                  className="groupMember"
                  type="text"
                  placeholder="추가할 사용자의 이메일을 작성해주세요"
                  onChange={(e) => {
                    setSerchUser(e.target.value);
                  }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  onClick={() => {
                    search(searcUser);
                  }}
                >
                  <Search />
                </IconButton>
              </div>
              {searchUserRes && (
                <div className="searcedUser">
                  <div onClick={handleUserAdd}>
                    <Tooltip title={"Click! to add"}>
                      <Avatar
                        alt={searchUserRes.name}
                        src={searchUserRes.imgUrl}
                        sx={{ margin: "auto" }}
                      ></Avatar>
                    </Tooltip>
                  </div>
                  <span>{searchUserRes.name}</span>
                </div>
              )}
              {searchUserRes === null && (
                <p className="searcedUser">존재하지 않는 사용자 입니다.</p>
              )}
              <p>그룹목록</p>
              <div className="apiUser">
                <List
                  dense
                  sx={{
                    width: "100%",
                  }}
                >
                  {invitedUsers.map((it, idx) => (
                    <ListItem key={idx}>
                      <Avatar
                        alt={it.name}
                        src={it.imgUrl}
                        sx={{ mr: 1 }}
                      ></Avatar>
                      <p>
                        {it.name}
                        <br></br>
                        {it.email}
                      </p>
                      <Select
                        value={it.authority}
                        onChange={(e) => {
                          handleAuthortyChange(e, idx);
                        }}
                        sx={{ ml: "auto" }}
                        MenuProps={{
                          disableScrollLock: true,
                        }}
                      >
                        <MenuItem value={2}>editor</MenuItem>
                        <MenuItem value={3}>viewer</MenuItem>
                      </Select>
                    </ListItem>
                  ))}
                </List>
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
