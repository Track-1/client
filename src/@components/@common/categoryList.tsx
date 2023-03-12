import styled from "styled-components";

import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import categorys from "../../mocks/categoryDummy.json";
import UploadButtonModal from "../trackSearch/uploadButtonModal";

import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { categorySelectedCheck } from "../../core/tracks/categorySelectedCheck";
import { CategoryChecksType } from "../../type/CategoryChecksType";
import { UploadTextIc, NeonXIc, TrackSearchingTextIc, TrackSearchingPinkIc, PinkXIc } from "../../assets";
import { categorySelect, trackSearching } from "../../recoil/categorySelect";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";
import { Category } from "../../core/constants/categoryHeader";
import { isTracksPage, isVocalsPage } from "../../utils/common/pageCategory";
import { UserType } from "../../recoil/main";
import { isProducer } from '../../utils/common/userType';
import { LoginUserType } from '../../recoil/loginUserData';

export default function CategoryList() {
  const modalRef = useRef<HTMLDivElement>(null);

  const tracksOrVocals = useRecoilValue<string>(tracksOrVocalsCheck);
  const [selectedSet, setSelectedSet] = useState<Set<number | unknown>>();

  const [selectedCategorys, setSelectedCategorys] = useState<CategoryChecksType[]>(categorySelectedCheck);
  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);
  const [trackSearchingClicked, setTrackSearchingClicked] = useRecoilState<boolean>(trackSearching);
  const [filteredUrlApi, setFilteredUrlApi] = useRecoilState(categorySelect);
  const userType=useRecoilValue(LoginUserType)

  function categoryClick(id: number) {
    setSelectedCategorys(
      selectedCategorys.map((selectCateg) =>
        selectCateg.categId === id ? { ...selectCateg, selected: !selectCateg.selected } : selectCateg,
      ),
    );
  }

  useEffect(() => {
    let filteredUrl = "";

    selectedCategorys.forEach((categ) => {
      if (categ.selected) {
        filteredUrl += `&categ=${categ.categId}`;
      }
    });

    filteredUrl === ""
      ? setFilteredUrlApi("&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8")
      : setFilteredUrlApi(filteredUrl);
  }, [selectedCategorys]);

  function selectCategory(id: number) {
    const tempSelectedCategors = selectedCategorys;
    tempSelectedCategors[id].selected
      ? (tempSelectedCategors[id].selected = false)
      : (tempSelectedCategors[id].selected = true);
    setSelectedCategorys([...tempSelectedCategors]);
  }

  function moveUploadPage() {
    setOpenModal(true);
  }

  function clickTrackSearching() {
    setTrackSearchingClicked((prev) => !prev);
  }

  function searchFilterdVocals() {
    setTrackSearchingClicked((prev) => !prev);
  }

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e)) {
      setOpenModal(false);
    }
  }

  function isClickedOutside(e: MouseEvent) {
    return openModal && !modalRef.current?.contains(e.target as Node);
  }

  function changeCategoryColor(id: number) {
    if (selectedCategorys[id].selected) {
      switch (tracksOrVocals) {
        case Category.TRACKS:
          return <NeonXIc />;
        case Category.VOCALS:
          return <PinkXIc />;
      }
    }
  }

  function checkIsSelectedTrackCategory(id: number) {
    return selectedCategorys[id].selected ? categorys[id].selectTrackCategory : categorys[id].category;
  }

  function checkIsSelectedVocalCategory(id: number) {
    return selectedCategorys[id].selected ? categorys[id].selectVocalCategory : categorys[id].category;
  }

  return (
    <>
      {openModal && <UploadButtonModal />}
      <CategoryListWrapper>
        {categorys.map((category) => (
          <CategoryTextBoxWrapper
            key={category.id}
            onClick={() => selectCategory(category.id)}
            isSelected={selectedCategorys[category.id].selected}
            tracksOrVocals={tracksOrVocals}>
            <CategoryTextBox>
              {isTracksPage(tracksOrVocals) && (
                <img
                  src={require(`../../assets/icon/${checkIsSelectedTrackCategory(category.id)}.svg`)}
                  alt="선택된 카테고리 텍스트"
                />
              )}
              {isVocalsPage(tracksOrVocals) && (
                <img
                  src={require(`../../assets/icon/${checkIsSelectedVocalCategory(category.id)}.svg`)}
                  alt="선택된 카테고리 텍스트"
                />
              )}
              {changeCategoryColor(category.id)}
            </CategoryTextBox>
          </CategoryTextBoxWrapper>
        ))}
        {isTracksPage(tracksOrVocals) && isProducer(userType) && (
          <UploadButton type="button" onClick={moveUploadPage}>
            <UploadTextIcon />
          </UploadButton>
        )}

        {isVocalsPage(tracksOrVocals) &&
          (trackSearchingClicked ? (
            <TrackSearchingPinkIcon onClick={searchFilterdVocals} />
          ) : (
            <TrackSearchingTextIcon onClick={searchFilterdVocals} />
          ))}
      </CategoryListWrapper>
    </>
  );
}

const CategoryListWrapper = styled.section`
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 17rem;

  margin: 2.7rem 0 0 1.2rem;
`;

const CategoryTextBoxWrapper = styled.article<{ isSelected: boolean; tracksOrVocals: string }>`
  display: flex;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;

  border: 0.15rem solid transparent;
  border-radius: 3.26307rem;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to right,
      ${({ theme }) => theme.colors.sub3} 0%,
      ${({ theme }) => theme.colors.sub3} 20%,
      ${({ isSelected, tracksOrVocals, theme }) =>
          tracksOrVocals === Category.TRACKS
            ? isSelected
              ? theme.colors.sub1
              : theme.colors.sub3
            : isSelected
            ? theme.colors.sub2
            : theme.colors.sub3}
        100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const CategoryTextBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 22.104rem;

  cursor: pointer;
`;

const UploadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 24.6rem;
  height: 5.2rem;

  margin: 2.275rem 0 0 6.3rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.main};
  border-radius: 2.55188rem;

  ${({ theme }) => theme.fonts.title};
  background-color: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.white};
`;

const TrackSearchingTextIcon = styled(TrackSearchingTextIc)`
  margin: 2.275rem 0 0 6.3rem;
  width: 23.8rem;
  cursor: pointer;
`;

const TrackSearchingPinkIcon = styled(TrackSearchingPinkIc)`
  margin: 2.275rem 0 0 6.3rem;
  width: 23.8rem;
  cursor: pointer;
`;

const UploadTextIcon=styled(UploadTextIc)`
  width: 12.4rem;
`