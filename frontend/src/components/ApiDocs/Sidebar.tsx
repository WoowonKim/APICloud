import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  forwardRef,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Sidebar.scss";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  detail: any;
  scrollUp: () => void;
}

export type Ref = HTMLDivElement[] | null[];

const Sidebar = forwardRef<Ref, Props>(
  ({ isOpen, setIsOpen, detail, scrollUp }, ref) => {
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
        behavior: "smooth",
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
        <div className="houseIconWrapper">
          <FontAwesomeIcon
            icon={faHouse}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <ul className="sidebarUl">
          <li
            className="sidebarLi"
            onClick={() => {
              navigate("/testApi");
            }}
          >
            <div className="sidebarLi1">API TEST 페이지</div>
          </li>
          <li className="sidebarLi" onClick={scrollUp}>
            server 정보
          </li>
          <li className="sidebarLi" onClick={() => scrollMove(ref, 0)}>
            상세 정보
          </li>
        </ul>
        <ul className="sidebarUl">
          {detail &&
            detail?.controllers &&
            detail.controllers.map((controller: any, controllerIdx: any) => (
              <div key={controllerIdx}>
                <li
                  className="sidebarLi"
                  onClick={() =>
                    scrollMove(
                      ref,
                      (3 + controller.apis.length) * controllerIdx + 1
                    )
                  }
                >
                  &nbsp;&nbsp;controllers
                </li>
                <li
                  className="sidebarLi"
                  onClick={() =>
                    scrollMove(
                      ref,
                      (3 + controller.apis.length) * controllerIdx + 2
                    )
                  }
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;name
                </li>
                <li
                  className="sidebarLi"
                  onClick={() =>
                    scrollMove(
                      ref,
                      (3 + controller.apis.length) * controllerIdx + 3
                    )
                  }
                >
                  &nbsp;&nbsp;&nbsp;&nbsp;commonUri
                </li>
                <li className="sidebarLi">&nbsp;&nbsp;&nbsp;&nbsp;Apis</li>
                {controller.apis.map((api: any, apiIdx: any) => (
                  <li
                    key={apiIdx}
                    className="sidebarLi"
                    onClick={() =>
                      scrollMove(
                        ref,
                        (3 + controller.apis.length) * controllerIdx +
                          apiIdx +
                          4
                      )
                    }
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{api?.name} API
                  </li>
                ))}
              </div>
            </div>
            <div className="houseIconWrapper">
              <FontAwesomeIcon
                icon={faHouse}
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <ul className="sidebarUl">
              <li
                className="sidebarLi"
                onClick={() => {
                  navigate("/testApi");
                }}
              >
                <div className="sidebarLi1">API TEST 페이지</div>
              </li>
              <li className="sidebarLi" onClick={scrollUp}>
                server 정보
              </li>
              <li className="sidebarLi" onClick={() => scrollMove(ref, 0)}>
                상세 정보
              </li>
            </ul>
            <ul className="sidebarUl">
              {detail &&
                detail.controllers.map(
                  (controller: any, controllerIdx: any) => (
                    <div key={controllerIdx}>
                      <li
                        className="sidebarLi"
                        onClick={() =>
                          scrollMove(
                            ref,
                            (3 + controller.apis.length) * controllerIdx + 1
                          )
                        }
                      >
                        &nbsp;&nbsp;controllers {controllerIdx + 1}
                      </li>
                      <li
                        className="sidebarLi"
                        onClick={() =>
                          scrollMove(
                            ref,
                            (3 + controller.apis.length) * controllerIdx + 2
                          )
                        }
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;name
                      </li>
                      <li
                        className="sidebarLi"
                        onClick={() =>
                          scrollMove(
                            ref,
                            (3 + controller.apis.length) * controllerIdx + 3
                          )
                        }
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;commonUri
                      </li>
                      <li className="sidebarLi">
                        &nbsp;&nbsp;&nbsp;&nbsp;Apis
                      </li>
                      {controller.apis.map((api: any, apiIdx: any) => (
                        <li
                          key={apiIdx}
                          className="sidebarLi"
                          onClick={() =>
                            scrollMove(
                              ref,
                              (3 + controller.apis.length) * controllerIdx +
                                apiIdx +
                                4
                            )
                          }
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{api.name} API
                        </li>
                      ))}
                    </div>
                  )
                )}
            </ul>
          </OpenSidebar>
        ) : (
          <CloseSidebar>
            <div className="closeButtonWrapper">
              <div
                onClick={toggleSide}
                onKeyDown={toggleSide}
                className="closeButton"
              >
                X
              </div>
            </div>
            <div className="houseIconWrapper">
              <FontAwesomeIcon
                icon={faHouse}
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
            <ul className="sidebarUl">
              <li
                className="sidebarLi"
                onClick={() => {
                  navigate("/testApi");
                }}
              >
                <div className="sidebarLi1">API TEST 페이지</div>
              </li>
              <li className="sidebarLi" onClick={scrollUp}>
                server 정보
              </li>
              <li className="sidebarLi" onClick={() => scrollMove(ref, 0)}>
                상세 정보
              </li>
            </ul>
            <ul className="sidebarUl">
              {detail &&
                detail.controllers.map(
                  (controller: any, controllerIdx: any) => (
                    <div key={controllerIdx}>
                      <li
                        className="sidebarLi"
                        onClick={() =>
                          scrollMove(
                            ref,
                            (3 + controller.apis.length) * controllerIdx + 1
                          )
                        }
                      >
                        &nbsp;&nbsp;controllers {controllerIdx + 1}
                      </li>
                      <li
                        className="sidebarLi"
                        onClick={() =>
                          scrollMove(
                            ref,
                            (3 + controller.apis.length) * controllerIdx + 2
                          )
                        }
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;name
                      </li>
                      <li
                        className="sidebarLi"
                        onClick={() =>
                          scrollMove(
                            ref,
                            (3 + controller.apis.length) * controllerIdx + 3
                          )
                        }
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;commonUri
                      </li>
                      <li className="sidebarLi">
                        &nbsp;&nbsp;&nbsp;&nbsp;Apis
                      </li>
                      {controller.apis.map((api: any, apiIdx: any) => (
                        <li
                          key={apiIdx}
                          className="sidebarLi"
                          onClick={() =>
                            scrollMove(
                              ref,
                              (3 + controller.apis.length) * controllerIdx +
                                apiIdx +
                                4
                            )
                          }
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{api.name} API
                        </li>
                      ))}
                    </div>
                  )
                )}
            </ul>
          </CloseSidebar>
        )}
      </div>
    );
  }
);

export default Sidebar;

const OpenSidebar = styled.div`
  z-index: 5;
  width: 18vw;
  height: 91vh;
  position: absolute;
  left: 0px;
  transition: 0.5s ease;
  background-color: ${(props) => props.theme.docSidebarBgColor};
  border-radius: 5px;
  overflow: auto;
`;

const CloseSidebar = styled.div`
  z-index: 5;
  width: 250px;
  height: 100vh;
  position: absolute;
  left: -200px;
  transition: 0.5s ease;
  background-color: ${(props) => props.theme.docSidebarBgColor};
  border-radius: 5px;
`;
