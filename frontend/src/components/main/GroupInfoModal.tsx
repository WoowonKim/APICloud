import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { userDummy } from "./ListDummy";
import { useDispatch, useSelector } from "react-redux";
import mainApiSlice, { getGroupUserList } from "../../Store/slice/mainApi";
import { RootState } from "../../Store/store";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
type GroupProps = {
  docId: number;
};
const GroupInfoModal = ({ docId }: GroupProps) => {
  const isGroupInfoModal = useSelector(
    (state: RootState) => state.mainApi.isGroupInfoModal
  );

  const dispatch = useDispatch();
  const [groupUserList, setGroupUserList] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getGroupUserList({ docId: docId })).then((res: any) => {
      if (res.meta?.requestStatus === "fulfilled") {
        setGroupUserList(res.payload);
      }
    });
  }, []);

  return (
    <ModalContainer>
      <DialogBox>
        {groupUserList && (
          <AvatarGroup max={5}>
            {groupUserList?.map((it, idx) => (
              <Avatar alt="userImg" src={it.imgUrl} key={idx} />
            ))}
          </AvatarGroup>
        )}
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
  display: flex;
  border: none;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(30, 30, 30, 0.185);
  z-index: 10000;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

export default GroupInfoModal;
