import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import mainApiSlice, { getApiDocList } from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import ApiListDetail from "./ApiListDetail";

export type ApiDocType = {
  docId: number;
  docName: string;
  groupId: number;
  groupUser: {
    id: number;
    email: string;
    name: string;
    provider: string;
    providerId: string;
    imageUrl: string;
  };
  authority: number;
  encryptedUrl: string;
};

export const ChoiceText = styled.span`
  font-weight: bold;
  font-size: 13px;
  color: ${(props) => props.theme.color};
  border-bottom: 2px solid ${(props) => props.theme.color};
  padding: 3px 3px 3px 3px;
`;

export const NoChoiceText = styled.span`
  font-size: 11px;
  color: ${(props) => props.theme.color};
  border-bottom: 2px solid ${(props) => props.theme.color};
  margin: 10px 10px 10px 10px;
`;

const ApiListContent = styled.div`
  margin-top: 10px;
  // padding: 10px;
  background-color: ${(props) => props.theme.startBgColor};
  // margin-bottom: 30px;
`;
const ApiList = () => {
  const [apiList, setApiList] = useState(0);
  const [apiDocList, setApiDocList] = useState<ApiDocType[] | []>([]);
  const isDocCreated = useSelector(
    (state: RootState) => state.mainApi.isDocCreated
  );
  const isDocUpdated = useSelector(
    (state: RootState) => state.mainApi.isDocUpdated
  );

  const dispatch = useDispatch();

  const dispatchGetDocList = () => {
    dispatch(getApiDocList()).then((res: any) => {
      if (res.meta?.requestStatus === "fulfilled") {
        setApiDocList(res.payload);
      }
    });
  };

  useEffect(() => {
    dispatchGetDocList();
  }, []);

  // DOC이 생성될 때마다 DOC 목록 다시 불러오기
  useEffect(() => {
    if (isDocCreated) {
      dispatchGetDocList();
      dispatch(mainApiSlice.actions.setIsDocCreated({ isDocCreated: false }));
    } else if (isDocUpdated) {
      dispatchGetDocList();
      dispatch(mainApiSlice.actions.setIsDocUpdated({ isDocUpdated: false }));
    }
  }, [isDocCreated, isDocUpdated]);

  return (
    <div className="ApiList">
      <div className="ApiListTitle">
        {apiList === 0 ? (
          <>
            <ChoiceText
              onClick={() => {
                setApiList(0);
              }}
            >
              관리자로 진행중인 API
            </ChoiceText>
            <NoChoiceText
              onClick={() => {
                setApiList(1);
              }}
            >
              참여자로 진행중인 API
            </NoChoiceText>
          </>
        ) : (
          <>
            <NoChoiceText
              onClick={() => {
                setApiList(0);
              }}
            >
              관리자로 진행중인 API
            </NoChoiceText>
            <ChoiceText
              onClick={() => {
                setApiList(1);
              }}
            >
              참여자로 진행중인 API
            </ChoiceText>
          </>
        )}
      </div>
      <ApiListContent>
        <ApiListDetail
          apiList={apiList}
          apiDocList={apiDocList}
          dispatchGetDocList={dispatchGetDocList}
        />
      </ApiListContent>
    </div>
  );
};

export default ApiList;
