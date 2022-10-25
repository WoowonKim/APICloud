import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/ApiDocs/Sidebar";
import '../components/ApiDocs/ApiDocs.scss'

const ApiDocs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSide = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen])
  
  return (
    <div>
      <div onClick={toggleSide} className="sidebarButton">
        <FontAwesomeIcon icon={faBars} size="2x" />
      </div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
};

export default ApiDocs;
