import { AppContext } from "@/AppContext";
import React, { useContext } from "react";
import Modal from "./Modal";

const InfoModal = () => {
  const {infoTitle, infoDesc, showInfo, setShowInfo} = useContext(AppContext);

  return (
    <Modal title={infoTitle} desc={infoDesc} hidden={!showInfo} hideModal={() => setShowInfo(false)}/>
  );
};

export default InfoModal;
