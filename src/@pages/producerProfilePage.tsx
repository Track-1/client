import styled from "styled-components";
import { useEffect, useState } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { getProducerProfile, getSelectingTracks } from "../core/api/producerProfile";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import { RightArrorIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";

export default function ProducerProfilePage() {
  const [profileData, setProfileData] = useState<ProducerProfileType>();
  const [portfolioData, setPortfolioData] = useState<ProducerPortfolioType[]>();
  const [profileState, setProfileState] = useState<string>("Profile");
  const [isMe, setIsMe] = useState<boolean>(false) 

  useEffect(() => {
    async function getData() {
      const data = await getProducerProfile();

      setPortfolioData(data?.data[0].producerPortfolio);
      setProfileData(data?.data[0].producerProfile);
      setIsMe(data?.data[0].isMe)
    }
    getData();
  }, []);

  function changeToProfile() {
    setProfileState("Profile");

    getProfileData();
  }

  function changeToVocalSearch() {
    setProfileState("Vocal Searching");

    getVocalSearchData();
  }

  async function getProfileData() {
    const data = await getSelectingTracks();
    setPortfolioData(data?.data);
  }

  async function getVocalSearchData() {
    const data = await getProducerProfile();
    setPortfolioData(data?.data[0].producerPortfolio);
  }

  return (
    <PageContainer>
      {profileData && <ProducerInfos profileData={profileData} />}
      <GradientBox src={producerGradientImg} />
      <TabContainer>
        <PortfolioTab profileState={profileState} onClick={changeToProfile}>
          {profileState === "Profile" ? <RightArrorIcon /> : <BlankDiv />}
          PortfolioTab
        </PortfolioTab>
        <VocalSearchingTab profileState={profileState} onClick={changeToVocalSearch}>
          {profileState === "Vocal Searching" ? <RightArrorIcon /> : <BlankDiv />}
          VocalSearchingTab
        </VocalSearchingTab>
      </TabContainer>
      {portfolioData && <ProducerPortFolioList isMe={isMe} portfolioData={portfolioData} />}
    </PageContainer>
  );
}

const PageContainer = styled.section`
  display: flex;
`;

const GradientBox = styled.img`
  left: 60rem;
`;

const TabContainer = styled.ul`
  position: fixed;
  top: 6rem;
  left: 63.8rem;

  ${({ theme }) => theme.fonts.body1};
`;

const PortfolioTab = styled.li<{ profileState: string }>`
  height: 4rem;

  color: ${({ theme, profileState }) => (profileState === "Profile" ? theme.colors.white : theme.colors.gray3)};

  display: flex;
`;

const VocalSearchingTab = styled.li<{ profileState: string }>`
  height: 4rem;

  color: ${({ theme, profileState }) => (profileState === "Vocal Searching" ? theme.colors.white : theme.colors.gray3)};

  display: flex;
`;

const BlankDiv = styled.div`
  width: 3.5rem;
`;

const RightArrorIcon = styled(RightArrorIc)`
  margin-right: 1rem;
`;
