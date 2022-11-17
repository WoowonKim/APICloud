import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";
import { useAppSelector } from "../../Store/hooks";
import userSlice, { selectUser } from "../../Store/slice/userSlice";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Logout } from "@mui/icons-material";

const ApiMainHeader = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  padding: 15px;
  padding-bottom: 0px;
  display: flex;
  justify-content: space-between;
`;

const Header = () => {
  const navigate = useNavigate();
  const [userImg, setUserImg] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useAppSelector(selectUser);
  useEffect(() => {
    setUserImg(user?.imgUrl);
  }, [user]);
  const handleLogOut = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <ApiMainHeader>
      {/* 로고 */}
      <img
        className="logoImg"
        src={require("../../assets/realCloudLogo.png")}
        onClick={() => {
          navigate("/");
        }}
      />
      {/* 사용자 프로필 */}
      <div className="user">
        <img
          className="userImg"
          src={userImg}
          referrerPolicy="no-referrer"
          onClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",

              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </ApiMainHeader>
  );
};

export default Header;
