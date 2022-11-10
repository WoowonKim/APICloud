import { faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ApiDocPaper2.scss";
import Headers from "./Headers";
import Parameters from "./Parameters";
import Queries from "./Queries";
import RequestBody from "./RequestBody";
import Responses from "./Responses";

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
              &nbsp;dependencies:
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
              <div key={idx}>
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
};

export default ApiDocPaper2;
