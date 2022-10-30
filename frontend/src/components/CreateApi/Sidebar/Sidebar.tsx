import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { ControllerType, DataType } from "../../../pages/CreateApi/ApisType";
import ControllerAddModal from "../ControllerAddModal/ControllerAddModal";
import { SelectedItem } from "../SelectMethods/SelectMethods";
import "./Sidebar.scss";

interface Props {
  addController: () => void;
  addApi: (index: number) => void;
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
}

const Sidebar = ({ addController, addApi, data, setData }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {isModalVisible && (
        <ControllerAddModal
          setIsModalVisible={setIsModalVisible}
          addApi={addApi}
          setData={setData}
          data={data}
        />
      )}
      <div className="sidebar">
        <div className="sidebarTitleGroup">
          <p className="sidebarTitle">ApiCloud Api 명세서</p>
          <button
            className="sidebarTitleButton"
            onClick={() => {
              addController();
              setIsModalVisible(!isModalVisible);
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="apiPlusButtonIcon" />
          </button>
        </div>
        {data.controller.length > 0 &&
          data.controller.map((item: ControllerType, index) => (
            <div key={index} className="sidebarContentContainer">
              <div className="controllerItem">{item.name}</div>
              {item.apis.length > 0 &&
                item.apis.map((api, index) => (
                  <div key={index} className="apiListGroup">
                    <SelectedItem
                      color={
                        api.method === "GET"
                          ? "#FDECC8"
                          : api.method === "POST"
                          ? "#F5E0E9"
                          : api.method === "PUT"
                          ? "#F1F0EF"
                          : api.method === "DELETE"
                          ? "#D3E5EF"
                          : api.method === "PATCH"
                          ? "#E8DEEE"
                          : api.method === "OPTIONS"
                          ? "#FFE2DD"
                          : "#EEE0DA"
                      }
                    >
                      {api.method}
                    </SelectedItem>
                    <div className="sidebarApiItem">{api.uri}</div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default Sidebar;
