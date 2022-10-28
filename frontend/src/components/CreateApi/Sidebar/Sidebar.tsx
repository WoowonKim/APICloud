import React, { useState } from "react";
import { ControllerType, DataType } from "../../../pages/CreateApi/ApisType";
import "./Sidebar.scss";

interface Props {
  addController: () => void;
  addApi: (index: number) => void;
  controllers: ControllerType[];
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

const Sidebar = ({
  addController,
  addApi,
  controllers,
  data,
  setData,
}: Props) => {
  const [visibleControllerAdd, setVisibleControllerAdd] = useState(false);
  const [visibleApiAdd, setVisibleApiAdd] = useState(-1);
  const [controllerName, setControllerName] = useState("");
  const [controllerUri, setControllerUri] = useState("");
  const [apiName, setApiName] = useState("");
  const [apiUri, setApiUri] = useState("");
  const [apiMethod, setApiMethod] = useState("");

  return (
    <div className="sidebar">
      <p>ApiCloud Api 명세서</p>
      <button
        className="newControllerButton"
        onClick={() => {
          addController();
          setVisibleControllerAdd(!visibleControllerAdd);
        }}
      >
        Controller 생성
      </button>
      {visibleControllerAdd && (
        <div>
          <label htmlFor="controllerName" className="controllerInputLabel">
            controller name
          </label>
          <input
            type="text"
            id="controllerName"
            onChange={(e) => {
              setControllerName(e.target.value);
            }}
            className="controllerInput"
            required
          />
          <label htmlFor="controllerUri" className="controllerInputLabel">
            controller uri
          </label>
          <input
            type="text"
            id="controllerUri"
            onChange={(e) => {
              setControllerUri(e.target.value);
            }}
            className="controllerInput"
            required
          />
          <button
            onClick={() => {
              setData((old) => {
                let copy = JSON.parse(JSON.stringify(old));
                let length = copy.controller.length;
                copy.controller[length - 1].name = controllerName;
                copy.controller[length - 1].commonUri = controllerUri;
                return copy;
              });
              setControllerName("");
              setControllerUri("");
              setVisibleControllerAdd(!visibleControllerAdd);
            }}
          >
            생성
          </button>
        </div>
      )}
      {data.controller.length > 0 &&
        data.controller.map((item: ControllerType, index) => (
          <div key={index}>
            <div>
              name: {item.name} uri: {item.commonUri}
            </div>
            <button
              onClick={() => {
                addApi(index);
                setVisibleApiAdd(index);
              }}
            >
              추가
            </button>
            {index === visibleApiAdd && (
              <div>
                <label htmlFor="apiName">api name</label>
                <input
                  type="text"
                  id="apiName"
                  onChange={(e) => {
                    setApiName(e.target.value);
                  }}
                />
                <label htmlFor="apiUri">api uri</label>
                <input
                  type="text"
                  id="apiUri"
                  onChange={(e) => {
                    setApiUri(e.target.value);
                  }}
                />
                <label htmlFor="apiMethod">api uri</label>
                <input
                  type="text"
                  id="apiMethod"
                  onChange={(e) => {
                    setApiMethod(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    setData((old: DataType) => {
                      let copy = JSON.parse(JSON.stringify(old));
                      let length = old.controller[index].apis.length;
                      copy.controller[index].apis[length - 1].name = apiName;
                      copy.controller[index].apis[length - 1].uri = apiUri;
                      copy.controller[index].apis[length - 1].method =
                        apiMethod;
                      return copy;
                    });
                    setApiMethod("");
                    setApiName("");
                    setApiUri("");
                    setVisibleApiAdd(-1);
                  }}
                >
                  추가하기
                </button>
              </div>
            )}
            {item.apis.length > 0 &&
              item.apis.map((api, index) => (
                <div key={index}>
                  <div>
                    name: {api.name} uri: {api.uri}
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default Sidebar;
