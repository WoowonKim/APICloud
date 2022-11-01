import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Sidebar from "../components/ApiDocs/Sidebar";
import '../components/ApiDocs/ApiDocs.scss'
import ApiDocsTable from "../components/ApiDocs/ApiDocsTable";
import { ApiDocsDummy1, ApiDocsDummy2 } from "../components/ApiDocs/ApiDocsDummy";

export type ApiDocsDummy1 = {
  id: number;
  category: string;
  content: string;
};

export type ApiDocsDummy2 = {
  id: number;
  category: string;
  content: string;
};

const ApiDocs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
  };

  return (
    <div className="apiDocContainer">
      <div className="sidebarDocWrapper">
        <div className="sidebarBox">
          <div onClick={toggleSide} className="sidebarButton">
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="docBox">
          <div className="title">API DOC 페이지</div>
          <div className="doc">
            <ApiDocsTable ApiDocsDummy1={ApiDocsDummy1} ApiDocsDummy2={ApiDocsDummy2} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default ApiDocs;
