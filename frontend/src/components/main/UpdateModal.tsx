import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, {
  getApiCreationInfo,
  getApiDoc,
  updateApiDoc,
} from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import "./CreateModal.scss";
import { getGroupUsers } from "../../Store/slice/apiDocsApi";
import { axiosGet, axiosPost, axiosPut, axiosDel } from "../../util/axiosUtil";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useAppSelector } from "../../Store/hooks";
import { selectUser } from "../../Store/slice/userSlice";
import { Loading } from "../../pages/CreateApi/CreateApi";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { faCopy } from "@fortawesome/free-regular-svg-icons";

type groupUser = {
  name: string;
  authority: number;
  email: string;
  userId: number;
  imgUrl: string;
};
const UpdateModal = () => {
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
  const [isDefaultAvailable, setIsCreationInfoAvailable] = useState(false);
  const [creationInfo, setCreationInfo] = useState({} as any);
  const [groupUsers, setGroupUsers] = useState<groupUser[]>([]);
  const [authority, setAuthority] = useState<number>();
  const [searcUser, setSerchUser] = useState("");
  const [searchUserRes, setSearchUserRes] = useState<any>();
  const [copyUrl, setCopyUrl] = useState("");
  const [isCopy, setIsCopyUrl] = useState(false);

  const docsNameInput: any = useRef();

  const docId = useSelector((state: RootState) => state.mainApi.docId);
  const isOpenUpdateModal = useSelector(
    (state: RootState) => state.mainApi.isOpenUpdateModal
  );
  const encryptedUrl = useSelector(
    (state: RootState) => state.mainApi.encryptedUrl
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

  // API DOC 수정하기
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (docId > 0) {
      dispatch(
        updateApiDoc({ docId: docId, updateDocRequest: updateDocRequest })
      ).then((res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(mainApiSlice.actions.setDocId({ docId: 0 }));
          dispatch(
            mainApiSlice.actions.setIsOpenUpdateModal({ isOpenModal: false })
          );
          dispatch(
            mainApiSlice.actions.setIsDocUpdated({
              isDocUpdated: true,
            })
          );
        }
      });
    }
  };

  useEffect(() => {
    if (docId > 0) {
      dispatch(getApiDoc({ docId: encryptedUrl })).then((res: any) => {
        if (res.meta.requestStatus === "fulfilled") {
          setDocsName(res.payload.docsName);
          setServerUrl(res.payload.serverUrl);
          setContextUri(res.payload.contextUri);
          setJavaVersion(res.payload.javaVersion);
          setSpringVersion(res.payload.springVersion);
          setBuildManagement(res.payload.buildManagement);
          setGroupPackage(res.payload.groupPackage);
          setPackageName(res.payload.packageName);
          setPackaging(res.payload.packaging);
          dispatch(getApiCreationInfo()).then((info: any) => {
            addCurrentVersion(info.payload, res.payload.springVersion);
            setCreationInfo(info.payload);
            setIsCreationInfoAvailable(true);
          });
        }
      });
    }

    setCopyUrl(`${process.env.REACT_APP_APIDOC_COPYURL}/${encryptedUrl}`);
  }, []);

  useEffect(() => {
    dispatch(getGroupUsers({ docId: docId })).then((res: any) => {
      setGroupUsers(res.payload);
    });
    axiosGet("/docs/authority/" + encryptedUrl).then((res: any) => {
      setAuthority(res.data);
    });
  }, []);
  const addCurrentVersion = (info: any, currentVersion: string) => {
    let isExists = false;
    for (let bootVersion of info.bootVersion.values) {
      if (bootVersion.id === currentVersion) {
        isExists = true;
        break;
      }
    }
    if (!isExists) {
      info.bootVersion.values.push({
        id: currentVersion,
        name: currentVersion,
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
  const handleAuthortyChange = (e: any, userId: number, idx: number) => {
    const value = e.target.value;
    axiosPut("/group/" + docId, {
      userId: userId,
      authority: value,
    }).then((res) => {
      let copy = [...groupUsers];
      copy[idx].authority = value;
      setGroupUsers(copy);
    });
  };
  const handleUserAdd = () => {
    let copy = [...groupUsers];
    const isIncluded = copy.find((ele) => {
      if (ele.userId === searchUserRes.id) {
        return true;
      }
    });
    if (isIncluded) {
      alert("이미 추가된 유저입니다.");
      return;
    } else {
      axiosPost("/group/" + docId, {
        userId: searchUserRes.id,
        authority: 3,
      }).then((res) => {
        copy.push({
          userId: searchUserRes.id,
          name: searchUserRes.name,
          email: searchUserRes.email,
          imgUrl: searchUserRes.imgUrl,
          authority: 3,
        });
        setGroupUsers(copy);
      });
    }
  };

  const deleteUser = async (userId: number) => {
    let copy = [...groupUsers];
    const idx = copy.findIndex(function (ele) {
      return ele.userId === userId;
    });
    if (idx > -1) {
      axiosDel("/group/" + docId + "/" + userId).then((res) => {
        copy.splice(idx, 1);
        setGroupUsers(copy);
      });
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(copyUrl);
      setIsCopyUrl(true);
    } catch (err) {
      console.log(err);
      setIsCopyUrl(false);
    }
  };

  return (
    <ModalContainer>
      <DialogBox>
        <div className="modalContainer">
          <div className="modalMain">
            <form className="modalForm" onSubmit={onSubmit}>
              <p>수정하기</p>
              {isDefaultAvailable ? (
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
                      value={serverUrl}
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
                      value={contextUri}
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
              ) : (
                <Loading
                  style={{ position: "relative", top: "65px", left: "415px" }}
                >
                  <InfinitySpin width="250" color="#6FC7D1" />
                </Loading>
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
              <p>API 접근 권한이 있는 사용자</p>
              <div className="apiUser">
                <List
                  dense
                  sx={{
                    width: "100%",
                  }}
                >
                  {groupUsers.map((it, idx) => (
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
                      {it.authority != 1 && (
                        <>
                          <Select
                            value={it.authority}
                            onChange={(e) => {
                              handleAuthortyChange(e, it.userId, idx);
                            }}
                            sx={{ ml: "auto" }}
                            MenuProps={{
                              disableScrollLock: true,
                            }}
                          >
                            <MenuItem value={2}>editor</MenuItem>
                            <MenuItem value={3}>viewer</MenuItem>
                          </Select>
                          <UserDeleteButton
                            type="button"
                            onClick={() => {
                              deleteUser(it.userId);
                            }}
                          >
                            삭제
                          </UserDeleteButton>
                        </>
                      )}
                    </ListItem>
                  ))}
                </List>
              </div>
              <div className="modalBtn">
                <button
                  className="copyBtn"
                  onClick={() => handleCopyUrl()}
                  type="button"
                >
                  {isCopy ? (
                    <div className="copied">
                      <FontAwesomeIcon icon={faCopy} />
                      <span>복사완료</span>
                    </div>
                  ) : (
                    <div className="copied">
                      <FontAwesomeIcon icon={faLink} />
                      <span>링크복사</span>
                    </div>
                  )}
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
          if (isOpenUpdateModal) {
            dispatch(
              mainApiSlice.actions.setIsOpenUpdateModal({
                isOpenUpdateModal: false,
              })
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
  position: fixed;
  top: 0;
  left: 0;
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
  margin: 20px auto;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

const UserDeleteButton = styled.button`
  border: none;
  margin-left: 10px;
  background-color: transparent;
`;

export default UpdateModal;
