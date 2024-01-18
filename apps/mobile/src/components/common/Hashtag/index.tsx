import styled, { css } from 'styled-components';
import { AddHashtagIc, CloseIc } from '../../../assets';
import { FieldValues, UseFormGetValues, UseFormSetValue, useForm, useWatch } from 'react-hook-form';
import { checkMaxInputLength } from '../../../utils/common/check';
import { useEffect } from 'react';

interface HashtagProps {
  hashtags: string[];
  hashtagSet: UseFormSetValue<FieldValues>;
  hashtagGet: UseFormGetValues<FieldValues>;
}

export default function Hashtag(props: HashtagProps) {
  const { hashtags, hashtagGet, hashtagSet } = props;

  const methods = useForm<{ hashtagInput: string }>({
    defaultValues: {
      hashtagInput: '',
    },
  });

  const { register, setValue, watch } = methods;

  useEffect(() => {
    const inputValue = watch('hashtagInput');

    if (inputValue.length > 10) {
      setValue('hashtagInput', inputValue.substring(0, 10));
    }
  }, [watch('hashtagInput')]);

  function handleRemoveHashtag(index: number) {
    const updatedHashtags = [...hashtags];
    updatedHashtags.splice(index, 1);
    hashtagSet('hashtag', updatedHashtags);
  }

  function handleAddHashtag() {
    const inputValue = watch('hashtagInput');
    const hashtags = hashtagGet('hashtag');

    //중복조건 체크
    if (hashtags.includes(inputValue)) {
      alert('중복된 해시태그 입니다!');
      return;
    }

    if (inputValue && hashtags.length < 3) {
      hashtagSet('hashtag', [...hashtags, inputValue]);
      setValue('hashtagInput', '');
    }
  }

  return (
    <>
      <HashtagWrapper>
        {hashtags.map((tag: string, index: number) => (
          <HashtagBox key={tag}>
            {`# ${tag}`}
            <DeleteHashtagIcon width={7.5} height={7.5} onClick={() => handleRemoveHashtag(index)} />
          </HashtagBox>
        ))}
        {hashtags.length < 3 && (
          <>
            <HashtagInputBox>
              <Span inputLength={watch('hashtagInput').length}>{watch('hashtagInput')}</Span>
              <HashtagInput
                placeholder="#Hashtag"
                {...register('hashtagInput')}
                inputLength={watch('hashtagInput').length}
                value={watch('hashtagInput')}
              />
            </HashtagInputBox>

            <AddHashtagIcon onClick={handleAddHashtag} />
          </>
        )}
      </HashtagWrapper>
    </>
  );
}

const Span = styled.span<{ inputLength: number }>`
  position: relative;
  opacity: 0;

  display: inline-block;
  width: ${({ inputLength }) => inputLength === 0 && 6}rem;
`;

const HashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: 0.6rem;

  height: 100%;
`;

const HashtagBoxStyle = styled.li`
  height: 3rem;

  ${({ theme }) => theme.fonts.Pre_14_R};
  color: ${({ theme }) => theme.colors.white};

  padding: 0.7rem 1rem;
  border-radius: 1.5rem;
`;

const HashtagInputBox = styled(HashtagBoxStyle)`
  position: relative;

  background-color: ${({ theme }) => theme.colors.gray5};
`;

const HashtagBox = styled(HashtagBoxStyle)`
  background-color: ${({ theme }) => theme.colors.neon_purple};
`;

const HashtagInput = styled.input<{ inputLength: number }>`
  position: absolute;
  top: 0;
  left: 0;

  padding: inherit;

  box-sizing: border-box;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  width: 3rem;
  height: 3rem;

  cursor: pointer;
`;

const DeleteHashtagIcon = styled(CloseIc)`
  margin-left: 0.5rem;
  cursor: pointer;
`;
