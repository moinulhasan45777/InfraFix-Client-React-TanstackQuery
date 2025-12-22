import React from "react";
import Banner from "./Banner";
import LatestResolvedIssues from "./LatestResolvedIssues";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import WhyInfraFix from "./WhyInfraFix";
import WhoUsesInfraFix from "./Who";
import useTitle from "../../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <LatestResolvedIssues></LatestResolvedIssues>
      <Features></Features>
      <HowItWorks></HowItWorks>
      <WhyInfraFix></WhyInfraFix>
      <WhoUsesInfraFix></WhoUsesInfraFix>
    </div>
  );
};

export default Home;
