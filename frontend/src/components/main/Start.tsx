import React from "react";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import Modal from "./Modal";

const Start = () => {
  const dispatch = useDispatch();
  const isOpenModal = useSelector(
    (state: RootState) => state.mainApi.isOpenModal
  );

  return (
    <div className="start">
      <div className="startMain">
        <div className="startText">
          <span>쉽고 간단하게 API 명세서를 작성해보세요</span>
          <button
            onClick={() =>
              dispatch(
                mainApiSlice.actions.setIsOpenModal({ isOpenModal: true })
              )
            }
          >
            생성하기
          </button>
          {isOpenModal && <Modal></Modal>}
        </div>
        <div>
          <img
            className="startImg"
            alt="logoImage"
            src={require("../../assets/ApiCloud.png")}
          />
        </div>
      </div>
    </div>
  );
};

export default Start;
