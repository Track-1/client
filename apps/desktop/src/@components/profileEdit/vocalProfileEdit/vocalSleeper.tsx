import styled from "styled-components";
import {
  ProfileEditSleepAcountTextIc,
  ProfileEditSleepAcountTitleIc,
  ProfileEditSleeperButtonIc,
  ProfileEditActiveButtonIc,
} from "../../../assets";

interface PropsType {
  isSleep: boolean;
  handleChangeIsSleep: () => void;
}

export default function VocalSleeper(props: PropsType) {
  const { isSleep, handleChangeIsSleep } = props;

  return (
    <SleepAcountContainer>
      <div>
        <ProfileEditSleepAcountTitleIcon />
        <ProfileEditSleepAcountTextIcon />
      </div>
      {isSleep ? (
        <ProfileEditSleeperButtonIcon onClick={handleChangeIsSleep} />
      ) : (
        <ProfileEditActiveButtonIcon onClick={handleChangeIsSleep} />
      )}
    </SleepAcountContainer>
  );
}

const SleepAcountContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 54.9rem;

  margin-top: 5.6rem;
`;

const ProfileEditSleepAcountTextIcon = styled(ProfileEditSleepAcountTextIc)`
  width: 23rem;

  margin-top: 2.7rem;
`;

const ProfileEditActiveButtonIcon = styled(ProfileEditActiveButtonIc)`
  width: 19.2rem;
  margin-top: 5.5rem;

  cursor: pointer;
`;

const ProfileEditSleeperButtonIcon = styled(ProfileEditSleeperButtonIc)`
  width: 19.2rem;
  margin-top: 5.5rem;

  cursor: pointer;
`;

const ProfileEditSleepAcountTitleIcon = styled(ProfileEditSleepAcountTitleIc)`
  width: 22rem;
`;
