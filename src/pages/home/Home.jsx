import Banner from "./Banner";
import LatestResolvedIssues from "./LatestResolvedIssues";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import WhyInfraFix from "./WhyInfraFix";
import WhoUsesInfraFix from "./Who";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import FAQ from "./FAQ";
import CallToAction from "./CallToAction";
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
      <Testimonials></Testimonials>
      <Newsletter></Newsletter>
      <FAQ></FAQ>
      <CallToAction></CallToAction>
    </div>
  );
};

export default Home;
