import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { userDummy } from "./ListDummy";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, {
  getApiCreationInfo,
  getApiDoc,
  updateApiDoc,
} from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";

const GroupInfoModal = () => {
  const docId = useSelector((state: RootState) => state.mainApi.docId);
  const isGroupInfoModal = useSelector(
    (state: RootState) => state.mainApi.isGroupInfoModal
  );

  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <ModalContainer>
      <DialogBox>
        <Backdrop
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            if (isGroupInfoModal) {
              dispatch(
                mainApiSlice.actions.setIsGroupInfoModal({
                  isGroupInfoModal: false,
                })
              );
            }
          }}
        />
      </DialogBox>
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  // width: 100%;
  // height: 100%;
  margin-left: 20px;
  display: flex;
  // align-items: center;
  justify-content: center;
  position: absolute;
`;

const DialogBox = styled.dialog`
  width: 200px;
  height: 100px;
  display: flex;
  // flex-direction: column;
  // align-items: center;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(30, 30, 30, 0.185);
  z-index: 10000;
  // margin-bottom: 530px;
  // margin-right: 550px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

export default GroupInfoModal;
