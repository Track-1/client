import styled, { css } from 'styled-components';
import useHashtagInput from '../../../hooks/common/useHashtagInput';
import { AddHashtagIc, CloseIc } from '../../../assets';
import { useForm, useWatch } from 'react-hook-form';
import { ChangeEvent, useEffect, useRef } from 'react';

interface HashtagProps {
  maxTags: number;
}

export default function Hashtag(props: HashtagProps) {
  const { maxTags } = props;

  const methods = useForm<{ hashtagInput: string; hashtags: string[] }>({
    defaultValues: {
      hashtagInput: '',
      hashtags: [],
    },
  });

  const { register, setValue, watch, control } = methods;

  const { ref, ...rest } = register('hashtagInput');

  const hashtagInputBoxRef = useRef<HTMLLIElement | null>(null);

  const hashtags = useWatch({
    control,
    name: 'hashtags',
  });

  function handleRemoveHashtag(index: number) {
    const updatedHashtags = [...hashtags];
    updatedHashtags.splice(index, 1);
    setValue('hashtags', updatedHashtags);
  }

  function handleAddHashtag() {
    const inputValue = watch('hashtagInput');
    const hashtags = methods.getValues('hashtags');

    if (methods.getValues('hashtags').includes(inputValue)) {
      alert('중복된 해시태그 입니다!');
      return;
    }

    if (inputValue && hashtags.length < 3) {
      setValue('hashtags', [...hashtags, inputValue]);
    }

    setValue('hashtagInput', '');
  }

  return (
    <>
      <HashtagWrapper>
        {hashtags.map((tag, index) => (
          <HashtagBox key={tag}>
            {`# ${tag}`}
            <DeleteHashtagIcon width={7.5} height={7.5} onClick={() => handleRemoveHashtag(index)} />
          </HashtagBox>
        ))}
        {hashtags.length < 3 && (
          <>
            <HashtagInputBox>
              <Span inputLength={watch('hashtagInput').length}>{watch('hashtagInput')}</Span>
              <HashtagInput placeholder="#Hashtag" {...register} inputLength={watch('hashtagInput').length} />
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
