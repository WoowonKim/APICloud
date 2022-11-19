import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface Props {
  item: any;
}

const Headers = ({ item }: Props) => {
  return (
    <div>
      <div className="titleContentWrapper">
        <div className="iconTitleWrapper">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCircle} className="circleIcon" />
          &nbsp;headers
        </div>
      </div>
      <div className="contentBox">
        {item.headers &&
          item.headers.length > 0 &&
          item.headers.map((item: any, idx: any) => (
            <div key={idx}>
              <div>{"{"}</div>
              <div className="titleContentWrapper2">
                <div>&nbsp;&nbsp;&nbsp;key:</div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item?.key}',
              </div>
              <div className="titleContentWrapper2">
                <div>&nbsp;&nbsp;&nbsp;value:</div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'{item?.value}',
              </div>
              <div>{"}"}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Headers;
