import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Properties from "./Properties";

interface Props {
  item: any;
}

const Responses = ({ item }: Props) => {
  return (
    <div>
      <div className="titleContentWrapper">
        <div className="iconTitleWrapper">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCircle} className="circleIcon" />
          &nbsp;responses
        </div>
      </div>
      <div className="titleContentWrapper">
        <div className="iconTitleWrapper">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCircle} className="circleIcon" />
          &nbsp;fail
        </div>
      </div>
      <div className="titleContentWrapper">
        <div className="iconTitleWrapper">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCircle} className="circleIcon" />
          &nbsp;status:
        </div>
        <div className="content">{item.responses.fail?.status}</div>
      </div>
      <div className="iconTitleWrapper">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon={faCircle} className="circleIcon" />
        &nbsp;responseBody
      </div>
      <div className="contentBox2">
        <div>{"{"}</div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;dtoName:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.fail?.responseBody?.dtoName}',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;name:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.fail?.responseBody.name}
          ',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;type:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.fail?.responseBody.type}
          ',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;collectionType:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.fail?.responseBody.collectionType}',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;required:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.fail?.responseBody.required}',
        </div>
        <Properties item={item.responses.fail?.responseBody.properties} />
        <div>{"}"}</div>
      </div>
      <div className="titleContentWrapper">
        <div className="iconTitleWrapper">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCircle} className="circleIcon" />
          &nbsp;success
        </div>
      </div>
      <div className="titleContentWrapper">
        <div className="iconTitleWrapper">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon icon={faCircle} className="circleIcon" />
          &nbsp;status:
        </div>
        <div className="content">{item.responses.success?.status}</div>
      </div>
      <div className="iconTitleWrapper">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <FontAwesomeIcon icon={faCircle} className="circleIcon" />
        &nbsp;responseBody
      </div>
      <div className="contentBox2">
        <div>{"{"}</div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;dtoName:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.success.responseBody.dtoName}',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;name:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.success.responseBody.name}
          ',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;type:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.success.responseBody.type}
          ',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;collectionType:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.success.responseBody.collectionType}',
        </div>
        <div className="titleContentWrapper2">
          <div>&nbsp;&nbsp;&nbsp;required:</div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
          {item.responses.success.responseBody.required}',
        </div>
        <Properties item={item.responses.success.responseBody.properties} />
        <div>{"}"}</div>
      </div>
    </div>
  );
};

export default Responses;
