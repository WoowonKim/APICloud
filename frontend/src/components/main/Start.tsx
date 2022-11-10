import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import mainApiSlice from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import CreateModal from "./CreateModal";

const StartMain = styled.div`
  background-color: ${(props) => props.theme.startBgColor};
  display: flex;
  justify-content: space-around;
  border-bottom: 3px solid ${(props) => props.theme.border};
`;

const Start = () => {
  const dispatch = useDispatch();
  const isOpenCreateModal = useSelector((state: RootState) => state.mainApi.isOpenCreateModal);

  return (
    <div className="start">
      <StartMain>
        <div className="startText">
          <span>쉽고 간단하게 API 명세서를 작성해보세요</span>
          <button onClick={() => dispatch(mainApiSlice.actions.setIsOpenCreateModal({ isOpenCreateModal: true }))}>생성하기</button>
          {isOpenCreateModal && <CreateModal></CreateModal>}
        </div>
        <div>
          <img className="startImg" alt="logoImage" src={require("../../assets/ApiCloud.png")} />
        </div>
      </StartMain>
    </div>
  );
};

export default Start;
