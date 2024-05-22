import styled from 'styled-components';
import InputContainer from '../@common/form/inputContainer';
import HashtagInput from '../@common/hashtag/hashtagInput';

export default function ProfileHashtagEdit() {
  return (
    <HashtagContainer>
      <InputContainer title="Hashtag" hashtagWarningIcon>
        <HashtagInput />
      </InputContainer>
    </HashtagContainer>
  );
}

const HashtagContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;
