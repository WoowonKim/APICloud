import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React, { useState } from "react";
import { ControllerType } from "../../../pages/CreateApi/ApisType";
import ControllerAddModal from "../ControllerAddModal/ControllerAddModal";
import { SelectedItem } from "../SelectMethods/SelectMethods";
import "./Sidebar.scss";

interface Props {
  addController: () => void;
  addApi: (index: number) => void;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  handleSidebarApi: (index: number, idx: number) => void;
}

const Sidebar = ({ addController, addApi, state, handleSidebarApi }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editControllerIndex, setEditControllerIndex] = useState(-1);
  return (
    <>
      {isModalVisible && (
        <ControllerAddModal
          setIsModalVisible={setIsModalVisible}
          addApi={addApi}
          state={state}
          editControllerIndex={editControllerIndex}
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
        {state.data &&
          state.data.length > 0 &&
          state.data.map((item: ControllerType, index) => (
            <div key={index} className="sidebarContentContainer">
              <div className="sidebarControllerGroup">
                <div className="controllerItem">{item.name}</div>
                <button
                  className="sidebarMenuButton"
                  onClick={() => {
                    setEditControllerIndex(index);
                    setIsModalVisible((curr) => !curr);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    className="sidebarMenuIcon"
                  />
                  <div className="sidebarControllerEdit">수정하기</div>
                </button>
              </div>
              {item.apis.length > 0 &&
                item.apis.map((api, idx) => (
                  <div
                    key={idx}
                    className="apiListGroup"
                    onClick={() => handleSidebarApi(index, idx)}
                  >
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
