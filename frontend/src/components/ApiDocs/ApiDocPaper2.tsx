import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./ApiDocPaper2.scss";

interface Props {
  detailArray: any;
}

const ApiDocPaper2 = ({ detailArray }: Props) => {
  
	return (
    <div className="docPaper2Wrapper">
      {detailArray && (
				<div>
					<div className="rowWrapper">
						<div>{detailArray[0][0]}</div>
						<div>{JSON.stringify(detailArray[0][1])}</div>
					</div>
					<div className="rowWrapper">
						<div>{detailArray[1][0]}</div>
					</div>
					<div className="rowWrapper">
						<div className="titleWrapper">
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div>name</div>
						</div>
						<div>{JSON.stringify(detailArray[1][1][0].name)}</div>
					</div>
					<div className="rowWrapper">
						<div className="titleWrapper">
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div>commonUri</div>
						</div>
						<div>{JSON.stringify(detailArray[1][1][0].commonUri)}</div>
					</div>
					<div className="rowWrapper">
						<div className="titleWrapper">
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div>apis</div>
						</div>
					</div>
					<div className="rowWrapper">
						<div className="titleWrapper">
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div>name</div>
						</div>
						<div>{JSON.stringify(detailArray[1][1][0].apis[0].name)}</div>
					</div>
					<div className="rowWrapper">
						<div className="titleWrapper">
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div>uri</div>
						</div>
						<div>{JSON.stringify(detailArray[1][1][0].apis[0].uri)}</div>
					</div>
					<div className="rowWrapper">
						<div className="titleWrapper">
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div><FontAwesomeIcon icon={faAnglesRight}/></div>
							<div>method</div>
						</div>
						<div>{JSON.stringify(detailArray[1][1][0].apis[0].method)}</div>
					</div>
				</div>
      )}
    </div>
  );
};

export default ApiDocPaper2;
