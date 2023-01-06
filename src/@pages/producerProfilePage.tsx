import styled from "styled-components";
import { useEffect, useState } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { getProducerProfile } from "../core/api/producerProfile";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";

export default function ProducerProfilePage() {
  const [profileData, setProfileData] = useState<ProducerProfileType>();
  const [portfolioData, setPortfolioData] = useState<ProducerPortfolioType[]>();
  const [playingAudio, setPlayingAudio] = useState<any>();

  const audio = new Audio(playingAudio);

  function changePlayingAudio(file: any) {
    setPlayingAudio(file);
  }

  useEffect(() => {
    audio.play();
  }, [playingAudio]);

  useEffect(() => {
    async function getData() {
      const data = await getProducerProfile();

      setPortfolioData(data?.data[0].producerPortfolio);
      setProfileData(data?.data[0].producerProfile);
    }
    getData();
  }, []);
  return (
    <PageContainer>
      <img src={producerGradientImg} />
      {portfolioData && <ProducerPortFolioList portfolioData={portfolioData} />}
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
`;
