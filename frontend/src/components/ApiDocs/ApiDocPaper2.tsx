import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import "./ApiDocPaper2.scss";
import Headers from "./Headers";
import Parameters from "./Parameters";
import Queries from "./Queries";
import RequestBody from "./RequestBody";
import Responses from "./Responses";
import { Ref } from "./Sidebar";

interface Props {
  detail: any;
}

// ref의 객체, 함수 여부 판단
const useForwardRef = <T,>(
  ref: ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

const ApiDocPaper2 = forwardRef<Ref, Props>(({ detail }, menuRef) => {
  const refList = useForwardRef<Ref>(menuRef, []);

  // map 돌면서 refList에 ref 요소 할당 함수
  const addToRefs = (el: never) => {refList.current.push(el)}

  return (
    <div className="docPaper2Wrapper">
      {detail && (
        <div>
          <div ref={el => refList.current[0] = el}>server</div>
          <div className="titleContentWrapper">
            <div>
              &nbsp;
              <FontAwesomeIcon icon={faTurnUp} rotation={90} />
              &nbsp;dependencies:
            </div>
            <div>{detail.server.dependencies}</div>
          </div>
        </div>
      )}
      <div ref={el => refList.current[1] = el}>controllers</div>
      {detail &&
        detail.controllers.map((item: any, idx: any) => (
          <div key={idx}>
            <div className="titleContentWrapper">
              <div className="iconTitleWrapper">
                &nbsp;
                <FontAwesomeIcon icon={faTurnUp} rotation={90} />
                &nbsp;name:
              </div>
              <div className="content">{item.name}</div>
            </div>
            <div className="titleContentWrapper">
              <div className="iconTitleWrapper">
                &nbsp;
                <FontAwesomeIcon icon={faTurnUp} rotation={90} />
                &nbsp;commonUri:
              </div>
              <div className="content">{item.commonUri}</div>
            </div>
            {item.apis.map((item: any, idx: any) => (
              <div key={idx} ref={addToRefs}>
                <div className="iconTitleWrapper">
                  &nbsp;
                  <FontAwesomeIcon icon={faTurnUp} rotation={90} />
                  &nbsp;apis
                </div>
                <div className="titleContentWrapper">
                  <div className="iconTitleWrapper">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faTurnUp} rotation={90} />
                    &nbsp;name:
                  </div>
                  <div className="content">{item.name}</div>
                </div>
                <div className="titleContentWrapper">
                  <div className="iconTitleWrapper">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faTurnUp} rotation={90} />
                    &nbsp;uri:
                  </div>
                  <div className="content">{item.uri}</div>
                </div>
                <div className="titleContentWrapper">
                  <div className="iconTitleWrapper">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faTurnUp} rotation={90} />
                    &nbsp;method:
                  </div>
                  <div className="content">{item.method}</div>
                </div>
                <RequestBody item={item} />
                <Parameters item={item} />
                <Queries item={item} />
                <Headers item={item} />
                <Responses item={item} />
              </div>
            ))}
          </div>
        ))}
    </div>
  );
});

export default ApiDocPaper2;
