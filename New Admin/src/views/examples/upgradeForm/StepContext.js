import React, { useEffect, useState } from "react";
import UpgradeCom from "./upgradeUser";

export const multiStepContext = React.createContext();

const StepContext = () => {
  const [currentStep, setStep] = useState(0);
  const [userFData, setFData] = useState([]);
  const [userSData, setSData] = useState([]);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       closeModal();
  //     }, 3000);
  //   });
  return (
    <multiStepContext.Provider
      value={{ currentStep, setStep, userFData, setFData, userSData, setSData }}
    >
      <UpgradeCom />
    </multiStepContext.Provider>
  );
};

export default StepContext;
