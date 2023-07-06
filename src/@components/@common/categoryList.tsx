import styled from "styled-components";

import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import categorys from "../../mocks/categoryDummy.json";
import UploadButtonModal from "../trackSearch/uploadButtonModal";

import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
// import { categorySelectedCheck } from "../../core/tracks/categorySelectedCheck";
import { NeonXIc, PinkXIc, TrackSearchingPinkIc, TrackSearchingTextIc, UploadTextIc } from "../../assets";
import { Category } from "../../core/constants/categoryHeader";
import { categoryFinalSelectedCheck, categorySelect, clickCategoryHeader } from "../../recoil/categorySelect";
import { LoginUserType } from "../../recoil/loginUserData";
import { showPlayerBar } from "../../recoil/player";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";
import { CategoryChecksType } from "../../type/CategoryChecksType";
import { isTracksPage, isVocalsPage } from "../../utils/common/pageCategory";

import { useNavigate } from "react-router-dom";
import { blockAccess } from "../../utils/common/privateRoute";

export default function CategoryList(props: any) {
  const { pausesPlayerAudio, setIsCategorySelected, trackSearchingClicked, setTrackSearchingClicked } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  const tracksOrVocals = useRecoilValue<string>(tracksOrVocalsCheck);
  const [selectedCategorys, setSelectedCategorys] = useRecoilState<CategoryChecksType[]>(categoryFinalSelectedCheck);

  // const [selectedCategorys, setSelectedCategorys] = useState<CategoryChecksType[]>(categorySelectedCheck);
  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);
  // const [trackSearchingClicked, setTrackSearchingClicked] = useRecoilState<boolean>(trackSearching);
  const [filteredUrlApi, setFilteredUrlApi] = useRecoilState(categorySelect);
  const userType = useRecoilValue(LoginUserType);
  const [isClickedCategory, setIsClickedCategory] = useRecoilState(clickCategoryHeader);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const navigate = useNavigate();

  useEffect(() => {
    //true면 필터링 초기화, false면 필터링 유지
    if (isClickedCategory) {
      setSelectedCategorys(selectedCategorys.map((selectCateg) => ({ ...selectCateg, selected: false })));
      setFilteredUrlApi("");
      setIsClickedCategory(false);
    }
    // setTrackSearchingClicked(false);
  }, [isClickedCategory]);

  useEffect(() => {
    let filteredUrl = "";

    selectedCategorys.forEach((categ) => {
      if (categ.selected) {
        filteredUrl += `&categ=${categ.categId}`;
      }
    });

    filteredUrl === ""
      ? setFilteredUrlApi("&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8&categ=9")
      : setFilteredUrlApi(filteredUrl);

    // setFilteredUrlApi(filteredUrl);
    // console.log(filteredUrlApi);
  }, [selectedCategorys]);

  function selectCategory(id: number) {
    // const tempSelectedCategors = selectedCategorys;

    // tempSelectedCategors[id].selected
    //   ? (tempSelectedCategors[id].selected = false)
    //   : (tempSelectedCategors[id].selected = true);
    // setSelectedCategorys([...tempSelectedCategors]);

    console.log(id);

    setSelectedCategorys(
      selectedCategorys.map((selectCateg) =>
        selectCateg.categId === id ? { ...selectCateg, selected: !selectCateg.selected } : selectCateg,
      ),
    );

    setIsCategorySelected(true);

    pausesPlayerAudio();
    setShowPlayer(false);
  }

  function moveUploadPage() {
    setShowPlayer(false);
    pausesPlayerAudio();
    blockAccess()
      ? navigate("/login")
      : userType === "producer"
      ? setOpenModal(true)
      : alert("Please use this function after producer logging in.\n해당 기능은 프로듀서로 로그인 후 이용해주세요.");
  }

  function changeCategoryColor(id: number) {
    if (selectedCategorys[id]?.selected) {
      switch (tracksOrVocals) {
        case Category.TRACKS:
          return <NeonXIcon />;
        case Category.VOCALS:
          return <PinkXIcon />;
      }
    }
  }

  function checkIsSelectedTrackCategory(id: number) {
    return selectedCategorys[id]?.selected ? categorys[id].selectTrackCategory : categorys[id].category;
  }

  function checkIsSelectedVocalCategory(id: number) {
    return selectedCategorys[id]?.selected ? categorys[id].selectVocalCategory : categorys[id].category;
  }

  function searchFilterdVocals() {
    setIsCategorySelected(true);
    setTrackSearchingClicked(!trackSearchingClicked);
  }

  return (
    <>
      {openModal && <UploadButtonModal />}
      <CategoryListWrapper>
        {categorys.map(({ id, width }) => (
          <CategoryTextBoxWrapper
            key={id}
            onClick={() => selectCategory(id)}
            isSelected={selectedCategorys[id]?.selected}
            tracksOrVocals={tracksOrVocals}>
            <CategoryTextBox>
              {isTracksPage(tracksOrVocals) && (
                <Img
                  width={width}
                  src={require(`../../assets/icon/${checkIsSelectedTrackCategory(id)}.svg`)}
                  alt="선택된 카테고리 텍스트"
                />
              )}
              {isVocalsPage(tracksOrVocals) && (
                <Img
                  width={width}
                  src={require(`../../assets/icon/${checkIsSelectedVocalCategory(id)}.svg`)}
                  alt="선택된 카테고리 텍스트"
                />
              )}
              {changeCategoryColor(id)}
            </CategoryTextBox>
          </CategoryTextBoxWrapper>
        ))}
        {isTracksPage(tracksOrVocals) && (
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
  align-items: center;

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

const UploadTextIcon = styled(UploadTextIc)`
  width: 12.4rem;
`;

const PinkXIcon = styled(PinkXIc)`
  width: 1rem;
  height: 1rem;
`;

const NeonXIcon = styled(NeonXIc)`
  width: 1rem;
  height: 1rem;
`;

const Img = styled.img<{ width: number }>`
  width: ${({ width }) => width}rem;
`;
