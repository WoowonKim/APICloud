import { faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MappedTypeDescription } from "@syncedstore/core/types/doc";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ControllerType } from "../../../pages/CreateApi/ApisType";
import ControllerAddModal from "../ControllerAddModal/ControllerAddModal";
import { SelectedItem } from "../SelectMethods/SelectMethods";
import { checkDtoNameValidation } from "../validationCheck";
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
  docInfo: any;
  isViewer: boolean;
}

const Sidebar = ({
  handleController,
  addApi,
  state,
  handleSidebarApi,
  selectedApi,
  selectedController,
  addedControllerIndex,
  docInfo,
  isViewer,
}: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editControllerIndex, setEditControllerIndex] = useState(-1);
  const [dtoInfoVisible, setDtoInfoVisible] = useState(false);
  const [allDtoDatas, setAllDtoDatas] = useState<any>();

  useEffect(() => {
    setEditControllerIndex(-1);
    setDtoInfoVisible(false);
  }, []);

  useEffect(() => {
    setIsModalVisible(false);
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
      <CreateApiSidebar>
        <div className="sidebarTitleGroup">
          <p className="sidebarTitle">{docInfo?.docsName}</p>
          <button
            className="sidebarTitleButton"
            onClick={() => {
              setEditControllerIndex(-1);
              handleController("add");
              setIsModalVisible(!isModalVisible);
            }}
            disabled={isViewer}
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
                  {!isViewer && (
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
                      <button
                        className="sidebarControllerEdit"
                        onClick={() => {
                          const checkDto = checkDtoNameValidation(
                            "dto",
                            state.data[index].apis,
                            state.data[index].apis.length,
                            "",
                            true
                          );
                          setAllDtoDatas(checkDto);
                          setDtoInfoVisible(!dtoInfoVisible);
                        }}
                      >
                        {dtoInfoVisible ? "Dto 정보 닫기" : "Dto 정보 보기"}
                      </button>
                    </div>
                  )}
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
                        api.method === "Get"
                          ? "#FDECC8"
                          : api.method === "Post"
                          ? "#F5E0E9"
                          : api.method === "Put"
                          ? "#F1F0EF"
                          : api.method === "Delete"
                          ? "#D3E5EF"
                          : api.method === "Patch"
                          ? "#E8DEEE"
                          : api.method === "Options"
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
        {allDtoDatas && dtoInfoVisible && (
          <div className="sidebarDtoInfoContainer">
            <div className="sidebarDtoInfoTitle">Dto 정보</div>
            {allDtoDatas.length > 0 &&
              allDtoDatas.map((item: any, index: number) => (
                <div key={index} className="sidebarDtoContainer">
                  <div className="sidebarDtoName">{item.dtoName}</div>
                  {item.properties.map((props: any, idx: number) => (
                    <div key={idx} className="sidebarPropertiesContainer">
                      <p>└</p>
                      <div className="sidebarPropertiesItem">{props.name}</div>
                      <div className="sidebarPropertiesItem">
                        {props.collectionType === "List" ? (
                          <span>{`<List>${props.type}`}</span>
                        ) : (
                          <span>{props.type}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        )}
      </CreateApiSidebar>
    </>
  );
};

export default Sidebar;


const CreateApiSidebar = styled.div`
  background-color: ${(props) => props.theme.createApiSidebarBgColor};
  padding: 0 1rem;
`