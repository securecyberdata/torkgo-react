import ApplyToLaunch from "@/components/common/ApplyToLaunch";
import PageHeader from "@/components/base/PageHeader";
import RoadmapTwo from "@/components/modules/index/RoadmapTwo";

const RoadMap2 = () => {
  return (
    <>
      <PageHeader 
        title="Strategic Roadmap" 
        text="Our journey from inception to global adoption" 
      />
      <RoadmapTwo />
      <ApplyToLaunch />
    </>
  );
};

export default RoadMap2;
