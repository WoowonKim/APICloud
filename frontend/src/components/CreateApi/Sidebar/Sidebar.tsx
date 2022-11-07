import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React, { useEffect, useState } from "react";
import { ControllerType } from "../../../pages/CreateApi/ApisType";
import ControllerAddModal from "../ControllerAddModal/ControllerAddModal";
import { SelectedItem } from "../SelectMethods/SelectMethods";
import "./Sidebar.scss";

interface Props {
  handleController: (method: string, index?: number) => void;
  addApi: (index: number) => void;
  state: MappedTypeDescription<{
    data: ControllerType[];
  }>;
  handleSidebarApi: (index: number, idx: number) => void;
  selectedApi: number;
  selectedController: number;
  addedApiIndex: number;
  addedControllerIndex: number;
}

const Sidebar = ({
  handleController,
  addApi,
  state,
  handleSidebarApi,
  selectedApi,
  selectedController,
  addedControllerIndex,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editControllerIndex, setEditControllerIndex] = useState(-1);

  useEffect(() => {
    setEditControllerIndex(-1);
  }, []);
  return (
    <>
      {isModalVisible && (
        <ControllerAddModal
          setIsModalVisible={setIsModalVisible}
          addApi={addApi}
          state={state}
          editControllerIndex={editControllerIndex}
          setEditControllerIndex={setEditControllerIndex}
          addedControllerIndex={addedControllerIndex}
        />
      )}
      <div className="sidebar">
        <div className="sidebarTitleGroup">
          <p className="sidebarTitle">ApiCloud Api 명세서</p>
          <button
            className="sidebarTitleButton"
            onClick={() => {
              handleController("add");
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
                <div className="dropdown">
                  <button className="sidebarMenuButton">
                    <FontAwesomeIcon
                      icon={faEllipsisVertical}
                      className="sidebarMenuIcon"
                    />
                  </button>
                  <div className="sidebarMenuVisible">
                    <button
                      onClick={() => {
                        setEditControllerIndex(index);
                        setIsModalVisible((curr) => !curr);
                      }}
                      className="sidebarControllerEdit"
                    >
                      수정하기
                    </button>
                    <button
                      onClick={() => {
                        handleController("delete", index);
                      }}
                      className="sidebarControllerEdit"
                    >
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
              {item.apis &&
                item.apis.length > 0 &&
                item.apis.map((api, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === selectedApi && index === selectedController
                        ? "apiListGroup active"
                        : "apiListGroup"
                    }
                    onClick={() => handleSidebarApi(index, idx)}
                  >
                    <SelectedItem
                      color={
                        api.method === "get"
                          ? "#FDECC8"
                          : api.method === "post"
                          ? "#F5E0E9"
                          : api.method === "put"
                          ? "#F1F0EF"
                          : api.method === "delete"
                          ? "#D3E5EF"
                          : api.method === "patch"
                          ? "#E8DEEE"
                          : api.method === "options"
                          ? "#FFE2DD"
                          : "#EEE0DA"
                      }
                    >
                      {api.method.toUpperCase()}
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
