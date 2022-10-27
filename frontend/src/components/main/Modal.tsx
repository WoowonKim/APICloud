import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { userDummy } from "./ListDummy";

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

const Modal = ({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) => {
  return (
    <ModalContainer>
      <DialogBox>
        <div className="modalContainer">
          <div className="modalMain">
            <p>생성하기</p>
            <input className="apititle" type="text" placeholder="생성할 API 명을 작성해주세요" />
            <p>초대하기</p>
            <input className="groupMember" type="text" placeholder="추가할 사용자의 이메일을 작성해주세요" />
            <p>그룹목록</p>
            <p>API 편집 권한이 있는 사용자</p>
            <div className="apiUser">
              {userDummy.map((it, idx) => (
                <div className="apiUserList" key={idx}>
                  <FontAwesomeIcon className="apiUserIcon" icon={faCircleUser} />
                  <div className="apiUserTitle">
                    <p>{it.name}</p>
                    <p>{it.id}</p>
                  </div>
                  <p className="apiAuthority">{it.authority}</p>
                </div>
              ))}
            </div>
            <div className="modalBtn">
              <button className="copyBtn">
                <FontAwesomeIcon icon={faLink} />
                <span>링크복사</span>
              </button>
              <button className="makeBtn">완료</button>
            </div>
          </div>
        </div>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const DialogBox = styled.dialog`
  width: 600px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 70px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
  margin-bottom: 530px;
  margin-right: 550px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
  // background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
