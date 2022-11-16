import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useSelector } from "react-redux";
import {
  PropertiesType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { useAppDispatch } from "../../Store/hooks";
import testApiSlice, { selectTestApi } from "../../Store/slice/testApi";
import {
  HeaderContatinerList,
  HeaderListInput,
  HeaderListTitle,
  HeaderListTitleCon,
} from "./Headerheader";
interface type {
  getInfo: RequestTypeInfo | undefined;
  setParamsInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
  paramsInfo: reBodyType | undefined;
}
const ApiParams = ({ getInfo, setParamsInfo, paramsInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [infoParams, setInfoParams] = useState<PropertiesType[]>();
  useEffect(() => {
    if (getInfo) {
      setInfoParams(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].parameters
      );
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    if (infoParams) {
      infoParams?.map((it, idx) => {
        dispatch(testApiSlice.actions.getParamsID(it.name));
      });
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  const dispatch = useAppDispatch();
  const submitParams = (e: string) => {
    dispatch(testApiSlice.actions.getParam(e));
  };

  const [inputParam, setInputParam] = useState("");
  const [newParams, setNewParams] = useState({});
  const [paramsId, setParamsId] = useState("");

  useEffect(() => {
    if (getInfo) {
      setParamsInfo({});
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    let key = paramsId;
    setNewParams({ [key]: inputParam });
  }, [inputParam]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setParamsInfo({ ...paramsInfo, ...newParams });
    setInputParam("");
  };

  return (
    <>
      {infoParams?.map((it, idx) => (
        <div className="headerListTitleisHeader" key={idx}>
          <div className="apiKeyHeaderTitle">
            <p className="apiHeaderListPtag">{it.name}</p>
          </div>
          <div className="apiKeyHeaderTitleValueSubmit">
            <p className="apiHeaderListPtagInput">
              <input
                className="apiHeaderListInputTag"
                type="text"
                onChange={e => {
                  setInputParam(e.target.value);
                  setParamsId(it.name);
                }}
                onBlur={onSubmit}
              />
            </p>
          </div>
          <div className="apiKeyHeaderTitleCheck">
            <p className="apiHeaderListButtonTag">SAVE</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ApiParams;
