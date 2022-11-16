import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  PropertiesType,
  RequestTypeInfo,
} from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { selectTestApi } from "../../Store/slice/testApi";
import {
  HeaderContatinerList,
  HeaderListInput,
  HeaderListTitle,
  HeaderListTitleCon,
} from "./Headerheader";

interface type {
  getInfo: RequestTypeInfo | undefined;
  queriesInfo: reBodyType | undefined;
  setQueriesInfo: Dispatch<SetStateAction<reBodyType | undefined>>;
}

const HeaderQueries = ({ getInfo, queriesInfo, setQueriesInfo }: type) => {
  const info = useSelector(selectTestApi);
  const [infoQueries, setInfoQueries] = useState<PropertiesType[]>();
  const [inputQueries, setInputQueries] = useState("");
  const [newQueries, setNewQueries] = useState({});
  const [queriesId, setQueriesId] = useState("");

  useEffect(() => {
    if (getInfo) {
      setInfoQueries(
        getInfo?.controllers[info.getControllerInfomation].apis[
          info.getApisInfomation
        ].queries
      );
      setQueriesInfo({});
    }
  }, [getInfo, info.getControllerInfomation, info.getApisInfomation]);

  useEffect(() => {
    let key = queriesId;
    setNewQueries({ [key]: inputQueries });
  }, [inputQueries]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    setQueriesInfo({ ...queriesInfo, ...newQueries });
    setInputQueries("");
  };

  return (
    <>
      {infoQueries?.map((it, idx) => (
        <div className="headerListTitleisHeader" key={idx}>
          {it.name && (
            <div className="apiKeyHeaderTitle">
              <p className="apiHeaderListPtag">{it.name}</p>
            </div>
          )}

          {it.name && (
            <div className="apiKeyHeaderTitleValueSubmit">
              <p className="apiHeaderListPtagInput">
                <input
                  className="apiHeaderListInputTag"
                  type="text"
                  onChange={e => {
                    setInputQueries(e.target.value);
                    setQueriesId(it.name);
                  }}
                  onBlur={onSubmit}
                />
              </p>
            </div>
          )}

          {it.name && (
            <div className="apiKeyHeaderTitleCheck">
              <p className="apiHeaderListButtonTag">SAVE</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default HeaderQueries;
