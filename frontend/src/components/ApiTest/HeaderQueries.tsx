import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PropertiesType, RequestTypeInfo } from "../../pages/CreateApi/ApisType";
import { reBodyType } from "../../pages/TestApi";
import { selectTestApi } from "../../Store/slice/testApi";
import { HeaderContatinerList, HeaderListInput, HeaderListTitle, HeaderListTitleCon } from "./Headerheader";

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
      setInfoQueries(getInfo?.controllers[info.getControllerInfomation].apis[info.getApisInfomation].queries);
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
        <div key={idx}>
          <HeaderContatinerList>
            <HeaderListTitleCon>
              <HeaderListTitle>{it.name}</HeaderListTitle>
            </HeaderListTitleCon>
            {it.name && (
              <div className="headerListContent">
                <form onSubmit={onSubmit}>
                  <HeaderListInput
                    type="text"
                    onChange={(e) => {
                      setInputQueries(e.target.value);
                      setQueriesId(it.name);
                    }}
                  />
                  <button>저장</button>
                </form>
              </div>
            )}
          </HeaderContatinerList>
        </div>
      ))}
    </>
  );
};

export default HeaderQueries;
