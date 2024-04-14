import React, { useEffect, useState } from "react";
import "./MobilePage.css";
import ChartWrapper from "../../Components/Chart/Chart";
import MobileDelivery from "../../Components/MobileDelivery/MobileDelivery";

const MobilePage = () => {
  useEffect(() => {
    console.log("root");
  }, []);
  return (
    <div className="mobile-page">
      <ChartWrapper />
      <MobileDelivery />
    </div>
  );
};

export default MobilePage;
