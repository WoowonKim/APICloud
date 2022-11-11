import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  detail: any;
}

export type Ref = HTMLDivElement[] | null[];

const Sidebar = forwardRef<Ref, Props>(({ isOpen, setIsOpen, detail }, ref) => {
  const navigate = useNavigate();
  const outside = useRef<any>();

  // 사이드바 닫는 함수
  const handlerOutside = (e: any) => {
    if (!outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  // 클릭된 메뉴로 스크롤 이동 함수
  const scrollMove = (top: any, index: number) => {
    window.scrollTo({
      top: top.current[index].offsetTop,
      left: 0,
      behavior: "auto",
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlerOutside);
    return () => {
      document.removeEventListener("mousedown", handlerOutside);
    };
  });

  return (
    <div
      id="sidebar"
      ref={outside}
      className={isOpen ? "openSidebar" : "closeSidebar"}
    >
      <div className="closeButtonWrapper">
        <div
          onClick={toggleSide}
          onKeyDown={toggleSide}
          className="closeButton"
        >
          X
        </div>
      </div>
      <ul className="ul">
        <li
          onClick={() => {
            navigate("/testApi");
          }}
        >
          API TEST 페이지
        </li>
        <li onClick={() => scrollMove(ref, 0)}>server</li>
        <li onClick={() => scrollMove(ref, 1)}>controllers</li>
      </ul>
      <ul>
        Apis
        {detail &&
          detail.controllers[0].apis.map((item: any, idx: any) => (
            <li key={idx} onClick={() => scrollMove(ref, idx + 2)}>
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
});

export default Sidebar;
