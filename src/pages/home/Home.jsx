import React from "react";
import Banner from "./Banner";
import LatestResolvedIssues from "./LatestResolvedIssues";
import Features from "./Features";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestResolvedIssues></LatestResolvedIssues>
      <Features></Features>
    </div>
  );
};

export default Home;
