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

export const ApiListTitle = styled.div`
  padding-left: 10%;
  cursor: pointer;
`;

export const ChoiceText = styled.span`
  background-color: #3a00e5;
  border-radius: 10px;
  font-weight: bold;
  font-size: 13px;
  color: #fff;
  padding: 10px;
  box-shadow: 0 17px 15px -18px rgba(180, 180, 180, 1);
  margin: 5px;
`;

export const NoChoiceText = styled.span`
  background-color: #f7f5ff;
  color: #3a00e5;
  border-radius: 10px;
  font-weight: bold;
  font-size: 12px;
  padding: 10px;
  box-shadow: 0 17px 15px -18px rgba(180, 180, 180, 1);
  margin: 5px;
`;

const ApiListContent = styled.div`
  margin-top: 10px;
  padding-top: 1px;
  padding-left: 10%;
  padding-right: 10%;
  // background-color: ${(props) => props.theme.startBgColor};
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
      <ApiListTitle>
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
      </ApiListTitle>
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
