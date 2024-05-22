import styled from 'styled-components';
import UploadInfoBox from './uploadInfoBox';
import { UploadDescriptionIc } from '../../assets';
import { TEXT_LIMIT } from '../../core/common/textLimit';
import { DescriptionInput } from './descriptionInput';

export default function DescriptionInfo() {
  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>
          <UploadDescriptionIcon />
        </InfoTypeIconWrapper>
        <p>Description</p>
      </InfoType>
      <DescriptionInput maxLength={TEXT_LIMIT.DESCRIPTION} />
    </UploadInfoBox>
  );
}
const UploadDescriptionIcon = styled(UploadDescriptionIc)`
  width: 1.246rem;
`;

const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 27.4rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.cations};
`;

const InfoTypeIconWrapper = styled.div`
  width: 2.23rem;
`;
