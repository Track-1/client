import styled from "styled-components";

import { useState, useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import categorys from "../../mocks/categoryDummy.json";
import UploadButtonModal from "../trackSearch/uploadButtonModal";

import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { categorySelectedCheck } from "../../core/tracks/categorySelectedCheck";
import { CategoryChecksType } from "../../type/CategoryChecksType";
import { UploadTextIc, NeonXIc, TrackSearchingTextIc, TrackSearchingPinkIc, PinkXIc } from "../../assets";
import { categorySelect } from "../../recoil/categorySelect";

export default function CategoryList() {
  const modalRef = useRef<HTMLDivElement>(null);

  const tracksOrVocals = useRecoilValue<string>(tracksOrVocalsCheck);
  // const selectedSet = new Set<number|unknown>();
  const [selectedSet, setSelectedSet]=useState<Set<number|unknown>>();

  const [selectedCategorys, setSelectedCategorys] = useState<CategoryChecksType[]>(categorySelectedCheck);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [trackSearchingClicked, setTrackSearchingClicked] = useState<boolean>(false);

  const [filteredUrlApi, setFilteredUrlApi]=useRecoilState(categorySelect);

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openModal]);

  // function categoryClick(id: number) {
  //   const tempSelectedCategorys = [...selectedCategorys];

  //   // tempSelectedCategorys[id].selected = changeSelectValue(tempSelectedCategorys[id].selected);
  //   // tempSelectedCategorys[id].selected ? addSelectedSet(id) : addSelectedDelete(id);

  //   setSelectedCategorys([...tempSelectedCategorys]);
  // }
  function categoryClick(id:number){
    setSelectedCategorys(
      selectedCategorys.map((selectCateg)=>
        (selectCateg.categId === id ? {...selectCateg , selected : !selectCateg.selected} : selectCateg)
      )
    ) 
  }

  function addSelectedSet(id:number){
    selectedSet&&selectedSet.add(id)
    setSelectedSet(selectedSet)
  }

  function addSelectedDelete(id:number){
    selectedSet&&selectedSet.delete(id)
    setSelectedSet(selectedSet)
  }

  function changeSelectValue(value: boolean) {
    return !value;
  }

  // function createFilteredUrl(selectedSet:Set<number|unknown>) {
  //   let filteredUrl = "";

  //   selectedSet.forEach((id) => {
  //     filteredUrl += `$categ${id}`;
  //   });
  //   filteredUrl===""?setFilteredUrlApi("&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8"):setFilteredUrlApi(filteredUrl)

  //   // return filteredUrl;
  // }

  function createFilteredUrl(selectedCategorys:CategoryChecksType[]) {
    // let filteredUrl = "";

    // selectedCategorys.forEach((categId) => {
    //   filteredUrl += `$categ${categId}`;
    // });
    // filteredUrl===""?setFilteredUrlApi("&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8"):setFilteredUrlApi(filteredUrl)
    // categs.forEach(({categId}) => {
    //   categApi=categApi+`&categ=`+categId
    // });
    // setSelectedCategorysApi(categApi)
    // return filteredUrl;
  }

  // useEffect(()=>{
  //   selectedSet&&createFilteredUrl(selectedSet)
  //   console.log(selectedSet)
  // },[selectedSet])

  // useEffect(()=>{
  //   createFilteredUrl(selectedCategorys)
  // },[selectedCategorys])

  useEffect(()=>{
    let filteredUrl=""
    const categs=selectedCategorys.filter((selectedCategory) => selectedCategory.selected === true)
    categs.forEach(({categId}) => {
      filteredUrl+=`&categ=${categId}`;
    });
    filteredUrl===""?setFilteredUrlApi("&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8"):setFilteredUrlApi(filteredUrl)
   },[selectedCategorys])

  function clickUploadButton() {
    setOpenModal(true);
  }

  function clickTrackSearching() {
    setTrackSearchingClicked(!trackSearchingClicked);
  }

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e)) {
      setOpenModal(false);
    }
  }

  function isClickedOutside(e: MouseEvent) {
    return openModal && !modalRef.current?.contains(e.target as Node);
  }

  return (
    <>
      {openModal && <UploadButtonModal ref={modalRef} />}
      <CategoryListWrapper>
        {categorys.map((category) => (
          <CategoryTextBoxWrapper
            key={category.id}
            onClick={() => categoryClick(category.id)}
            selectCategBool={selectedCategorys[category.id].selected}
            tracksOrVocals={tracksOrVocals}>
            <CategoryTextBox>
              {tracksOrVocals === "Tracks" ? (
                selectedCategorys[category.id].selected ? (
                  <img
                    src={require("../../assets/icon/" + category.selectTrackCategory + ".svg")}
                    alt="선택된 카테고리 텍스트"
                  />
                ) : (
                  <img src={require("../../assets/icon/" + category.category + ".svg")} alt="선택된 카테고리 텍스트" />
                )
              ) : selectedCategorys[category.id].selected ? (
                <img
                  src={require("../../assets/icon/" + category.selectVocalCategory + ".svg")}
                  alt="선택된 카테고리 텍스트"
                />
              ) : (
                <img src={require("../../assets/icon/" + category.category + ".svg")} alt="선택된 카테고리 텍스트" />
              )}
              {tracksOrVocals === "Tracks" && selectedCategorys[category.id].selected && <NeonXIc />}
              {tracksOrVocals === "Vocals" && selectedCategorys[category.id].selected && <PinkXIc />}
            </CategoryTextBox>
          </CategoryTextBoxWrapper>
        ))}
        {tracksOrVocals === "Tracks" && (
          <UploadButton type="button" onClick={clickUploadButton}>
            <UploadTextIc />
          </UploadButton>
        )}

        {tracksOrVocals === "Vocals" &&
          (trackSearchingClicked ? (
            <TrackSearchingPinkIcon onClick={clickTrackSearching} />
          ) : (
            <TrackSearchingTextIcon onClick={clickTrackSearching} />
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

const CategoryTextBoxWrapper = styled.article<{ selectCategBool: boolean; tracksOrVocals: string }>`
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
      ${({ selectCategBool, tracksOrVocals, theme }) =>
          tracksOrVocals === "Tracks"
            ? selectCategBool
              ? theme.colors.sub1
              : theme.colors.sub3
            : selectCategBool
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

  cursor: pointer;
`;

const TrackSearchingPinkIcon = styled(TrackSearchingPinkIc)`
  margin: 2.275rem 0 0 6.3rem;

  cursor: pointer;
`;
