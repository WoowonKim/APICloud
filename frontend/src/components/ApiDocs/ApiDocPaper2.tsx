import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ApiDocPaper2.scss";

interface Props {
  detail: any;
}

const ApiDocPaper2 = ({ detail }: Props) => {
  return (
    <div className="docPaper2Wrapper">
      {detail && (
        <div>
          <div>server</div>
          <div className="titleContentWrapper">
            <div>
              &nbsp;
              <FontAwesomeIcon icon={faTurnUp} rotation={90} />
              &nbsp;dependencies
            </div>
            <div>{detail.server.dependencies}</div>
          </div>
        </div>
      )}
      <div>controllers</div>
      {detail &&
        detail.controllers.map((item: any, idx: any) => (
          <div key={idx}>
            <div className="titleContentWrapper">
							<div className="iconTitleWrapper">
								&nbsp;
								<FontAwesomeIcon icon={faTurnUp} rotation={90} />
								&nbsp;name
							</div>
              <div>{item.name}</div>
            </div>
            <div className="titleContentWrapper">
              <div>&nbsp;commonUri</div>
              <div>{item.commonUri}</div>
            </div>
            {item.apis.map((item: any, idx: any) => (
              <div key={idx}>
                <div>&nbsp;apis</div>
                <div className="titleContentWrapper">
                  <div>&nbsp;&nbsp;name</div>
                  <div>{item.name}</div>
                </div>
                <div className="titleContentWrapper">
                  <div>&nbsp;&nbsp;uri</div>
                  <div>{item.uri}</div>
                </div>
                <div className="titleContentWrapper">
                  <div>&nbsp;&nbsp;method</div>
                  <div>{item.method}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default ApiDocPaper2;
