import styled from "styled-components";
import {
  ProfileEditSleepAcountTextIc,
  ProfileEditSleepAcountTitleIc,
  ProfileEditSleeperButtonIc,
  ProfileEditActiveButtonIc,
} from "../../assets";

export default function VocalProfileEditPage() {
  const isSleep = true;

  function changeSleepState() {}

  return (
    <>
      <SleepAcountContainer>
        <SleepAcountTextWrapper>
          <ProfileEditSleepAcountTitleIcon />
          <ProfileEditSleepAcountTextIcon />
        </SleepAcountTextWrapper>
        {isSleep ? (
          <ProfileEditSleeperButtonIcon onClick={changeSleepState} />
        ) : (
          <ProfileEditActiveButtonIcon onClick={changeSleepState} />
        )}
      </SleepAcountContainer>
    </>
  );
}

const SleepAcountContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 54.9rem;
`;
const SleepAcountTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 12rem;
  margin-top: 7rem;
`;

const ProfileEditSleepAcountTextIcon = styled(ProfileEditSleepAcountTextIc)`
  width: 25rem;

  margin-top: 2.2rem;
`;

const ProfileEditActiveButtonIcon = styled(ProfileEditActiveButtonIc)`
  width: 19.2rem;
  margin-top: 12.5rem;
  margin-bottom: 8rem;

  cursor: pointer;
`;

const ProfileEditSleeperButtonIcon = styled(ProfileEditSleeperButtonIc)`
  width: 19.2rem;
  margin-top: 12.5rem;
  margin-bottom: 8rem;

  cursor: pointer;
`;

const ProfileEditSleepAcountTitleIcon = styled(ProfileEditSleepAcountTitleIc)`
  width: 22rem;
`;
