import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getApiDocList } from "../../Store/slice/mainApi";
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

interface Props {
  isDocCreated: boolean;
  setIsDocCreated: any;
}

const ApiList = ({ isDocCreated, setIsDocCreated }: Props) => {
  const [apiList, setApiList] = useState(0);
  const [apiDocList, setApiDocList] = useState<ApiDocType[] | []>([]);

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

  useEffect(() => {
    if (isDocCreated) {
      dispatchGetDocList();
      setIsDocCreated(false);
    }
  }, [isDocCreated]);

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
        <ApiListDetail apiList={apiList} apiDocList={apiDocList} dispatchGetDocList={dispatchGetDocList} />
      </div>
    </div>
  );
};

export default ApiList;
