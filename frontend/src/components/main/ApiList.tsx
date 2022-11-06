import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
};

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
      if (res.payload?.status === 200) {
        setApiDocList(res.payload.docList);
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
        <span
          className={apiList === 0 ? "ClickList" : "noClicklist"}
          onClick={() => {
            setApiList(0);
          }}
        >
          관리자로 진행중인 API
        </span>
        <span
          className={apiList === 1 ? "ClickList" : "noClicklist"}
          onClick={() => {
            setApiList(1);
          }}
        >
          참여자로 진행중인 API
        </span>
      </div>
      <div className="ApiListContent">
        <ApiListDetail
          apiList={apiList}
          apiDocList={apiDocList}
          dispatchGetDocList={dispatchGetDocList}
        />
      </div>
    </div>
  );
};

export default ApiList;
