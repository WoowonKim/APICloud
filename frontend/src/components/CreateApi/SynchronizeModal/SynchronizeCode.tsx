import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import CodeBlock from "../WarningModal/CodeBlock";

interface Props {
  changeCode: any;
  selectedChangeCode: number;
  setSelectedChangeCode: React.Dispatch<React.SetStateAction<number>>;
  setChangeCode: React.Dispatch<any>;
}
const SynchronizeCode = ({
  changeCode,
  selectedChangeCode,
  setSelectedChangeCode,
  setChangeCode,
}: Props) => {
  const scrollRef = useRef<any>(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<any>();

  const onDragStart = (e: any) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e: any) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;

      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const throttle = (func: any, ms: any) => {
    let throttled = false;
    return (...args: any) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);
  return (
    <>
      <div className="createApiSynchronizeTitle">
        <div
          className="createApiTabContainer items"
          onMouseDown={onDragStart}
          onMouseMove={onThrottleDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          ref={scrollRef}
        >
          {changeCode.map((item: any, index: number) => (
            <div
              key={index}
              className={
                selectedChangeCode === index
                  ? "createApiTabItem selectedTabItem"
                  : "createApiTabItem"
              }
              onClick={() => {
                setSelectedChangeCode(index);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
        <button
          className="createApiCloseButton"
          onClick={() => setChangeCode(undefined)}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <div className="createApiCodeBlockContainer">
        <CodeBlock data={changeCode[selectedChangeCode].code} />
      </div>
    </>
  );
};

export default SynchronizeCode;
