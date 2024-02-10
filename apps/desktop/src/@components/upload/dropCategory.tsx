import styled from 'styled-components';
import { CategoryId, CategoryText, EventCategoryId, EventCategoryText } from '../../core/common/categories';
import { CheckCategoryIc } from '../../assets';
import { Select } from '../@common/selectBox';
import { getInvariantObjectKeys, invariantOf } from '../../utils/common/invarientType';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';

export default function DropCategory() {
  const userType = useRecoilValue(loginUserData).userType;

  return (
    <Select.OptionGroup asChild>
      <DropMenuBox>
        <DropMenuWrapper>
          {userType === 'producer' ? (
            <>
              {getInvariantObjectKeys(invariantOf(EventCategoryId)).map((category) => (
                <Select.Trigger key={category} asChild>
                  <OptionWrapper>
                    <Select.Option id={Number(EventCategoryId[category])} asChild>
                      <DropMenuItem>
                        <DropMenuText>{EventCategoryText[category]}</DropMenuText>
                        <Select.Indicator id={Number(EventCategoryId[category])} asChild>
                          <CheckCategoryIcon />
                        </Select.Indicator>
                      </DropMenuItem>
                    </Select.Option>
                  </OptionWrapper>
                </Select.Trigger>
              ))}
            </>
          ) : (
            <>
              {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => (
                <Select.Trigger key={category} asChild>
                  <OptionWrapper>
                    <Select.Option id={Number(CategoryId[category])} asChild>
                      <DropMenuItem>
                        <DropMenuText>{CategoryText[category]}</DropMenuText>
                        <Select.Indicator id={Number(CategoryId[category])} asChild>
                          <CheckCategoryIcon />
                        </Select.Indicator>
                      </DropMenuItem>
                    </Select.Option>
                  </OptionWrapper>
                </Select.Trigger>
              ))}
            </>
          )}
        </DropMenuWrapper>
      </DropMenuBox>
    </Select.OptionGroup>
  );
}

const DropMenuBox = styled.div`
  width: 13rem;

  position: absolute;
  top: 57.3rem;
  left: 103rem;

  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.65rem);
  border-radius: 0.5rem;
`;

const DropMenuWrapper = styled.ul`
  width: 100%;

  margin: 0.8rem 0;
`;

const DropMenuItem = styled.li<{ isSelected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 3.2rem;
  width: 9.3rem;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ isSelected }) => (isSelected ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const DropMenuText = styled.p`
  height: 2rem;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CheckCategoryIcon = styled(CheckCategoryIc)<{ isSelected?: boolean }>`
  display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
  width: 1.5rem;
`;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 3.2rem;
  width: 9.3rem;

  /* ${({ theme }) => theme.fonts.hashtag}; */
  color: ${({ theme }) => theme.colors.gray3};

  margin: 0 1.9rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;
