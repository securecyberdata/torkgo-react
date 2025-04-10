import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";
import { useEffect, useState } from "react";
import Hero from "./../components/modules/index/Hero";
import Work from "@/components/modules/index/Work";
// import Featured from "@/components/modules/index/Featured";
import UpcommingTwo from "@/components/modules/project2/UpcommingTwo";
import CompletedTwo from "@/components/modules/project2/CompletedTwo";
import Benifits from "@/components/modules/index/Benifits";
// import Tier from "@/components/modules/index/Tier";
import Roadmap from "@/components/modules/index/Roadmap";
import Team from "@/components/modules/index/Team";
import Wallet from "@/components/Wallet";
import { fetchData } from "@/apiConfig";
import ApplyToLaunch from "@/components/common/ApplyToLaunch";


export default function Home() {
  const [data, setData] = useState([]);
  const [team, setTeam] = useState([]);
  const [showWallet, setShowWallet] = useState(false);

  const handleCloseWallet = () => setShowWallet(false);
  const handleShowWallet = () => setShowWallet(true);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetchData("/notes");
        setData(response)
      } catch (error) {

      }
    };
    getAllData();
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await fetchData("/team");
        setTeam(response)
      } catch (error) {

      }
    };
    getAllData();
  }, []);

  return (
    <>
      <Wallet show={showWallet} handleClose={handleCloseWallet} />
      <Hero />
      {/* <Featured data={data} /> */}
      <Work />
      <UpcommingTwo />
      <CompletedTwo />
      <Benifits />
      {/* <Tier /> */}
      <Roadmap />
      <Team team={team} />
      <ApplyToLaunch />
      {/* <ApplyToLaunch /> */}
    </>
  );
}


