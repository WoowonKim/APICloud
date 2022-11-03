import React, { useCallback, useState } from "react";
import Modal from "./Modal";

interface Props {
  setIsDocCreated: any;
}

const Start = ({ setIsDocCreated }: Props) => {
  const [isOpenModal, setOpenModal] = useState<Boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <div className="start">
      <div className="startMain">
        <div className="startText">
          <span>쉽고 간단하게 API 명세서를 작성해보세요</span>
          <button onClick={onClickToggleModal}>생성하기</button>
          {isOpenModal && (
            <Modal
              onClickToggleModal={onClickToggleModal}
              setIsDocCreated={setIsDocCreated}
            ></Modal>
          )}
        </div>
        <div>
          <img
            className="startImg"
            src={require("../../assets/ApiCloud.png")}
          />
        </div>
      </div>
    </div>
  );
};

export default Start;
